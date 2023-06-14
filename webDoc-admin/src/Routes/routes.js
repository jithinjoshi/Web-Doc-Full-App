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

import ProtectedRoute from "../utlis/adminSlice";


export const router = createBrowserRouter([
    {
        path:'/',
        element:<Home/>,
        errorElement:<ErrorPage/>
        
    },
    {
        path:'/admin/login',
        element:<Login/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/users',
        element:<ProtectedRoute><Patients/></ProtectedRoute>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/users/:userId',
        element:<ProtectedRoute><Single/></ProtectedRoute>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/doctors',
        element:<ProtectedRoute><Doctors/></ProtectedRoute>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/addDoctor',
        element:<ProtectedRoute><AddDoctor/></ProtectedRoute>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/departments',
        element:<ProtectedRoute><Departments/></ProtectedRoute>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/update-doctor/:id',
        element:<ProtectedRoute><UpdateDoctor/></ProtectedRoute>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/notifications',
        element:<ProtectedRoute><Notifications/></ProtectedRoute>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/doctor-request/:id',
        element:<ProtectedRoute><DoctorRequest/></ProtectedRoute>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/doctor-requests',
        element:<ProtectedRoute><AppliedDoctors/></ProtectedRoute>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/admin/transactions',
        element:<ProtectedRoute><Transactions/></ProtectedRoute>,
        errorElement:<ErrorPage/>
    } 
])