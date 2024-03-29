import Doctor from "../Model/Doctor.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { Schedule } from "../Model/Schedules.js";
import moment from 'moment'
import cloudinary from "../utils/cloudinary.js";
import { Appointment } from "../Model/Appointment.js";
import { User } from "../Model/user.js";
import mongoose from "mongoose";
import { Admin } from '../Model/admin.js'
import { Department } from "../Model/Department.js";
import { createSecretToken, createSecretTokenForDoc } from "../utils/secretToken.js";
import { Prescription } from "../Model/Prescription.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Doctor.findOne({ email });


        if (user) {
            const isValidUser = await bcrypt.compare(password, user.password);

            if (isValidUser) {
                const token = createSecretTokenForDoc(user._id);
                res.cookie("token", token, {
                    httpOnly: false,
                });


                res.status(201).send({ msg: "Login successfull", user, token })

            } else {
                res.status(500).send("invalid credentials")
            }
        } else {
            res.status(404).send("user not found")
        }

    } catch (error) {

        res.status(500).json({ err: "login failed" })

    }
};

export const profile = async (req, res) => {
    try {
        const doctorId = req.params.id

        if (doctorId) {
            const doctor = await Doctor.findOne({ _id: doctorId });
            if (doctor) {
                res.status(201).send(doctor)
            }
        } else {
            res.status(500).json({ err: "Un authorized user" });
        }

    } catch (error) {
        res.status(500).json({ err: "can't get the profile" });

    }
}

//edit doctor
export const edit = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;
        if (req.body.image) {
            const imgId = req.body.imgPublicId;

            await cloudinary.uploader.destroy(imgId);

            const uploadRes = await cloudinary.uploader.upload(req.body.image, {
                allowed_formats: "jpg,png,webp,jpeg",
                upload_preset: 'webDoc'
            });
            data.image = uploadRes;
            delete data.imgPublicId;
        }
        const doctors = await Doctor.findByIdAndUpdate(userId, data);
        if (doctors) {
            const updatedDoctor = await Doctor.findOne({ _id: doctors._id });
            res.status(200).send(updatedDoctor)
        } else {
            res.status(500).json({ err: "Doctor Updation failed" });
        }

    } catch (error) {

        res.status(500).json(error)

    }
}

export const schedule = async (req, res) => {
    try {
        const { startingTime, endingTime, date, doctorId } = req.body;
        let schedules = [];
        var convertedStartTime = moment(startingTime, 'hh:mm A').format('HH:mm');
        var convertedEndTime = moment(endingTime, 'hh:mm A').format('HH:mm');
        const numStartTime = Number(convertedStartTime.split(':')[0]);
        const numEndTime = Number(convertedEndTime.split(':')[0]);


        if (numStartTime < numEndTime) {
            for (let i = numStartTime; i < numEndTime; i++) {
                schedules.push(i);
            }
        }
        if (numEndTime < numStartTime) {
            for (let i = numStartTime; i >= numEndTime; i--) {
                schedules.push(i);
            }
        }

        const newSchedule = new Schedule({
            startingTime,
            endingTime,
            date,
            doctorId,
            schedules
        });
        newSchedule.save().then(() => {
            res.status(200).send({ success: "data added successfully" })
        }).catch((err) => {
            res.status(500).send({ err: "can't insert data into database" })
        })

    } catch (error) {
        res.status(500).json({ err: "can't schedule time" });

    }
}

export const scheduledTime = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const mySchedules = await Schedule.find({ doctorId });
        res.status(200).send(mySchedules)
    } catch (error) {
        res.status(500).json({ err: "can't find the schedules" })
    }
}

export const getMyPatients = async (req, res) => {
    try {
        const doctorId = req.doctor;
        const userIds = await Appointment.distinct("userId", { doctorId });

        const data = await User.find({ _id: { $in: userIds } })
            .select('-password -tokens -mobile');

        res.status(200).send(data);
    } catch (error) {
        res.status(500).send("Unable to fetch user data.");
    }
};


export const getAppointments = async (req, res) => {
    const doctorId = req.doctor;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const date = req.query.date; // Get the date parameter from the query

    const query = { doctorId };
    if (date) {
        const startDate = new Date(date);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 1); // Set end date to the next day
        query.date = { $gte: startDate, $lt: endDate }; // Filter appointments within the specified date range
    }

    try {
        const data = await Appointment.paginate(query, {
            page,
            limit,
            populate: {
                path: 'userId',
                select: '-password -tokens',
            },
            sort: { createdAt: -1 },
        });

        const totalPages = Math.ceil(data.total / limit);

        res.status(201).json({
            appointments: data.docs,
            totalPages,
        });
    } catch (error) {
        res.send("Can't find appointments");
    }
};



