import React from 'react';

const UserHome3 = () => {
    return (
        <div className="flex justify-center items-center bg-gray-200 min-h-screen">
          <div className="flex flex-wrap max-w-6xl">
            {/* Left side - Big text */}
            <div className="w-full md:w-1/2 p-4">
              <h1 className="text-4xl font-bold font-mono">YOUR NEAREST </h1>
              <h1 className="text-4xl font-bold font-mono">FOOTBALL TURF</h1>
              <p><span className='font-thin'>IS JUST A TAP AWAY</span></p>
              <p className="text-lg mt-4">
                 Want to play football ?
               <br/> <span className='font-sm'>
                   The field is where I feel at home, where I can express myself, and where the magic of football happens."
                   </span>              
                   </p>
            </div>
    
            {/* Right side - Image */}
            <div className="w-full md:w-1/2 p-4">
              <img
                src="/image/turf6.png"          
                alt="Image"
                className="w-full h-auto mx-auto my-auto"
              />
            </div>
          </div>
        </div>
      );
    };

export default UserHome3;
