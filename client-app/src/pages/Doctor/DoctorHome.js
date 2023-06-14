import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../Redux/Doctor/doctorSlice';
import {
  getFullProfit,
  getMonthlyReport,
  getMyAppointmentsCount,
  getPatients,
} from '../../Helpers/doctorHelper';
import Doctor from '../../components/Doctors/Doctor';
import { useNavigate } from 'react-router-dom';


const DoctorHome = () => {
  const [appointments, setAppointments] = useState();
  const [payment, setPayment] = useState();
  const [appointmentData, setAppointmentData] = useState([]);
  const [patients, setPatients] = useState([]);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getMyAppointmentsCount().then((appointments) => {
      setAppointmentData(appointments?.data);
      setAppointments(appointments?.data);
    });
  }, [user]);

  useEffect(() => {
    getFullProfit().then((payment) => {
      setPayment(payment.data);
    });
  }, [user]);

  useEffect(() => {
    getPatients(user?._id).then((patient) => {
      setPatients(patient?.data);
    });
  }, [user]);

  useEffect(() => {
    getMonthlyReport(user?._id).then((data) => {});
  }, []);

  const Logout = () => {

    dispatch(logout());
    navigate('/doctor/signin');
  };



  return (
    <Doctor
      appointments={appointments}
      payment={payment}
      patients={patients}
      userId={user?._id}
      Logout={Logout}
    />
  );
};

export default DoctorHome;
