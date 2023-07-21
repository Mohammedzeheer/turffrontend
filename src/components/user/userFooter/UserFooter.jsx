import React from 'react';

const UserFooter = () => {
  return (
    <footer className="bg-[#060b1e] text-gray-300 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 bg-white"></div>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-white">Home</a>
            </li>
            <li>
              <a href="#" className="hover:text-white">About</a>
            </li>
            <li>
              <a href="#" className="hover:text-white">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;