export const getSingleDoctor = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById({ _id: id }).select('-password')
    res.status(201).json(user)
}

export const getFullPayment = async (req, res) => {
    const { id } = req.params;
    const doctorId = req.doctor;
    try {
        const payment = await Appointment.aggregate([
            {
                $match: {
                    doctorId: new mongoose.Types.ObjectId(id || doctorId)
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$price" }
                }
            }
        ])

        res.status(200).json(payment);

    } catch (error) {

        return res.status(500).json({ err: "can't access data" })

    }
}


//apply for doctor
export const applyForDoctor = async (req, res) => {
    try {
        const { fullName, email, firstName, lastName, address, mobile, dob, about, image, department, experience, fees, startTime, endTime, certificate } = req.body;

        const formattedStartTime = moment(startTime, "hh:mmA");
        const formattedEndTime = moment(endTime, "hh:mmA");


        function getTimesBetween(start, end) {
            const times = [];
            const currentTime = moment(start);

            while (currentTime.isBefore(end)) {
                times.push(currentTime.format("h:mm A"));
                currentTime.add(1, 'hour');
            }

            return times;
        }

        const timings = getTimesBetween(formattedStartTime, formattedEndTime);



        if (image && certificate) {
            const uploadRes = await cloudinary.uploader.upload(image, {
                allowed_formats: "jpg,png,webp,jpeg",
                upload_preset: 'webDoc'
            });

            const certificateUploadRes = await cloudinary.uploader.upload(certificate, {
                allowed_formats: "jpg,png,webp,jpeg",
                upload_preset: 'webDoc'
            });



            if (uploadRes && certificateUploadRes) {
                const addDoc = new Doctor({
                    fullName,
                    email,
                    firstName,
                    lastName,
                    address,
                    mobile,
                    dob,
                    about,
                    department,
                    experience,
                    fees,
                    startTime,
                    endTime,
                    timings,
                    image: uploadRes,
                    certificate: certificateUploadRes,
                    // doctorTimings: timeslots
                });

                addDoc.save().then(async () => {

                    const adminId = await Admin.find({}).select('_id');
                    const doctor = await Doctor.find({ email }).select('-password');
                    const unSeenNotification = {
                        doctorId: doctor[0]._id,
                        message: `${doctor[0].fullName} has applied for a doctor account`,
                        data: doctor[0]
                    }

                    const applyDoctor = await Admin.updateOne(
                        { _id: adminId },
                        { $push: { unSeenNotification: unSeenNotification } }
                    );

                    res.status(200).json({ success: true });
                })
                    .catch((err) => {

                        res.status(400).json({ error: new Error("Some of the credentials already exist.") });
                    });
            }
        }
    } catch (error) {

        return res.status(500).json({ success: false });
    }
}


//get all departments
export const getAllDepartments = async (req, res) => {
    try {
        const getAllDepartments = await Department.find({});
        res.status(200).json({ departments: getAllDepartments })

    } catch (error) {
        res.status(500).json({ err: "unable to get data" })

    }
}

//signup doctor
export const signupDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const email = await Doctor.findById(id, 'email');
        // const {password} = req.body;

        res.status(200).json({ email: email })
    } catch (error) {

        res.status(500).json({ err: "unable to update data" })

    }
}

//password
export const addPassword = (async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const passwordUpdate = await Doctor.findByIdAndUpdate(id, { password: hash });
        res.status(200).json({ success: "user updated successfully" })
    } catch (error) {

        res.status(500).json({ err: "can't update password" })
    }


});

//leave 
export const updateLeave = (async (req, res) => {
    try {
        const { id } = req.params;
        const dates = req.body





        const updateLeave = await Doctor.findByIdAndUpdate(
            id,
            { $set: { "leaves.$": dates } }
        );
        res.status(200).json({ success: "data updated successfully" })

    } catch (error) {

        return res.status(500).json({ err: "can't update leave" })

    }
})


