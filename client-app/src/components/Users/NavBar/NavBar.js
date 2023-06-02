import React, { useEffect, useState } from 'react'
import './NavBar.css'

import { Link } from 'react-router-dom'
import { logout, selectUser } from '../../../Redux/User/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from "react-cookie";



import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'

const menuItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Doctors',
    href: '/doctors',
  },
  {
    name: 'Appointments',
    href: '/appointments',
  },
  {
    name: 'chats',
    href: '/chats'
  },
  {
    name: 'my Doctors',
    href: '/appointed-doctors'

  }
]


const NavBar = () => {

  const user = useSelector(selectUser);
  const [cookies, removeCookie] = useCookies([]);
  const dispatch = useDispatch()



  const handleLogout = () => {

    dispatch(logout())
    removeCookie("token");
  };


  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }



  return (
    <>
      <div className="sticky top-0 z-50 w-full bg-slate-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 text-2xl">
            <Link to='/' className="font-bold text-blue-500">webDoc</Link>
          </div>
          <div className="hidden grow items-start lg:flex">
            <ul className="ml-12 inline-flex space-x-8">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden lg:block">
            {
              user ?
                <Link
                  onClick={handleLogout}

                  type="button"
                  className="rounded-md bg-blue--500 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  signout
                </Link>
                :
                <div>
                  <Link
                    to='/signup'
                    type="button"
                    className="rounded-md bg-blue--500 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  >
                    signup
                  </Link>
                  <Link
                    to='/signin'
                    type="button"
                    className="rounded-md bg-blue--500 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  >
                    signin
                  </Link>
                </div>

            }

          </div>
          <div className="lg:hidden">
            <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
          </div>
          {isMenuOpen && (
            <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
              <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pb-6 pt-5">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center space-x-2">
                      
                      <span className="font-bold">webDoc</span>
                    </div>
                    <div className="-mr-2">
                      <button
                        type="button"
                        onClick={toggleMenu}
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        <span className="sr-only">Close menu</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-y-4">
                      {menuItems.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                        >
                          <span className="ml-3 text-base font-medium text-gray-900">
                            {item.name}
                          </span>
                        </a>
                      ))}
                    </nav>
                  </div>
                  {
                    user ?
                      <button
                        type="button"
                        className="mt-4 w-full rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                      >
                        sigout
                      </button>
                      :
                      <button
                        type="button"
                        className="mt-4 w-full rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                      >
                        signin
                      </button>

                  }

                </div>
              </div>
            </div>
          )}
        </div>
      </div>


    </>
  )
}

export default NavBar