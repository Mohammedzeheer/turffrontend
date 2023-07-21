
import React from 'react';
import './userHeader.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function UserHeader() {
  const { username } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      <div class="nav">
        <input type="checkbox" id="nav-check" />
        <div className="nav-header">
          <div className="nav-title">
            <img src="/image/AONE.png" alt="Symbol Image" />
          </div>
        </div>

        <div className="nav-btn">
          <label for="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <div className="nav-links">
        <div class="right-links">
          <a>
            <i className="fa fa-phone" aria-hidden="true">
              <span className="contact-link"> Contact us</span>
            </i>
          </a>
          <a>
            <i className="fa fa-user" aria-hidden="true">
              {' '}
              <span className="contact-link"> {username}</span>
            </i>
          </a>
          {username && (
            <a>
              <i className="fa fa-sign-out" aria-hidden="true">
                <span className="contact-link" onClick={handleLogout}>
                  {' '}
                  logout{' '}
                </span>
              </i>
            </a>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHeader;





// import React from 'react';
// // import './userHeader.css';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// function UserHeader() {
//   const { username } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   return (
//     <div>
//       <div className="nav h-16 bg-green-500 relative">
//         <input type="checkbox" id="nav-check" className="hidden" />
//         <div className="nav-header">
//           <div className="nav-title flex items-center">
//             <img src="/image/AONE.png" alt="Symbol Image" className="mt-[-18px] w-180 h-60" />
//           </div>
//         </div>

//         <div className="nav-btn">
//           <label htmlFor="nav-check">
//             <span></span>
//             <span></span>
//             <span></span>
//           </label>
//         </div>

//         <div className="nav-links">
//           <a className="inline-block px-10 py-13 text-white no-underline mr-10 hover:bg-black bg-opacity-30">
//             <i className="fa fa-phone" aria-hidden="true">
//               <span className="contact-link"> Contact us</span>
//             </i>
//           </a>
//           <a className="inline-block px-10 py-13 text-white no-underline mr-10 hover:bg-black bg-opacity-30">
//             <i className="fa fa-user" aria-hidden="true">
//               {' '}
//               <span className="contact-link"> {username}</span>
//             </i>
//           </a>
//           {username && (
//             <a className="inline-block px-10 py-13 text-white no-underline mr-10 hover:bg-black bg-opacity-30">
//               <i className="fa fa-sign-out" aria-hidden="true">
//                 <span className="contact-link" onClick={handleLogout}>
//                   {' '}
//                   logout{' '}
//                 </span>
//               </i>
//             </a>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserHeader;







