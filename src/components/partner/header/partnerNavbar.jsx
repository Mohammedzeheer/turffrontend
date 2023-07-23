import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { FiChevronDown } from "react-icons/fi";

const PartnerNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const Navigate = useNavigate();
 
  const {username} = useSelector((state) => state.partner);

  const Image = () => (
    <img className="w-[170px] h-20px mx-2" src="/image/AONE.png" alt="Logo" />
  );

  useEffect(() => {
    const checkLogin = () => {
      const checkToken = localStorage.getItem("partner");
      if (checkToken) {
        setLogin(true);
      }
    };
    checkLogin();
  }, []);

  const logoutTurf = () => {
    localStorage.removeItem("partner");
    Navigate("/partnerlogin");
  };

  return (
    <>
      <nav className="bg-customGreen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-white">
              <Image />
            </div>
            <div className="hidden md:block flex items-center space-x-4">
              {isLogin && (
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      // className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 hover:text-gray-500"    
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      {isLogin && <span className="text-gray-300">{username}</span>}
                      <span className="text-white"><FiChevronDown/></span> 
                      {/* <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3.586L3.707 9.88a1 1 0 001.414 1.415L10 6.414l4.879 4.881a1 1 0 001.414-1.415L10 3.586z"
                          clipRule="evenodd"
                        />
                      </svg> */}
                    </button>
                  </div>
                  {isOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-38 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <a
                          href="/partner/profile"
                          className="block px-4 py-2 no-underline text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          Profile
                        </a>
                        <button
                          type="button"
                          onClick={logoutTurf}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
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
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => Navigate("/partnerlogin")}
                >
                  Get Started
                </button>
              )}
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">isOpen main menu</span>
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
                  href="/partner/profile"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md font-medium"
                >
                  Profile
                </a>
                <button
                  type="button"
                  onClick={logoutTurf}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md font-medium"
                >
                  Logout
                </button>
              </>
            )}
            {!isLogin && (
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                onClick={() => Navigate("/partnerlogin")}
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
