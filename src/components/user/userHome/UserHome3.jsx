import React from 'react';

const UserHome3 = () => {
    return (
        <div className="flex justify-center items-center bg-gray-200  sm:min-h-screen">
          <div className="flex flex-wrap max-w-6xl mt-4">
            {/* Left side - Big text */}
            <div className="w-full md:w-1/2 p-4 ">
              <h1 className="text-3xl sm:text-4xl font-bold font-sans">YOUR NEAREST </h1>
              <h1 className="text-3xl sm:text-4xl font-bold font-sans">FOOTBALL TURF</h1>
              <p><span className='font-thin'>IS JUST A TAP AWAY</span></p>
              <p className="text-lg mt-4">
                 Want to play football ?
               <br/> <span className='text-gray-900 text-xs font-thin sm:text-lg line-clamp-2'>
                   The field is where I feel at home, where I can express myself, and where the magic of football happens."
                   </span>              
                   </p>
            </div>
    
            {/* Right side - Image */}
            <div className="w-full md:w-1/2 p-4">
              <img
                src="/image/turf6.png"          
                alt="footballl"
                className="w-full h-auto mx-auto my-auto"
              />
            </div>
          </div>
        </div>
      );
    };

export default UserHome3;
