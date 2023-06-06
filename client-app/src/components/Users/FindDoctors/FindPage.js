import React, { useEffect, useState } from 'react';
import ListOfDoctors from '../ListOfDoctors';
import { getAllDoctors } from '../../../Helpers/userHelper';

const FindPage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [filterDoctor, setFilterDoctor] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [page, setPage] = useState(1); // Track the current page number
  const [isLoading, setIsLoading] = useState(false); // Track the loading state

  useEffect(() => {
    loadDoctors(); // Load initial doctors
  }, []);

  const loadDoctors = () => {
    setIsLoading(true);
    getAllDoctors({ page, limit: 10 })
      .then((doctors) => {
        setFilterDoctor((prevDoctors) => [...prevDoctors, ...doctors]);
        setAllDoctors((prevDoctors) => [...prevDoctors, ...doctors]);
        setPage((prevPage) => prevPage + 1);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const loadMoreDoctors = () => {
    // Check if all available doctors have been loaded
    if (allDoctors.length === filterDoctor.length) {
      return;
    }
    loadDoctors();
  };

  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight ||
      document.body.scrollHeight;

    if (scrollY + scrollTop >= scrollHeight - 100 && !isLoading) {
      loadMoreDoctors(); // Load more doctors when reaching the end of the list
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const keys = ['firstName', 'lastName', 'department'];

  const search = (item) => {
    if (!searchInput) {
      return item;
    }
    return item.filter((i) =>
      keys.some((key) =>
        i[key].toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  };

  return (
    <>
      <div className="p-6 grid grid-cols-1 gap-6 rounded-lg mt-6">
        <h4 className="text-2xl font-bold">Search</h4>
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
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Doctors, Departments...."
              required
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
      </div>

      <ListOfDoctors doctors={search(allDoctors)} />
      {isLoading && <div>Loading more doctors...</div>}
    </>
  );
};

export default FindPage;
