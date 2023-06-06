import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../Redux/Doctor/doctorSlice';
import {
  getDoctor,
  getFullProfit,
  getMonthlyReport,
  getMyAppointments,
  getPatients,
  getTotalPayments,
} from '../../Helpers/doctorHelper';
import Doctor from '../../components/Doctors/Doctor';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { remove } from 'react-cookie';

const DoctorHome = () => {
  const [appointments, setAppointments] = useState();
  const [payment, setPayment] = useState();
  const [appointmentData, setAppointmentData] = useState([]);
  const [patients, setPatients] = useState([]);
  const user = useSelector(selectUser);
  const [cookies, removeCookie] = useCookies([]);
  const [doctor, setDoctor] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getMyAppointments().then((appointments) => {
      setAppointmentData(appointments?.data);
      setAppointments(appointments?.data?.appointments?.length);
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

  const [data, setData] = useState();
  useEffect(() => {
    getMonthlyReport(user?._id).then((data) => {});
  }, []);

  const Logout = () => {
    removeCookie('token');
    dispatch(logout());
    navigate('/doctor/signin');
  };

  const checkDoctorExistence = async () => {
    const doctor = await getDoctor();

    if (!doctor) {
      remove('token');
      dispatch(logout());
      navigate('/doctor/signin');
    } else {
      setDoctor(doctor);
    }
  };

  useEffect(() => {
    const verifyCookie = async () => {
      const token = cookies.token;

      if (!token || token === 'undefined') {
        dispatch(logout());
        navigate('/doctor/signin');
      } else {
        await checkDoctorExistence();
      }
    };

    verifyCookie();
  }, [cookies, navigate, dispatch]);

  useEffect(() => {
    const cookie = cookies?.token;
    if (!cookie) {
      navigate('/doctor/signin');
    }
  }, []);

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
