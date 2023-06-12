import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"
import { selectUser } from '../Redux/Doctor/doctorSlice';


const ProtectedRoute = ({children}) => {
    const doctor = useSelector(selectUser);
    let location = useLocation();

    if(!doctor) {
        return <Navigate to="/doctor/signin" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;