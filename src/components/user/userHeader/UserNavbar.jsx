import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { FiChevronDown } from "react-icons/fi";
import { logoutUser } from '../../../redux/userSlice'; 

const PartnerNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
 
  const { username } = useSelector((state) => state.user);

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(logoutUser());
    Navigate('/login');
  };

  const Image = () => (
    <img className="w-[170px] h-20px mx-2" src="/image/AONE.png" alt="Logo" />
  );

  useEffect(() => {
    const checkLogin = () => {
      const checkToken = localStorage.getItem("user");
      if (checkToken) {
        setLogin(true);
      }
    };
    checkLogin();
  }, []);



  return (
    <>
      <nav className="bg-customGreen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div onClick={()=>Navigate('/')} className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-white">
              <Image/>
              {/* A one Turf */}
            </div>
            <div className="hidden md:block flex items-center space-x-4">
              {isLogin && (
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md hover:bg-customBlue text-indigo-600 hover:text-gray-500"
                      // onClick={() => setIsOpen(!isOpen)}
                      onMouseEnter={() => setIsOpen(!isOpen)}
                    >
                      {isLogin && <span className="text-white mr-1 ">{username}</span>}
                      <span className="text-white"><FiChevronDown /></span>
                    </button>


                  </div>
                  {isOpen && (
                   <div className="origin-top-right absolute right-0 mt-2 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                   <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">

                        <button
                          type="button"
                          onClick={() => Navigate('/profile')}
                          className="block px-4 py-2 font-medium text-sm text-customBlue  hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          Profile
                        </button>
                        <button
                          type="button"
                          onClick={() => Navigate('/message')}
                          className="block px-4 py-2 font-medium text-sm text-customBlue  hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          Contact
                        </button>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="block px-4 py-2 font-medium text-sm text-customBlue  hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {!isLogin && (
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white  hover:bg-customBlue"
                  onClick={() => Navigate("/login")}
                >
                  Get Started
                </button>
              )}
            </div>

            
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                // className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-customBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-customBlue focus:outline-none  focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                {/* <span className="sr-only">isOpen main menu</span> */}
                {isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`${isOpen ? "block" : "hidden"} md:hidden`}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isLogin && (
              <>
                <a
                  href="/profile"
                  className="text-gray-300 hover:bg-customBlue w-[85px] hover:text-white block px-3 py-1 rounded-md font-medium no-underline"
                >
                  Profile
                </a>
                <a
                  href="/message"
                  className="text-gray-300 hover:bg-customBlue w-[85px] hover:text-white block px-3 py-1 rounded-md font-medium no-underline"
                >
                  Contact
                </a>
                <a
                  onClick={handleLogout}
                  className="text-gray-300 hover:bg-customBlue w-[85px] hover:text-white block px-3 py-1 rounded-md font-medium no-underline"
                >
                  Logout
                </a>
              </>
            )}
            {!isLogin && (
              <button
                type="button"
                // className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white  hover:bg-customBlue"              
                onClick={() => Navigate("/login")}
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default PartnerNavbar;
