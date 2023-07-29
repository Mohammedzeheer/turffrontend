import React, { useState } from 'react'
import { BsArrowLeftShort, BsSearch, BsChevronDown } from "react-icons/bs";
import { BiFootball } from "react-icons/bi";
import { RiDashboardFill } from 'react-icons/ri'
import { ImUserTie } from 'react-icons/im'
import { FaUsers } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { MdManageAccounts } from "react-icons/md";
import { LuBookOpenCheck } from "react-icons/lu";
// import { IoMdGitPullRequest } from "react-icons/io5";
import {Link, useNavigate} from 'react-router-dom'


function Sidebar() {

    const [open, setOpen] = useState(true)
    const [submenuOpen, setSubmenuOpen] = useState(false)
    let navigate= useNavigate()

    const handleLogout =()=>{
        localStorage.removeItem('admin')
        navigate('/admin/login')
    }

    const Menus = [{ title: "Dashbords" , icon: <RiDashboardFill />, link: '/admin/dashboard'},
    // {
    //     title: "Manager",icon:<ImUserTie/>, link:'/admin/managers',
    //     submenu: true,
    //     submenuItems: [
    //         { title: "Manage" ,icon:<MdManageAccounts/>, link: '/admin'},
    //         { title: "Request" },
    //     ]
    // },
    { title: "Manager" , icon: <FaUsers />, link: '/admin/managers'},
    { title: "User" , icon: <FaUsers />, link: '/admin/users'},
    { title: "Turfs" , icon: <BiFootball />, link: '/admin/turfs'},
    { title: "Booking" , icon: <LuBookOpenCheck />, link: '/admin/bookings'},
    // { title: "Logout" , icon: <AiOutlineLogout /> , onClick: handleLogout},
    ]


    return (
        <div className='flex'>
            <div className={`bg-dark-purple h-screen p-5 pt-8 ${open ? 'w-60' : 'w-20'} duration-300 relative`}>
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

                <ul className='pt-2 pl-0'>
                    {Menus.map((menu, index) => {
                        return (
                            <React.Fragment key={index}>
                                <li
                                    className={`text-white text-sm flex items-center gap-x-2 cursor-pointer p-2 hover:bg-light-white rounded-md ${menu.spacing ? "mt-9" : "mt-2"
                                        }`}
                                >
                                    <span className="text-2xl" >
                                    {menu.icon}
                                    </span>
                                    <Link className={`ml-2 text-white no-underline text-base font-medium flex-1 duration-200 ${!open && "hidden"}`} to={menu.link}>
                                        {menu.title}
                                    </Link> 

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
                                            >  {submenuItem.icon}
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

        </div>
    )
}

export default Sidebar



















// import { useState } from "react";
// import { BsArrowLeftShort } from "react-icons/bs"
// import { RiDashboardFill } from "react-icons/ri";
// import { AiOutlineLogout, AiOutlineSchedule, AiOutlineDown } from "react-icons/ai";
// import { FaUserDoctor, FaHospitalUser, FaUserInjured } from "react-icons/fa6";


// function Sidebar() {
//     const [open, setOpen] = useState(true)
//     const [submenuOpen, setSubmenuOpen] = useState(false)

//     const Menus = [
//         { title: 'Dashboard', icon: <RiDashboardFill />, link: '/admin' },
//         {
//             title: 'Doctors', icon: <FaUserDoctor />, link: '#', submenu: true,
//             submenuItems: [
//                 { title: 'Doctors', link: '#' },
//                 { title: 'Requests', link: '#' }
//             ]
//         },
//         { title: 'Patients', icon: <FaUserInjured />, link: '#' },
//         { title: 'Departments', icon: <FaHospitalUser />, link: '#' },
//         { title: 'Appointments', icon: <AiOutlineSchedule />, link: '#' },
//         { title: 'Logout', icon: <AiOutlineLogout />, link: '#' }
//     ]
//     return (
//         <div className={`bg-primary h-screen p-5 pt-8 relative ${open ? 'w-60' : 'w-20'} duration-500`}>
//             <BsArrowLeftShort
//                 className={`bg-white text-primary text-3xl rounded-full absolute -right-3 top-9 border border-primary-600 cursor-pointer duration-700 ${!open && 'rotate-180'}`}
//                 onClick={() => setOpen(!open)}
//             />
//             <ul>
//                 {Menus.map((menu, index) => (
//                     <>
//                         <li key={index} className="text-white flex items-center mb-2 p-2 gap-x-4 cursor-pointer rounded hover:bg-primary-600">
//                             <span className="text-2xl block float-left" >{menu.icon}</span>
//                             <a className={`text-md font-medium ${!open && 'hidden'}`} href={menu.link}>{menu.title}</a>
//                             {menu.submenu && open && (
//                                 <AiOutlineDown className={`ms-auto ${submenuOpen && 'rotate-180'}`} onClick={() => setSubmenuOpen(!submenuOpen)} />
//                             )}
//                         </li>
//                         {menu.submenu && submenuOpen && open && (
//                             <ul>
//                                 {menu.submenuItems.map((item, i) => (
//                                     <li key={i} className="text-white flex items-center mb-1 p-2 ps-10 gap-x-4 cursor-pointer rounded hover:bg-primary-600">
//                                         <a className={`text-md font-medium`} href={item.link}>{item.title}</a>
//                                     </li>
//                                 ))}
//                             </ul>
//                         )}
//                     </>
//                 ))}
//             </ul>
//         </div>

//     )
// }

// export default Sidebar