//monthly report
export const monthlyReport = async (req, res) => {
    try {
        const doctorId = req.doctor;

        const result = await Appointment.aggregate([
            {
                $match: {
                    doctorId: new mongoose.Types.ObjectId(doctorId)
                }
            },
            {
                $group: {
                    _id: {
                        $month: "$date"
                    },
                    totalAmount: {
                        $sum: "$price"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id",
                    totalAmount: 1
                }
            },
            {
                $group: {
                    _id: null,
                    data: {
                        $push: {
                            month: "$month",
                            totalAmount: "$totalAmount"
                        }
                    }
                }
            },
            {
                $unwind: {
                    path: "$data",
                    includeArrayIndex: "index",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: "$data.month",
                    totalAmount: {
                        $max: "$data.totalAmount"
                    }
                }
            },
            {
                $sort: {
                    _id: 1
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id",
                    totalAmount: {
                        $ifNull: ["$totalAmount", 0]
                    }
                }
            }
        ]);


        const months = Array.from(Array(12), (_, i) => i + 1); // Generate an array of months (1 to 12)
        const prices = months.map(month => {
            const resultItem = result.find(item => item.month === month);
            return resultItem ? resultItem.totalAmount : 0;
        });

        res.status(200).send(prices);
    } catch (error) {

        res.status(500).json({ error: "Unable to retrieve the data" });
    }
};

//weekly report
export const weeklyReport = (async (req, res) => {
    try {
        const doctorId = req.doctor;

        const result = await Appointment.aggregate([
            {
                $match: {
                    doctorId: new mongoose.Types.ObjectId(doctorId)
                }
            },
            {
                $group: {
                    _id: { $dayOfWeek: "$createdAt" },
                    totalSales: { $sum: "$price" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ])

        const salesByDay = Array.from({ length: 7 }, (_, index) => {
            const dayData = result.find(data => data._id === index + 1);
            return dayData ? dayData.totalSales : 0
        });

        res.status(201).json(salesByDay)
    } catch (error) {

        res.status(500).json({ err: "can't create data" })

    }

});

//daily report 
export const getDailyReport = async (req, res) => {
    try {
        const doctorId = req.doctor;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const result = await Appointment.aggregate([
            {
                $match: {
                    date: { $gte: today },
                    doctorId: new mongoose.Types.ObjectId(doctorId),
                },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$price" },
                },
            },
        ]);

        const dailyTotal = result.length > 0 ? result[0].total : 0;

        res.status(201).json(dailyTotal);
    } catch (error) {

        res.status(500).json({ err: "Can't find the data" });
    }
};


//yearly report
export const getYearlyReport = (async (req, res) => {
    const doctorId = req.doctor;
    try {
        const result = await Appointment.aggregate([
            {
                $match: {
                    doctorId: new mongoose.Types.ObjectId(doctorId)
                }
            },
            {
                $group: {
                    _id: { $year: "$createAt" },
                    totalSales: { $sum: "$price" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ])

        const yearlyReport = result.map(yearData => yearData.totalSales);
        res.status(201).json(yearlyReport)

    } catch (error) {
        res.status(500).json({ err: "can't update the data" })

    }
})

//user
export const getData = async (req, res,) => {
    const doctorId = req.doctor;
    try {

        const user = await Doctor.findById(doctorId);
        if (user) {
            const { password, ...rest } = Object.assign({}, user.toJSON());
            res.status(201).send(rest);
        } else {
            res.status(500).send("can't find the user")
        }

    } catch (error) {
        res.status(500).send("not authorized")
    }

}

//sales report 
export const getSaleReport = async (req, res) => {
    const doctorId = req.doctor;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    try {
        const result = await Appointment.paginate(
            { doctorId: doctorId },
            {
                page,
                limit,
                populate: {
                    path: 'userId',
                    select: '-password -tokens -mobile'
                },
                sort: { createdAt: -1 }
            }
        );

        const totalPages = Math.ceil(result.total / limit);

        res.status(201).json({
            transactions: result.docs,
            totalPages
        });
    } catch (error) {

        res.status(500).json({ err: "Can't access data" });
    }
};

//single appointment 
export const singleAppointment = (async (req, res) => {
    try {
        const { id } = req.params;
        const doctorId = req.doctor;


        const appointment = await Appointment.findOne({ userId: new mongoose.Types.ObjectId(id), doctorId: new mongoose.Types.ObjectId(doctorId) }).populate({
            path: 'userId',
            select: ['-password', '-tokens']

        })
        res.status(200).json(appointment)

    } catch (error) {
        res.status(500).json({ err: "can't access the appointment" })

    }
})


//prescriptions
export const prescriptions = (async (req, res) => {
    const { id } = req.params;
    const doctorId = req.doctor;
    const docId = doctorId.toString();
    try {


        const newPrescription = await Prescription.find({
            doctorId: new mongoose.Types.ObjectId(docId),
            userId: new mongoose.Types.ObjectId(id),
        });

        res.status(200).json(newPrescription);

    } catch (error) {

        return res.status(500).json({ err: "can't create prescription" })
    }
})

//single prescription
export const singlePrescription = (async (req, res) => {
    const { id } = req.params;
    try {
        const prescription = await Prescription.findById(id).populate({
            path: 'userId',
            select: ['-password', '-tokens']

        })
        res.status(200).json({ prescription });

    } catch (error) {

        res.status(500).json({ err: "can't find the data" })

    }
})

//add prescription
export const addPrescription = (async (req, res) => {
    try {
        const { userId, doctorId, title, description, username, doctorname } = req.body;
        const newPrescription = new Prescription({
            userId,
            doctorId,
            username,
            doctorname,
            title,
            description
        });
        newPrescription.save();
        res.status(201).json({ success: "data created successfully" })

    } catch (error) {
        res.status(500).json({ err: "data creation failure" })

    }


})

//update prescription
export const updatePrescription = (async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updateData = await Prescription.findByIdAndUpdate(id, data);
        res.status(201).josn({ success: "data updated successfully" })
    } catch (error) {
        res.status(500).json({ err: "can't update the data" })

    }

});

//delete prescription
export const deletePrescription = (async (req, res) => {
    try {
        const { id } = req.params;
        const deletePrescription = await Prescription.findByIdAndDelete(id)
        res.status(200).json({ success: "deleted successfully" })

    } catch (error) {
        res.status(500).json({ err: 'delete data failed' })
    }
});


//time slot for each day
export const addDoctorTimeSlot = async (req, res) => {
    const doctorId = req.doctor;
    const { timings, interval } = req.body;


    try {
        function generateTimeSlots(startTime, endTime, interval) {
            const timeSlots = [];
            const currentTime = moment(startTime, 'h:mm A');

            while (currentTime < moment(endTime, 'h:mm A')) {
                timeSlots.push(currentTime.format('h:mm A'));
                currentTime.add(interval, 'minutes');
            }

            return timeSlots;
        }

        function generateDoctorTimings(existingTimings, updatedTimings, interval) {
            const doctorTimings = { ...existingTimings }; // Copy existing timings

            for (const timing of updatedTimings) {
                const { day, startTime, endTime } = timing;

                // Update timing if both startTime and endTime are provided
                if (startTime && endTime) {
                    const timeSlots = generateTimeSlots(startTime, endTime, interval);
                    doctorTimings[day] = timeSlots;
                }
            }

            return doctorTimings;
        }

        const existingDoctor = await Doctor.findById(doctorId);
        const doctorTimings = generateDoctorTimings(existingDoctor.doctorTimings, timings, interval);
        const updateTime = await Doctor.findByIdAndUpdate(doctorId, { doctorTimings });


        res.status(200).json(updateTime);
    } catch (error) {
        res.status(500).json({ err: "Can't update the time slots" });
    }
}


//single user
export const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password')
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ err: "cant find user" })

    }
}

export const getMyProfit = async (req, res) => {
    try {
        const doctorId = req.doctor;

        const data = await Appointment.aggregate([
            {
                $match: { doctorId: doctorId }
            },
            {
                $group: {
                    _id: null,
                    totalPrice: { $sum: "$price" }
                }
            }
        ])
            .exec()
            .then(result => {
                if (result.length > 0) {
                    const totalPrice = result[0]?.totalPrice;
                    res.status(201).json(totalPrice)
                } else {
                    res.status(201).json(0)
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    } catch (error) {
        res.status(500).json({ err: "can't access data" })

    }
}

//get total appointments
export const getTotalAppointments = (async (req, res) => {
    try {
        const doctorId = req.doctor;
        const totalAppointment = await Appointment.find({ doctorId: doctorId });
        res.status(200).json(totalAppointment?.length);
    } catch (error) {
        res.status(500).json("can't access doctor data")

    }
})

