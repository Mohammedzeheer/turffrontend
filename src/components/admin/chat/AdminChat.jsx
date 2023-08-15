import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { AxiosAdmin } from '../../../api/AxiosInstance';
import Navbar from '../navbar/Navbar';
import io from 'socket.io-client'; 

const AdminChat = () => {
  const adminToken = localStorage.getItem('admin');
  const headers = { authorization: adminToken };
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Establish a Socket.IO connection
  const socket = io('http://localhost:4000'); 

  useEffect(() => {
    fetchUsers();
  },[]);

  useEffect(() => {
    fetchMessages();
    socket.on('message', (newMessage) => {
      setMessages((prevMessages) => [...(prevMessages?.length?prevMessages:[]),newMessage]);
    });
    return () => {
      socket.disconnect();
    };
  });


  const fetchMessages = async () => {
    try {
      const url = selectedUserId ? `getMessages?userId=${selectedUserId}` : 'getMessages';
      const response = await AxiosAdmin.get(url);
      const sortedMessages =await response.data.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setMessages(sortedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Error fetching messages');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await AxiosAdmin.get('users', { headers });
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Error fetching users');
    }
  };


  const sendMessage = async () => {
    if (message.trim() !== '') {
      try {
        const newMessage = {
          userId: selectedUserId,
          sender: 'manager',
          content: message,
        };
        await AxiosAdmin.post('addMessages', newMessage);
        setMessage('');
        socket.emit('message',newMessage)
      } catch (error) {
        console.error('Error sending message:', error);
        toast.error('Error sending message');
      }
    }
  };

  function isDifferentDate(timestamp1, timestamp2) {
    const date1 = new Date(timestamp1).toLocaleDateString();
    const date2 = new Date(timestamp2).toLocaleDateString();
    return date1 !== date2;
  }

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = { hour: 'numeric', minute: 'numeric' };
    return date.toLocaleTimeString(undefined, options);
  }
  
  function formatDate(timestamp) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, options);
  }


  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };


  const filteredMessages = messages?.filter((msg) => {
    if (selectedUserId === null) {
      return msg.sender === '';
    } else {
      return (
        (msg.sender === 'manager' || msg?.userId._id === selectedUserId) &&
         msg.userId._id === selectedUserId
      );
    }
  });

  return (
    <>
      <Navbar />
      <div className="flex flex-row m-8 h-screen">
        {/* SIDE BAR */}
        <div className="w-1/8 md:w-1/6 bg-white shadow-lg rounded-lg p-4 overflow-y-auto h-screen sm:h-[500px]">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <div className="space-y-2">
            {users.map((user) => (
              <div
                key={user._id}
                className={`flex items-center p-2 cursor-pointer hover:bg-gray-200 rounded-lg ${
                  selectedUserId === user._id ? 'bg-blue-100' : ''
                }`}
                onClick={() => handleUserClick(user._id)}
              >
                <img
                  src={user?.image || 'default-avatar.png'} 
                  alt={user.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span>{user.username}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Message List */}
        <div className="w-7/8 md:w-5/6 bg-white shadow-lg rounded-lg h-screen sm:h-[500px]">
          <div className="h-full flex flex-col">
            <div className="mb-4 h-screen overflow-y-auto p-4">
              {/* Display Messages */}
              {messages.length === 0 ? (
                <p>No messages to display.</p>
              ) : (
                filteredMessages.map((msg, index) => (
                  <div key={index}>
                    {index === 0 || isDifferentDate(filteredMessages[index - 1].createdAt, msg.createdAt) ? (
                      <div className="text-center text-xs text-gray-400 mt-2">
                        {formatDate(msg.createdAt)}
                      </div>
                    ) : null}
                    <div
                      className={`text-gray-600 mb-2 ${
                        msg.sender === 'manager' ? 'flex justify-end' : 'flex justify-start'
                      }`}
                    >
                      <div
                        className={`mr-3 rounded-lg py-1 pl-2 pr-8 ${
                          msg.sender === 'manager' ? 'bg-blue-500 text-white' : 'bg-gray-300'
                        }`}
                        style={{ maxWidth: '70%' }}
                      >
                        {msg.content}
                        <span
                          className={`text-xs block  ${
                            msg.sender === 'manager' ? 'text-gray-300' : 'text-gray-500'
                          }`}                      
                        >
                          {formatTimestamp(msg.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center border-t border-gray-300 p-3">
              <input
                type="text"
                className="flex-grow border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault(); 
                    sendMessage();
                  }
                }}
              />
              <button
                className="bg-blue-500 hover:bg-blue-600 m-1 text-white rounded-r-md py-2 px-4"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminChat;

























// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import { AxiosAdmin } from '../../../api/AxiosInstance';
// import Navbar from '../navbar/Navbar';

// const AdminChat = () => {
//   const adminToken = localStorage.getItem('admin');
//   const headers = { authorization: adminToken };
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [selectedUserId, setSelectedUserId] = useState(null);

//   useEffect(() => {
//     fetchMessages();
//     fetchUsers();
//   }, []);

//   const fetchMessages = async () => {
//     try {
//       const url = selectedUserId ? `getMessages?userId=${selectedUserId}` : 'getMessages';
//       const response = await AxiosAdmin.get(url);
//       const sortedMessages = response.data.sort(
//         (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
//       );
//       setMessages(sortedMessages);
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//       toast.error('Error fetching messages');
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const response = await AxiosAdmin.get('users', { headers });
//       setUsers(response.data.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       toast.error('Error fetching users');
//     }
//   };


//   function isDifferentDate(timestamp1, timestamp2) {
//     const date1 = new Date(timestamp1).toLocaleDateString();
//     const date2 = new Date(timestamp2).toLocaleDateString();
//     return date1 !== date2;
//   }

//   function formatTimestamp(timestamp) {
//     const date = new Date(timestamp);
//     const options = { hour: 'numeric', minute: 'numeric' };
//     return date.toLocaleTimeString(undefined, options);
//   }
  
//    function formatDate(timestamp) {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     const date = new Date(timestamp);
//     return date.toLocaleString(undefined, options);
//   }

//   const sendMessage = async () => {
//     if (message.trim() !== '') {
//       try {
//         const newMessage = {
//           userId: selectedUserId,
//           sender: 'manager',
//           content: message,
//           createdAt: new Date().toISOString(),
//         };
//         await AxiosAdmin.post('addMessages', newMessage);
//         setMessage('');
//         fetchMessages();
//       } catch (error) {
//         console.error('Error sending message:', error);
//         toast.error('Error sending message');
//       }
//     }
//   };

//   const handleUserClick = (userId) => {
//     setSelectedUserId(userId);
//   };

//   const filteredMessages = messages.filter((msg) => {
//     if (selectedUserId === null) {
//       return msg.sender === '';
//     } else {
//       return (
//         (msg.sender === 'manager' || msg.userId._id === selectedUserId) &&
//         msg.userId._id === selectedUserId
//       );
//     }
//   });

//   return (
//     <>
//       <Navbar />
//       {/* <div className="flex flex-col md:flex-row bg-gray-100 h-screen"> */}
//       <div className="flex flex-row m-8 h-screen">
//         {/* SIDE BAR */}
//         <div className="w-1/8 md:w-1/6 bg-white shadow-lg rounded-lg p-4 overflow-y-auto h-screen">
//           <h2 className="text-xl font-semibold mb-4">Users</h2>
//           <div className="space-y-2">
//             {users.map((user) => (
//               <div
//                 key={user._id}
//                 className={`flex items-center p-2 cursor-pointer hover:bg-gray-200 rounded-lg ${
//                   selectedUserId === user._id ? 'bg-blue-100' : ''
//                 }`}
//                 onClick={() => handleUserClick(user._id)}
//               >
//                 <img
//                   src={user?.image || 'default-avatar.png'} 
//                   alt={user.name}
//                   className="w-8 h-8 rounded-full mr-2"
//                 />
//                 <span>{user.username}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Message List */}
//         <div className="w-7/8 md:w-5/6 bg-white shadow-lg rounded-lg h-screen">
//           <div className="h-full flex flex-col">
//             <div className="mb-4 h-screen overflow-y-auto p-4">
//               {messages.length === 0 ? (
//                 <p>No messages to display.</p>
//               ) : (
//                 filteredMessages.map((msg, index) => (
//                   <div key={index}>
//                     {index === 0 || isDifferentDate(filteredMessages[index - 1].createdAt, msg.createdAt) ? (
//                       <div className="text-center text-xs text-gray-400 mt-2">
//                         {formatDate(msg.createdAt)}
//                       </div>
//                     ) : null}
//                     <div
//                       className={`text-gray-600 mb-2 ${
//                         msg.sender === 'manager' ? 'flex justify-end' : 'flex justify-start'
//                       }`}
//                     >
//                       <div
//                         className={`mr-3 rounded-lg py-1 pl-2 pr-8 ${
//                           msg.sender === 'manager' ? 'bg-blue-500 text-white' : 'bg-gray-300'
//                         }`}
//                         style={{ maxWidth: '70%' }}
//                       >
//                         {msg.content}
//                         {/* <span
//                           className={`text-xs block mt-1 ${
//                             msg.sender === 'manager' ? 'text-gray-300' : 'text-gray-500'
//                           }`}
//                           style={{ fontSize: '5px' }}
//                         >
//                           {formatTimestamp(msg.createdAt)}
//                         </span> */}

//                         <span
//                           className={`text-xs block  ${
//                             msg.sender === 'manager' ? 'text-gray-300' : 'text-gray-500'
//                           }`}                      
//                         >
//                           {formatTimestamp(msg.createdAt)}
//                         </span>

//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>

//             <div className="flex items-center border-t border-gray-300 p-3 ">
//               <input
//                 type="text"
//                 className="flex-grow border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Type your message..."
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') {
//                     sendMessage();
//                   }
//                 }}
//               />
//               <button
//                 className="bg-blue-500 hover:bg-blue-600 m-1   text-white rounded-r-md py-2 px-4"
//                 onClick={sendMessage}
//               >
//                 Send
//               </button>
//             </div>

//           </div>
//         </div>

//       </div>
//     </>
//   );
// };

// export default AdminChat;














