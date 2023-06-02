import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Admin/login/Login";
import Home from "../pages/Admin/home/Home";
import Single from "../pages/Admin/single/Single";
import Doctors from "../pages/Admin/doctors/Doctors";
import AddDoctor from '../pages/Admin/addDoctors/AddDoctor'
import Departments from "../pages/Admin/Departments/Departments";
import Patients from "../pages/Admin/Patients/Patients";
import UpdateDoctor from "../pages/Admin/UpdateDoctor/UpdateDoctor";
import ErrorPage from '../components/ErrorPage'
import Notifications from "../pages/Admin/Notifications/Notifications";
import DoctorRequest from "../pages/Admin/DoctorRequest/DoctorRequest";
import AppliedDoctors from "../pages/Admin/AppliedDoctors/AppliedDoctors";
import Transactions from "../pages/Admin/Transactions/Transactions";



// import BookDoctor from "../pages/User/BookDoctor";


export const router = createBrowserRouter([
    {
        path:'/admin',
        element:<Home/>,
        
    },
    {
        path:'/admin/login',
        element:<Login/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/users',
        element:<Patients/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/users/:userId',
        element:<Single/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/doctors',
        element:<Doctors/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/addDoctor',
        element:<AddDoctor/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/departments',
        element:<Departments/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/update-doctor/:id',
        element:<UpdateDoctor/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/notifications',
        element:<Notifications/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/doctor-request/:id',
        element:<DoctorRequest/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/doctor-requests',
        element:<AppliedDoctors/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/transactions',
        element:<Transactions/>,
        errorElement:<ErrorPage/>
    } 
])