import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../Redux/Doctor/doctorSlice';
import './NabBar.css'; // Import CSS file for responsive styles
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { getDoctor } from '../../Helpers/doctorHelper';
import { remove } from 'react-cookie';

const NavBar = () => {
  const [cookies, removeCookie] = useCookies([]);
  const navigate = useNavigate()
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [doctor, setDoctor] = useState('');

  const Logout = () => {
    removeCookie('token');
    dispatch(logout());
    navigate('/doctor/signin');
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    Logout();
    dispatch(logout());
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

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              id="toggleSidebarMobile"
              aria-expanded="true"
              aria-controls="sidebar"
              className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
              onClick={toggleSidebar}
            >
              <svg
                id="toggleSidebarMobileHamburger"
                className={`w-6 h-6 ${isSidebarOpen ? 'hidden' : ''}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                id="toggleSidebarMobileClose"
                className={`w-6 h-6 ${isSidebarOpen ? '' : 'hidden'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <Link to="/doctor" className="text-lg font-medium">
              webDoc
            </Link>
          </div>
        </div>
      </div>
      <div
        id="sidebar"
        className={`lg:hidden bg-white h-screen fixed top-0 left-0 w-64 transform duration-300 ease-in-out z-40 overflow-y-auto ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
          onClick={closeSidebar}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="border-t border-gray-200 py-2">
          <Link
            to="/dashboard"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
            onClick={closeSidebar}
          >
            Dashboard
          </Link>
          <Link
            to="/doctor/appointments"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
            onClick={closeSidebar}
          >
            Appointments
          </Link>
          <Link
            to="/doctor/patients"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
            onClick={closeSidebar}
          >
            Patients
          </Link>
          <Link
            to="/doctor/chat"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
            onClick={closeSidebar}
          >
            Chats
          </Link>
          <Link
            to="/doctor/payments"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
            onClick={closeSidebar}
          >
            Payments
          </Link>
          <Link
            to={`/doctor/profile/${user?._id}`}
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
            onClick={closeSidebar}
          >
            Profile
          </Link>
        </div>
        <div className="absolute bottom-0 w-full py-3 px-4">
          <button
            className="block w-full text-left text-red-600 hover:text-red-800 focus:outline-none"
            onClick={logoutHandler}
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
