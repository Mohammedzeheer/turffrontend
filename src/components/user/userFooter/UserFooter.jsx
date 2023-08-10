import React from 'react';

const UserFooter = () => {

  return (
    <footer className="bg-customBlue text-white py-2">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between">
        <div className="w-full lg:w-1/4  flex justify-center sm:flex-start">
          <img src="/image/AONE.png" alt="Logo" className="h-[60px] w-[170px]" />
        </div>
        <div className="w-full lg:w-3/4 mt-4 lg:mt-0 sm:flex justify-end">
          <ul className="flex items-center space-x-6">
          {/* <p className="text-xs sm:text-sm text-gray-500">© {new Date().getFullYear()}.Designed by Mohammed. All rights reserved.</p> */}
          <p className="text-xs sm:text-sm text-gray-500">
  © {new Date().getFullYear()} Designed by <a className='no-underline  text-gray-400' href="https://mohammedzeheer.github.io/personal/">Mohammed</a>. All rights reserved.
</p>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;









// import React from 'react';

// const UserFooter = () => {
//   return (
//     <footer className="bg-[#060b1e] text-gray-300 py-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <p className="text-sm">&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
//         <div className="flex items-center space-x-2">
//           <div className="h-4 w-4 bg-white"></div>
//           <ul className="flex space-x-4">
//             <li>
//               <a href="#" className="hover:text-white">Home</a>
//             </li>
//             <li>
//               <a href="#" className="hover:text-white">About</a>
//             </li>
//             <li>
//               <a href="#" className="hover:text-white">Contact</a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default UserFooter;
