import React, { useState } from 'react'
import { BsArrowLeftShort,BsSearch,BsChevronDown} from "react-icons/bs";
import { BiFootball} from "react-icons/bi";
import {RiDashboardFill} from  'react-icons/ri'


import { FaUsers } from "react-icons/fa";

function Sidebar() {

    const [open ,setOpen]= useState(true)
    const [submenuOpen ,setSubmenuOpen]= useState(false)

    const Menus = [{ title: "Dashbords" },
    { title: "Manager" },
    { title: "Users" },
    { title: "Turfs", spacing: true },

    {
        title: "Bookings",
        submenu: true,
        submenuItems: [
        { title: "submenu1" },
        { title: "submenu2" },
        { title: "submenu3" },
        ]
    },

    { title: "Manager" },
    { title: "Turfs", spacing: true },
    { title: "Logout" },
    ]
      
    
  return (
      <div className='flex'>
          <div className={`bg-dark-purple h-screen p-5 pt-8 ${open ? 'w-60' : 'w-16'} duration-300 relative`}>
              <BsArrowLeftShort className={`bg-white text-dark-purple text-3xl 
          rounded-full absolute -right-3 top-9 border-2 border-dark-purple cursor-pointer ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />


              <div className='inline-flex'>
                  <BiFootball className={`bg-amber-300 text-3xl rounded cursor-pointer block float-left mr-2 duration-500 ${open && "rotate-[360deg]"}`} />
                  <h1 className={`text-white origin-left font-medium text-2xl ${!open && "scale-0"}`}>AoneTurf</h1>
              </div>

               {/* search */}
              {/* <div className={`flex items-center rounded-md bg-ligt-white mt-3 ${!open ? "px-2.5":"px-4"} py-2`}>
                        <BsSearch className={`text-white text-lg block float-left cursor-pointer ${open && "mr-2"}`}/>
                        <input type={"search"} placeholder='Search' className={`text-base bg-transparent 
                        w-full text-white focus:outline-none ${!open && "hidden"}`}/>
              </div> */}

              <ul className='pt-2'>
              {Menus.map((menu, index) => {
    return (
        <React.Fragment key={index}>
    <li
        className={`text-white text-sm flex items-center gap-x-2 cursor-pointer p-2 hover:bg-light-white rounded-md ${
            menu.spacing ? "mt-9" : "mt-2"
        }`}
    >
        <span>
            <RiDashboardFill className="text-2xl ml-1" />
        </span>
        <span className={`ml-2 text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>
            {menu.title}
        </span>

        {menu.submenu && open && (
            <BsChevronDown
                className={`text-white ${submenuOpen ? "transform rotate-180" : ""}`}
                onClick={() => {
                    setSubmenuOpen(!submenuOpen);
                }}
            />
        )}
    </li>

    {menu.submenu && submenuOpen && open && (
        <ul>
            {menu.submenuItems.map((submenuItem, index) => (
                <li
                    key={index}
                    className="text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md"
                >
                    {submenuItem.title}
                </li>
            ))}
        </ul>
    )}
</React.Fragment>

    );
})}
                </ul>

          </div> 
          


          <div className='p-7'>
              <h1 className='text-2xl font-semibold'>Home page</h1>
          </div>

          

      </div>
  )
}

export default Sidebar