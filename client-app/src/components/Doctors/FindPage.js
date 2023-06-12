import React, { useEffect, useState } from 'react';
import { getMyAppointments } from '../../Helpers/doctorHelper';
import Appointments from './Appointments';
import { useNavigate } from 'react-router-dom';

const FindPage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [report, setReport] = useState([]);
  const [filterDate, setFilterDate] = useState('');

  const fetchAppointments = async (page, date) => {
    try {
      const data = await getMyAppointments(page, date);
      setReport(data?.data?.appointments);
      setTotalPages(data?.data?.totalPages);
    } catch (error) {
      setReport([]);
      setTotalPages(0);
    }
  };

  useEffect(() => {
    fetchAppointments(currentPage, filterDate);
  }, [currentPage, filterDate]);

  const keys = ['userId.username', 'userId.email'];
  const search = (item) => {
    if (!searchInput && !filterDate) {
      return item;
    }
    return item.filter((i) =>
      keys.some((key) => {
        const value = i[key.split('.')[0]][key.split('.')[1]]?.toLowerCase();
        return (value && value.includes(searchInput)) || (key === 'date' && i.date.includes(filterDate));
      })
    );
  };

  const handleDateChange = (date) => {
    setFilterDate(date);
  };

  const handleClearDate = () => {
    setFilterDate('');
    setSearchInput('');
    setCurrentPage(1);
  };

  return (
    <>
      <div className="p-6 grid grid-cols-1 gap-6 rounded-lg mt-2">
        <h4 className="text-2xl font-bold">Appointments</h4>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Doctors...."
              required
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div className="relative">
            <input
              type="date"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => handleDateChange(e.target.value)}
            />
            {/* Add margin-right to create spacing for the clear button */}
            {filterDate && (
              <button
                className="absolute inset-y-0 right-6 flex items-center pr-3 focus:outline-none"
                onClick={handleClearDate}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
      <Appointments
        appointments={search(report)}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        filterDate={filterDate}
      />
    </>
  );
};

export default FindPage;
