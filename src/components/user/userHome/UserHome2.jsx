import React from "react";
import { BiFootball } from "react-icons/bi";
import { LuCalendarDays } from "react-icons/lu";
import { BsSearch } from "react-icons/bs";
import { TbMapSearch } from "react-icons/tb";


const UserHome2 = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-2 md:gap-4 md:grid-cols-3">
        {/* First div */}
        <div className="p-4 text-center">
          <div className="mb-4">
            <BiFootball
              size={50}
              style={{ display: "block", margin: "0 auto" }}
            />
            <p className="text-customBlue font-sans text-[30px]  mt-2">Play</p>
          </div>
          <p className="text-gray-600 font-thin">
          You’re the hero, you’ve found a stunning turf or court, 
          booked with ease and now its time to play. 
          The scene is set for your epic match
          </p>
        </div>

        {/* Second div */}
        <div className="p-4 text-center">
          <div className="mb-4">
            <LuCalendarDays
              size={50}
              style={{ display: "block", margin: "0 auto" }}
            />
             <p className="text-customBlue font-sans text-[30px]  mt-2">Book</p>
          </div>
          <p className="text-gray-600 font-thin">
          Connecting with your dream football ground is now a breeze. 
          Utilize our Book Now Button to make an instant online booking. 
          </p>
        </div>

        {/* Third div */}
        <div className="p-4 text-center">
          <div className="mb-4">
            <TbMapSearch
              size={50}
              style={{ display: "block", margin: "0 auto" }}
            />
             <p className="text-customBlue font-sans text-[30px]  mt-2">Search</p>
          </div>
          <p className="text-gray-600 font-thin">
          Are you looking to play after work, organize your  Five's,Seven's football match? 
          Explore the largest network of sports facilities
          </p>
        </div>

      </div>
    </div>
  );
};

export default UserHome2;

