import React from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
import { IoMdChatboxes } from 'react-icons/io';
import { MdMessage } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';

const styles = {
  floatingIcon: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    fontSize: '2.5rem',
    cursor: 'pointer',
    zIndex: 1000,
  },
};

function ChatIcon() {
  const navigate = useNavigate();
  const location = useLocation(); 

  const token = localStorage.getItem('user');

  const shouldShowIcon = token && location.pathname !== '/message';
  if (!shouldShowIcon) {
    return null;
  }

  return (
    <div style={styles.floatingIcon}>
      <MdMessage
        onClick={() => navigate('/message')}
        // className='text-customBlue text-4xl sm:text-4xl hover:text-customGreen'
        className='border-e-customBlue text-customGreen text-3xl sm:text-4xl hover:text-gray-600'
      />
    </div>
  );
}

export default ChatIcon;




// import React from 'react'
// import { AiOutlineMessage } from 'react-icons/ai';
// import { MdMessage } from 'react-icons/md';
// import { useNavigate } from 'react-router-dom';

// const styles = {
//     floatingIcon: {
//       position: 'fixed',
//       bottom: '30px', 
//       right: '30px', 
//       fontSize: '2.5rem',
//       cursor: 'pointer',
//       zIndex: 1000, 
//     },
//   };


// function ChatIcon() {   
//   const Navigate=useNavigate()
//   const token = localStorage.getItem('user')
//   if (!token) return Navigate("/login");

//   return (
//     <div style={styles.floatingIcon}>
//     <MdMessage onClick={()=>Navigate('/message')} className='text-customGreen text-4xl sm:text-4xl hover:text-white'/>
//   </div>
//   )
// }

// export default ChatIcon


