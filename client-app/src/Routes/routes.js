import React from 'react'
import { createBrowserRouter } from "react-router-dom";
//import LandingPage from "../pages/User/LandingPage";
import Signup from "../pages/User/Signup";
import Signin from "../pages/User/Signin";
// import ListOfDoctors from '../pages/User/Doctors'
import DoctorSignin from "../pages/Doctor/DoctorSignin";
// import DoctorsProfile from "../pages/Doctor/DoctorProfile";
import DoctorsEdit from "../pages/Doctor/DoctorsEdit";
import DoctorHome from "../pages/Doctor/DoctorHome";
//import BookDoctor from "../pages/User/BookDoctor";
import CheckoutSuccess from "../pages/User/CheckoutSuccess";
import CheckoutFailure from "../pages/User/CheckoutFailure";
import OtpLogin from "../components/Users/OtpLogin/OtpLogin";
import PhoneNumber from "../components/Users/PhoneNumber/PhoneNumber";
import EmailVerification from "../pages/User/EmailVerification";
import ResetPassword from "../pages/User/ResetPassword";

//import PayBefore from "../pages/User/PayBefore";
//import Profile from "../pages/User/Profile";

import ErrorPage from '../components/ErrorPage'
import ApplyForDoctor from "../pages/User/ApplyForDoctor";
//import Appointments from "../pages/User/Appointments";
import DoctorChat from "../pages/Doctor/DoctorChat";
//import DoctorAppointments from "../pages/Doctor/DoctorAppointments";
import Chats from "../pages/User/userChat";
import Video from "../pages/User/VideoChat/Video";
//import CreateRoom from "../components/Doctors/VideoChat/CreateRoom";
//import DocEdit from "../pages/Doctor/DocEdit";

import ApplyDoctor from "../pages/Doctor/ApplyDoctor";
import DoctorSignup from "../pages/Doctor/DoctorSignup";



//import SalesReport from "../pages/Doctor/SalesReport";
// import PatientsOfDoctor from "../pages/Doctor/Patients"
//import Prescription from "../pages/Doctor/Prescription";
//import ListOfPrescriptions from "../pages/Doctor/ListOfPrescriptions";
//import UpdatePrescription from "../pages/Doctor/UpdatePrescription";
//import ConsultedDoctors from "../pages/User/AppointedDoctors";
//import PrescriptionDetails from "../pages/User/Prescription"
//import SelectSchedule from "../components/Doctors/SelectShedule";
//import DocScheduleTime from "../pages/Doctor/DocScheduleTime";

import ProtectedRoute from "../utils/UserProtectedRoute";
import DoctorProtectedRoute from '../utils/DoctorProtectedRoute'
import { Dna } from 'react-loader-spinner';


//lazy loading 

//user
const ListOfDoctors = React.lazy(() => import('../pages/User/Doctors'));
const BookDoctor = React.lazy(() => import('../pages/User/BookDoctor'));
const Appointment = React.lazy(() => import('../pages/User/Appointment'));
const PayBefore = React.lazy(() => import('../pages/User/PayBefore'));
const Profile = React.lazy(() => import('../pages/User/Profile'));
const Appointments = React.lazy(() => import('../pages/User/Appointments'));
const LandingPage = React.lazy(() => import('../pages/User/LandingPage'))

//doctor
const SalesReport = React.lazy(() => import('../pages/Doctor/SalesReport'));
const PatientsOfDoctor = React.lazy(() => import('../pages/Doctor/Patients'));
const Prescription = React.lazy(() => import('../pages/Doctor/Prescription'));
const ListOfPrescriptions = React.lazy(() => import('../pages/Doctor/ListOfPrescriptions'));
const ConsultedDoctors = React.lazy(() => import('../pages/User/AppointedDoctors'));
const PrescriptionDetails = React.lazy(() => import('../pages/User/Prescription'));
const UpdatePrescription = React.lazy(() => import('../pages/Doctor/UpdatePrescription'));
const DocScheduleTime = React.lazy(() => import('../pages/Doctor/DocScheduleTime'));
const DoctorsProfile = React.lazy(() => import('../pages/Doctor/DoctorProfile'));
const DoctorAppointments = React.lazy(() => import('../pages/Doctor/DoctorAppointments'));
const CreateRoom = React.lazy(() => import('../components/Doctors/VideoChat/CreateRoom'));
const DocEdit = React.lazy(() => import('../pages/Doctor/DocEdit'));





