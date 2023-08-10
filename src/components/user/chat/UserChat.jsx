import React, { useState, useEffect } from 'react';
import { AxiosUser } from '../../../api/AxiosInstance';
import UserNavbar from "../userHeader/UserNavbar";
import UserFooter from '../userFooter/UserFooter';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineSend } from "react-icons/ai";

const UserChat = () => {
  const userToken = localStorage.getItem('user');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(null); // Set initial state to null

  const headers = { authorization: userToken };

  useEffect(() => {
    fetchMessages();
  }, []);




  const fetchMessages = async () => {
    try {
      const response = await AxiosUser.get('getMessages', { headers });
      const sortedMessages = response.data.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      const messagesWithSentByUser = sortedMessages.map(msg => ({
        ...msg,
        sentByUser: msg.sender === 'user',
      }));
      setMessages(messagesWithSentByUser);
    } catch (error) {
      console.log('Error fetching messages:', error);
      toast.error('Error fetching messages');
    }
  };
  


  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = { hour: 'numeric', minute: 'numeric' };
    return date.toLocaleTimeString(undefined, options);
  }
  


  function isDifferentDate(timestamp1, timestamp2) {
    const date1 = new Date(timestamp1).toLocaleDateString();
    const date2 = new Date(timestamp2).toLocaleDateString();
    return date1 !== date2;
  }
  
  // Format date with month name
  function formatDate(timestamp) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, options);
  }
  



  const sendMessage = async () => {
    if (message.trim() !== '') {
      try {
        await AxiosUser.post(
          'addMessages',
          {
            sender: 'user',
            content: message,
          },
          { headers }
        );
        setMessage('');
        fetchMessages();
      } catch (error) {
        console.log('Error sending message:', error);
        toast.error('Error sending message');
      }
    }
  };

  return (
    <>
      <UserNavbar />
  <div className="flex flex-col items-center justify-center sm:m:1 m-5 ">
  <div className='w-full max-w-xl bg-gray-500 h-6'></div>
  <div className="w-full max-w-xl bg-white shadow-lg rounded-lg pt-4">


 <div className="mb-4 h-[350px] overflow-y-auto p-4">
          {/* Display messages */}
          {messages === null ? (
            <p>Loading messages...</p>
          ) : messages.length === 0 ? (
            <p>No messages to display.</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index}>
                {index === 0 || isDifferentDate(messages[index - 1].createdAt, msg.createdAt) ? (
                  <div className="text-center text-xs text-gray-400 mt-2">
                    {formatDate(msg.createdAt)}
                  </div>
                ) : null}
                <div
                  className={`text-gray-600 mb-2 ${
                    msg.sender === 'manager' ? 'flex justify-start' : 'flex justify-end'
                  }`}
                >
                  <div
                    className={`mr-0 rounded-lg py-1 pl-2 pr-8 ${
                      msg.sender === 'manager' ? 'bg-gray-300' : 'bg-green-500 text-white'
                    }`}
                    style={{ maxWidth: '70%' }}
                  >
                    {msg.content}

                    <div className={`text-[10px] ${
                      msg.sender === 'manager' ? 'text-gray-500' : 'text-gray-300'
                    }`}>
                      {/* {formatTimestamp(msg.createdAt)}<span className="text-xs text-gray-500 flex-justify-end">✓</span> */}

                      <div className="flex items-center justify-between">
  <span>{formatTimestamp(msg.createdAt)}</span>
  {msg.sentByUser && (
    <span className="text-xs text-gray-500 ml-2">✓</span>
  )}
</div>

                    </div>

                  </div>
                </div>
              </div>
            ))
          )}
        </div>


<div className="flex flex-col md:flex-row m-4">
  <input
    type="text"
    className="flex-grow border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0"
    placeholder="Type your message..."
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    }}
  />
  <button
    className="bg-customGreen hover:bg-green-800 text-white rounded-r-md h-10 px-4"
    onClick={sendMessage}
  >
    Send <AiOutlineSend className='inline mb-1'/>
  </button>
</div>




  </div>
</div>

      <UserFooter />
    </>
  );
};

export default UserChat;









{/* <div className="flex flex-col md:flex-row m-4">
  <input
    type="text"
    className="md:flex-grow border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0"
    placeholder="Type your message..."
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    }}
  />
  <button
    // className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-md h-10 px-4"
    className="bg-customGreen hover:bg-green-800 text-white rounded-r-md h-10 px-4"
    onClick={sendMessage}
  >
    Send <AiOutlineSend className='inline mb-1'/>
  </button>
</div> */}


  // const fetchMessages1 = async () => {
  //   try {
  //     const response = await AxiosUser.get('getMessages', { headers });
  //     const sortedMessages = response.data.sort(
  //       (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  //     );
  //     setMessages(sortedMessages);
  //   } catch (error) {
  //     console.log('Error fetching messages:', error);
  //     toast.error('Error fetching messages');
  //   }
  // };




  {/* <div className="mb-4 h-[350px] overflow-y-auto">
  {messages === null ? (
    <p>Loading messages...</p>
  ) : ( 
    messages?.map((msg, index) => (
      <div
        key={index}
        className={`text-gray-600 mb-2 ${
          msg.sender === 'manager' ? 'flex justify-start' : 'flex justify-end'
        }`}
      >
        <div
          className={`mr-3 rounded-lg p-2 ${
            msg.sender === 'manager' ? 'bg-gray-300' : 'bg-green-400 text-white'
          }`}
          style={{ maxWidth: '70%' }}
        >
          {msg.content} */}

          {/* {msg.sentByUser ? (
            <span className="text-xs text-gray-500 flex justify-end">✓</span>
          ) : (
            ''
            // <span className="text-xs text-gray-500 block mt-1">✓✓</span>
          )} */}

{/* 
          <div className="text-xs text-gray-500 mt-1">
      {formatTimestamp(msg.createdAt)}
    </div>

        </div>
      </div>
    ))
  )}
</div> */}






// messages.map((msg, index) => (
    //   <div
    //     key={index}
    //     className={`text-gray-600 mb-2 ${
    //       msg.sender === 'manager' ? 'flex justify-start' : 'flex justify-end'
    //     }`}
    //   >
    //     <div
    //       className={`mr-3 rounded-lg p-2 ${
    //         // msg.sender === 'manager' ? 'bg-gray-300' : 'bg-blue-500 text-white'
    //         msg.sender === 'manager' ? 'bg-gray-300' : 'bg-green-400 text-white'
    //       }`}
    //       style={{ maxWidth: '70%' }} // Limit message width for better readability
    //     >
    //       {msg.content}
    //     </div>
    //   </div>