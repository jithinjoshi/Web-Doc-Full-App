import {createBrowserRouter} from "react-router-dom";
import LandingPage from "../pages/User/LandingPage";
import Signup from "../pages/User/Signup";
import Signin from "../pages/User/Signin";
import ListOfDoctors from '../pages/User/Doctors'
import DoctorSignin from "../pages/Doctor/DoctorSignin";
import DoctorsProfile from "../pages/Doctor/DoctorProfile";
import DoctorsEdit from "../pages/Doctor/DoctorsEdit";
import DoctorHome from "../pages/Doctor/DoctorHome";
import BookDoctor from "../pages/User/BookDoctor";
import CheckoutSuccess from "../pages/User/CheckoutSuccess";
import CheckoutFailure from "../pages/User/CheckoutFailure";
import OtpLogin from "../components/Users/OtpLogin/OtpLogin";
import PhoneNumber from "../components/Users/PhoneNumber/PhoneNumber";
import EmailVerification from "../pages/User/EmailVerification";
import ResetPassword from "../pages/User/ResetPassword";
import Appointment from "../pages/User/Appointment";
import PayBefore from "../pages/User/PayBefore";
import Profile from "../pages/User/Profile";

import ErrorPage from '../components/ErrorPage'
import ApplyForDoctor from "../pages/User/ApplyForDoctor";
import Appointments from "../pages/User/Appointments";
import DoctorChat from "../pages/Doctor/DoctorChat";
import DoctorAppointments from "../pages/Doctor/DoctorAppointments";
import Chats from "../pages/User/userChat";
import Video from "../pages/User/VideoChat/Video";
import CreateRoom from "../components/Doctors/VideoChat/CreateRoom";
import DocEdit from "../pages/Doctor/DocEdit";

import ApplyDoctor from "../pages/Doctor/ApplyDoctor";
import DoctorSignup from "../pages/Doctor/DoctorSignup";



import SalesReport from "../pages/Doctor/SalesReport";
import PatientsOfDoctor from "../pages/Doctor/Patients"
import Prescription from "../pages/Doctor/Prescription";
import ListOfPrescriptions from "../pages/Doctor/ListOfPrescriptions";
import UpdatePrescription from "../pages/Doctor/UpdatePrescription";
import ConsultedDoctors from "../pages/User/AppointedDoctors";
import PrescriptionDetails from "../pages/User/Prescription"
import SelectSchedule from "../components/Doctors/SelectShedule";
import DocScheduleTime from "../pages/Doctor/DocScheduleTime";

import ProtectedRoute from "../utils/UserProtectedRoute";
import DoctorProtectedRoute from '../utils/DoctorProtectedRoute'





// import BookDoctor from "../pages/User/BookDoctor";


export const router = createBrowserRouter([
    //user
    {
        path:'/',
        element:<LandingPage/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/signup',
        element:<Signup/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/signin',
        element:<Signin/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/otp',
        element:<OtpLogin/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/doctors',
        element:<ListOfDoctors/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/appointment/:id',
        element:<ProtectedRoute><BookDoctor/></ProtectedRoute>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/confirm-appointment/:id',
        element:<ProtectedRoute><Appointment/></ProtectedRoute> ,
        errorElement:<ErrorPage/>
    },
    {
        path:'/pay/:id',
        element:<ProtectedRoute><PayBefore/></ProtectedRoute>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/checkout-success',
        element:<CheckoutSuccess/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/checkout-failure',
        element:<CheckoutFailure/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/phone',
        element:<PhoneNumber/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/forgot-password',
        element:<EmailVerification/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/reset-password/:userId/:token',
        element:<ResetPassword/>,
        errorElement:<ErrorPage/>

    },
    {
        path:'/profile',
        element:<ProtectedRoute><Profile/></ProtectedRoute>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/prescriptions/:doctorId',
        element:<ProtectedRoute> <PrescriptionDetails/></ProtectedRoute>,
        errorElement:<ErrorPage/>   
    },
    {
        path:'/apply-doctor',
        element:<ApplyForDoctor/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/appointments',
        element:<ProtectedRoute><Appointments/></ProtectedRoute>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/chats',
        element:<ProtectedRoute><Chats/></ProtectedRoute>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/appointed-doctors',
        element:<ProtectedRoute><ConsultedDoctors/></ProtectedRoute>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/room/:userId',
        element:<ProtectedRoute><Video/></ProtectedRoute>,
        errorElement:<ErrorPage/>   
    },
    

    //doctors
    {
        path:'/doctor/signin',
        element:<DoctorSignin/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/doctor/',
        element:<DoctorProtectedRoute><DoctorHome/></DoctorProtectedRoute>,
        errorElement:<ErrorPage/>
    },
    {
        path:"/doctor/profile/:id",
        element:<DoctorProtectedRoute><DoctorsProfile/></DoctorProtectedRoute> ,
        errorElement:<ErrorPage/>
    },
    {
        path:"/doctor/edit/:id",
        element:<DoctorProtectedRoute><DoctorsEdit/></DoctorProtectedRoute>,
        errorElement:<ErrorPage/>
    },
    
    {
        path:'/doctor/chat',
        element:<DoctorChat/>
    },
    {
        path:'/doctor/appointments',
        element:<DoctorProtectedRoute><DoctorAppointments/></DoctorProtectedRoute> ,
        errorElement:<ErrorPage/>
    },
    {
        path:'/doctor/create-room/:userId',
        element:<DoctorProtectedRoute><CreateRoom/></DoctorProtectedRoute>
    },
    {
        path:'/doctor/editProfile',
        element:<DoctorProtectedRoute><DocEdit/></DoctorProtectedRoute>
    },
    {
        path:'/doctor/apply-doctor',
        element:<ApplyDoctor/>,
    },
    {
        path:'/doctor/signup/:id',
        element:<DoctorSignup/>
    },
    {
        path:'/doctor/salesreport',
        element:<DoctorProtectedRoute><SalesReport/></DoctorProtectedRoute>
    },
    {
        path:'/doctor/patients',
        element:<DoctorProtectedRoute><PatientsOfDoctor/></DoctorProtectedRoute>
    },
    {
        path:'/doctor/prescription/:userId',
        element:<DoctorProtectedRoute><Prescription/></DoctorProtectedRoute>
    },
    {
        path:'/doctor/prescriptionList/:userId',
        element:<DoctorProtectedRoute><ListOfPrescriptions/></DoctorProtectedRoute>
    },
    {
        path:'/doctor/updatePrescription/:prescriptionId',
        element:<DoctorProtectedRoute><UpdatePrescription/></DoctorProtectedRoute>
    },
    {
        path:'/doctor/select-schedule',
        element:<DoctorProtectedRoute><DocScheduleTime/></DoctorProtectedRoute>
    }
    
])