// import BookDoctor from "../pages/User/BookDoctor";


export const router = createBrowserRouter([
    //user
    {
        path: '/',
        element:
            (
                <React.Suspense fallback={
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh'
                    }}>
                        <Dna
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                        />
                    </div>
                }>
                    <LandingPage />
                </React.Suspense>
            ),

        errorElement: <ErrorPage />
    },
    {
        path: '/signup',
        element: <Signup />,
        errorElement: <ErrorPage />
    },
    {
        path: '/signin',
        element: <Signin />,
        errorElement: <ErrorPage />
    },
    {
        path: '/otp',
        element: <OtpLogin />,
        errorElement: <ErrorPage />
    },
    {
        path: '/doctors',
        element: (
            <React.Suspense fallback={
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh'
                }}>
                    <Dna
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                    />
                </div>
            }>
                <ListOfDoctors />
            </React.Suspense>
        ),
        errorElement: <ErrorPage />
    },
    {
        path: '/appointment/:id',
        element: (
            <React.Suspense fallback={
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh'
                }}>
                    <Dna
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                    />
                </div>
            }>
                <ProtectedRoute><BookDoctor /></ProtectedRoute>,
            </React.Suspense>
        ),
        errorElement: <ErrorPage />
    },
    {
        path: '/confirm-appointment/:id',
        element: (
            <React.Suspense fallback={
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh'
                }}>
                    <Dna
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                    />
                </div>
            }>
                <ProtectedRoute><Appointment /></ProtectedRoute>,
            </React.Suspense>
        ),

        errorElement: <ErrorPage />
    },
    {
        path: '/pay/:id',
        element: (
            <React.Suspense fallback={
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh'
                }}>
                    <Dna
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                    />
                </div>
            }>
                <ProtectedRoute><PayBefore /></ProtectedRoute>,
            </React.Suspense>
        ),
        errorElement: <ErrorPage />
    },
    {
        path: '/checkout-success',
        element: <CheckoutSuccess />,
        errorElement: <ErrorPage />
    },
    {
        path: '/checkout-failure',
        element: <CheckoutFailure />,
        errorElement: <ErrorPage />
    },
    {
        path: '/phone',
        element: <PhoneNumber />,
        errorElement: <ErrorPage />
    },
    {
        path: '/forgot-password',
        element: <EmailVerification />,
        errorElement: <ErrorPage />
    },
    {
        path: '/reset-password/:userId/:token',
        element: <ResetPassword />,
        errorElement: <ErrorPage />

    },
    {
        path: '/profile',
        element: (
            <React.Suspense fallback={
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh'
                }}>
                    <Dna
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                    />
                </div>
            }>
                <ProtectedRoute><Profile /></ProtectedRoute>,
            </React.Suspense>
        ),
        errorElement: <ErrorPage />
    },
    {
        path: '/prescriptions/:doctorId',
        element:
            (
                <React.Suspense fallback={
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh'
                    }}>
                        <Dna
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                        />
                    </div>
                }>
                    <ProtectedRoute> <PrescriptionDetails /></ProtectedRoute>,
                </React.Suspense>
            ),

        errorElement: <ErrorPage />
    },
    {
        path: '/apply-doctor',
        element: <ApplyForDoctor />,
        errorElement: <ErrorPage />
    },
    {
        path: '/appointments',
        element:
            (
                <React.Suspense fallback={
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh'
                    }}>
                        <Dna
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                        />
                    </div>
                }>
                    <ProtectedRoute><Appointments /></ProtectedRoute>,
                </React.Suspense>
            ),

        errorElement: <ErrorPage />
    },
    {
        path: '/chats',
        element: <ProtectedRoute><Chats /></ProtectedRoute>,
        errorElement: <ErrorPage />
    },
    {
        path: '/appointed-doctors',
        element:
            (
                <React.Suspense fallback={
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh'
                    }}>
                        <Dna
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                        />
                    </div>
                }>
                    <ProtectedRoute><ConsultedDoctors /></ProtectedRoute>,
                </React.Suspense>
            ),

        errorElement: <ErrorPage />
    },
    {
        path: '/room/:userId',
        element: <ProtectedRoute><Video /></ProtectedRoute>,
        errorElement: <ErrorPage />
    },


    //doctors
    {
        path: '/doctor/signin',
        element: <DoctorSignin />,
        errorElement: <ErrorPage />
    },
    {
        path: '/doctor/',
        element: <DoctorProtectedRoute><DoctorHome /></DoctorProtectedRoute>,
        errorElement: <ErrorPage />
    },
    {
        path: "/doctor/profile/:id",
        element:
            (
                <React.Suspense fallback={
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh'
                    }}>
                        <Dna
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                        />
                    </div>
                }>
                    <DoctorProtectedRoute><DoctorsProfile /></DoctorProtectedRoute>,
                </React.Suspense>
            ),
        errorElement: <ErrorPage />
    },
    {
        path: "/doctor/edit/:id",
        element: <DoctorProtectedRoute><DoctorsEdit /></DoctorProtectedRoute>,
        errorElement: <ErrorPage />
    },

    {
        path: '/doctor/chat',
        element: <DoctorChat />
    },
    {
        path: '/doctor/appointments',
        element:
            (
                <React.Suspense fallback={
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh'
                    }}>
                        <Dna
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                        />
                    </div>
                }>
                    <DoctorProtectedRoute><DoctorAppointments /></DoctorProtectedRoute>,
                </React.Suspense>
            ),

        errorElement: <ErrorPage />
    },
    {
        path: '/doctor/create-room/:userId',
        element:
            (
                <React.Suspense fallback={
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh'
                    }}>
                        <Dna
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                        />
                    </div>
                }>
                    <DoctorProtectedRoute><CreateRoom /></DoctorProtectedRoute>,
                </React.Suspense>
            ),

    },
    {
        path: '/doctor/editProfile',
        element:
            (
                <React.Suspense fallback={
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh'
                    }}>
                        <Dna
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                        />
                    </div>
                }>
                    <DoctorProtectedRoute><DocEdit /></DoctorProtectedRoute>,
                </React.Suspense>
            ),

    },
    {
        path: '/doctor/apply-doctor',
        element: <ApplyDoctor />,
    },
    {
        path: '/doctor/signup/:id',
        element: <DoctorSignup />
    },
    {
        path: '/doctor/salesreport',
        element:
            (
                <React.Suspense fallback={
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh'
                    }}>
                        <Dna
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                        />
                    </div>
                }>
                    <DoctorProtectedRoute><SalesReport /></DoctorProtectedRoute>,
                </React.Suspense>
            ),
    },
    {
        path: '/doctor/patients',
        element:
            (
                <React.Suspense fallback={
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh'
                    }}>
                        <Dna
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                        />
                    </div>
                }>
                    <DoctorProtectedRoute><PatientsOfDoctor /></DoctorProtectedRoute>,
                </React.Suspense>
            ),

    },
    {
        path: '/doctor/prescription/:userId',
        element:
            (
                <React.Suspense fallback={
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh'
                    }}>
                        <Dna
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                        />
                    </div>
                }>
                    <DoctorProtectedRoute><Prescription /></DoctorProtectedRoute>,
                </React.Suspense>
            ),

    },
    {
        path: '/doctor/prescriptionList/:userId',
        element:
            (
                <React.Suspense fallback={
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh'
                    }}>
                        <Dna
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                        />
                    </div>
                }>
                    <DoctorProtectedRoute><ListOfPrescriptions /></DoctorProtectedRoute>,
                </React.Suspense>
            ),

    },
    {
        path: '/doctor/updatePrescription/:prescriptionId',
        element:
            (
                <React.Suspense fallback={
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh'
                    }}>
                        <Dna
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                        />
                    </div>
                }>
                    <DoctorProtectedRoute><UpdatePrescription /></DoctorProtectedRoute>
                </React.Suspense>
            ),

    },
    {
        path: '/doctor/select-schedule',
        element: <DoctorProtectedRoute><DocScheduleTime /></DoctorProtectedRoute>
    }

])