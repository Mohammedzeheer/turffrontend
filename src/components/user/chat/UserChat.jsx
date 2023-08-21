import React, { useState, useEffect } from "react";
import { AxiosUser } from "../../../api/AxiosInstance";
import UserNavbar from "../userHeader/UserNavbar";
import UserFooter from "../userFooter/UserFooter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineSend } from "react-icons/ai";
import io from "socket.io-client";
import { ServerPort } from "../../../api/ServerPort";
import ChatLoading from "./chatLoading";

const UserChat = () => {
  const userToken = localStorage.getItem("user");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const headers = { authorization: userToken };
  const socket = io(ServerPort);

  useEffect(() => {
    fetchMessages();
    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [
        ...(prevMessages?.length ? prevMessages : []),
        newMessage,
      ]);
    });
    return () => {
      socket.disconnect();
    };
  });

  const fetchMessages = async () => {
    try {
      const response = await AxiosUser.get("getMessages", { headers });
      const sortedMessages = response.data.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setMessages(sortedMessages);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching messages:", error);
      setMessages([]);
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (message.trim() !== "") {
      try {
        await AxiosUser.post(
          "addMessages",
          { sender: "user", content: message },
          { headers }
        );
        socket.emit(
          "message",
          { sender: "user", content: message },
          { headers }
        );
        setMessage("");
      } catch (error) {
        console.log("Error sending message:", error);
        toast.error("Error sending message");
      }
    }
  };

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = { hour: "numeric", minute: "numeric" };
    return date.toLocaleTimeString(undefined, options);
  }

  function isDifferentDate(timestamp1, timestamp2) {
    const date1 = new Date(timestamp1).toLocaleDateString();
    const date2 = new Date(timestamp2).toLocaleDateString();
    return date1 !== date2;
  }

  function formatDate(timestamp) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, options);
  }

  return (
    <>
      <UserNavbar />
      {/* </><div className="min-h-screen  items-center justify-center m-2"> */}
      <div className=" flex flex-col items-center justify-center m-2">
        {/* <div className="w-full max-w-xl bg-gray-500 h-6"></div> */}
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg pt-4">
          <div className="mb-4 h-[60vh] sm:h-[70vh] overflow-y-auto p-4">
            {isLoading ? (
              // <p>Loading messages...</p>
              <ChatLoading />
            ) : messages.length === 0 ? (
              <p>No messages to display.</p>
            ) : (
              messages.map((msg, index) => (
                <div key={msg._id || index}>
                  {index === 0 ||
                  isDifferentDate(
                    messages[index - 1].createdAt,
                    msg.createdAt
                  ) ? (
                    <div className="text-center text-xs text-gray-400 my-2">
                      {formatDate(msg.createdAt)}
                    </div>
                  ) : null}
                  <div
                    className={`text-gray-600 mb-2 ${
                      msg.sender === "manager"
                        ? "flex justify-start"
                        : "flex justify-end"
                    }`}
                  >
                    <div
                      className={`mt-[-5px] rounded-lg py-1 pl-2 pr-10 ${
                        msg.sender === "manager"
                          ? "bg-gray-300"
                          : "bg-green-500 text-white"
                      }`}
                      style={{ maxWidth: "80%" }}
                    >
                      {msg.content}
                      {/* <div className="message-content">{msg.content}</div> */}

                      <div
                        className={`text-[9px] mt-[-3px] ${
                          msg.sender === "manager"
                            ? "text-gray-500"
                            : "text-gray-300"
                        }`}
                      >
                        {/* <div className="flex items-center justify-between"> */}
                        <div className=" mr-[-25px] flex justify-end ">
                          <span>{formatTimestamp(msg.createdAt)}</span>
                          {msg.sender === "user" && (
                            <span className="mt-[-1px] text-[10px] text-gray-300 ml-1">
                              ✓
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* <div className="flex flex-col md:flex-row m-4"> */}
          <div className="flex my-4 mx-3">
            <input
              type="text"
              className="flex-grow border border-gray-300 rounded-l-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0"
              // className=" border border-gray-300 rounded-l-md py-2 px-2 sm:px-10 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                  e.preventDefault();
                }
              }}
            />

            <button className="bg-customGreen hover:bg-green-800 text-white rounded-r-full h-10 px-4 flex items-center">
              <span className="block md:hidden">
                <AiOutlineSend className="inline mb-1" />
              </span>
              <span className="hidden md:block">
                Send <AiOutlineSend className="inline mb-1" />
              </span>
            </button>
          </div>
        </div>
      </div>

      <UserFooter />
    </>
  );
};

export default UserChat;







// import React, { useState, useEffect } from 'react';
// import { AxiosUser } from '../../../api/AxiosInstance';
// import UserNavbar from "../userHeader/UserNavbar";
// import UserFooter from '../userFooter/UserFooter';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { AiOutlineSend } from "react-icons/ai";
// import io from 'socket.io-client';
// import { ServerPort } from '../../../api/ServerPort';
// import ChatLoading from './chatLoading';

// const UserChat = () => {
//   const userToken = localStorage.getItem('user');
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [isLoading,setIsLoading]=useState(true)
//   const headers = { authorization: userToken };
//   const socket = io(ServerPort);

//   useEffect(() => {
//     fetchMessages();
//     socket.on('message', (newMessage) => {
//       setMessages((prevMessages) => [...(prevMessages?.length?prevMessages:[]),newMessage]);
//     });
//     return () => {
//       socket.disconnect();
//     };
//   });

//   const fetchMessages = async () => {
//     try {
//       const response = await AxiosUser.get('getMessages', { headers });
//       const sortedMessages = response.data.sort(
//         (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
//       );
//       setMessages(sortedMessages);
//       setIsLoading(false)
//     } catch (error) {
//       console.log('Error fetching messages:', error);
//       setMessages([]);
//       setIsLoading(false)
//     }
//   };

//   const sendMessage = async () => {
//     if (message.trim() !== '') {
//       try {
//         await AxiosUser.post('addMessages', {sender: 'user', content: message,},{ headers });
//         socket.emit('message',{ sender: 'user', content: message,}, { headers })
//         setMessage('');
//       } catch (error) {
//         console.log('Error sending message:', error);
//         toast.error('Error sending message');
//       }
//     }
//   };

//   function formatTimestamp(timestamp) {
//     const date = new Date(timestamp);
//     const options = { hour: 'numeric', minute: 'numeric' };
//     return date.toLocaleTimeString(undefined, options);
//   }

//   function isDifferentDate(timestamp1, timestamp2) {
//     const date1 = new Date(timestamp1).toLocaleDateString();
//     const date2 = new Date(timestamp2).toLocaleDateString();
//     return date1 !== date2;
//   }

//   function formatDate(timestamp) {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     const date = new Date(timestamp);
//     return date.toLocaleString(undefined, options);
//   }

//   return (
//     <>
//       <UserNavbar />
//       {/* </><div className="min-h-screen  items-center justify-center m-2"> */}
//       <div className=" flex flex-col items-center justify-center m-2">
//         {/* <div className="w-full max-w-xl bg-gray-500 h-6"></div> */}
//         <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg pt-4">
//           <div className="mb-4 h-[400px] sm:h-[80vh] overflow-y-auto p-4">
//             {isLoading ? (
//               // <p>Loading messages...</p>
//               <ChatLoading/>
//             ) : messages.length === 0 ? (
//               <p>No messages to display.</p>
//             ) : (
//               messages.map((msg, index) => (
//                 <div key={msg._id || index}>
//                   {index === 0 ||
//                   isDifferentDate(
//                     messages[index - 1].createdAt,
//                     msg.createdAt
//                   ) ? (
//                     <div className="text-center text-xs text-gray-400 my-2">
//                       {formatDate(msg.createdAt)}
//                     </div>
//                   ) : null}
//                   <div
//                     className={`text-gray-600 mb-2 ${
//                       msg.sender === "manager"
//                         ? "flex justify-start"
//                         : "flex justify-end"
//                     }`}
//                   >
//                     <div
//                       className={`mt-[-5px] rounded-lg py-1 pl-2 pr-10 ${
//                         msg.sender === "manager"
//                           ? "bg-gray-300"
//                           : "bg-green-500 text-white"
//                       }`}
//                       style={{ maxWidth: "80%" }}
//                     >
//                       {msg.content}

//                       <div
//                         className={`text-[9px] mt-[-3px] ${
//                           msg.sender === "manager"
//                             ? "text-gray-500"
//                             : "text-gray-300"
//                         }`}
//                       >
//                         {/* <div className="flex items-center justify-between"> */}
//                             <div className=" mr-[-25px] flex justify-end ">
//                           <span>{formatTimestamp(msg.createdAt)}</span>
//                           {msg.sender==='user' && (
//                             <span className="mt-[-1px] text-[10px] text-gray-300 ml-1">
//                               ✓
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* <div className="flex flex-col md:flex-row m-4"> */}
//           <div className="flex my-4 mx-3">
//             <input
//               type="text"
//               className="flex-grow border border-gray-300 rounded-l-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0"
//             // className=" border border-gray-300 rounded-l-md py-2 px-2 sm:px-10 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0"
//               placeholder="Type your message..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   sendMessage();
//                   e.preventDefault();
//                 }
//               }}
//             />

//             {/* <button
//               className="bg-customGreen hover:bg-green-800 text-white rounded-r-md h-10 px-4"
//               onClick={sendMessage}
//             >
//               Send
//               <AiOutlineSend className="inline mb-1" />
//             </button> */}

// <button className="bg-customGreen hover:bg-green-800 text-white rounded-r-full h-10 px-4 flex items-center">
//   <span className="block md:hidden">
//     <AiOutlineSend className="inline mb-1" />
//   </span>
//   <span className="hidden md:block">
//     Send <AiOutlineSend className="inline mb-1" />
//   </span>
// </button>

//           </div>
//         </div>
//       </div>

//       <UserFooter />
//     </>
//   );
// };

// export default UserChat;
