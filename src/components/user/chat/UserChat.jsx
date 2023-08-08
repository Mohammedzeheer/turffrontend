import React, { useState, useEffect } from 'react';
import { AxiosUser } from '../../../api/AxiosInstance';
import { useSelector } from 'react-redux';
import UserNavbar from "../userHeader/UserNavbar";
import UserFooter from '../userFooter/UserFooter';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineSend } from "react-icons/ai";

const UserChat = () => {
  const { userId } = useSelector((state) => state.user);
  const userToken = localStorage.getItem('user');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(null); // Set initial state to null

  const headers = { authorization: userToken };

  useEffect(() => {
    // Fetch messages from the server
    fetchMessages();
  }, []);



  const fetchMessages1 = async () => {
    try {
      const response = await AxiosUser.get('getMessages', { headers });
      const sortedMessages = response.data.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setMessages(sortedMessages);
    } catch (error) {
      console.log('Error fetching messages:', error);
      toast.error('Error fetching messages');
    }
  };

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
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
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
  <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-4">
  <div className="mb-4 h-[350px] overflow-y-auto">
  {/* Display messages */}
  {messages === null ? (
    <p>Loading messages...</p>
  ) : (
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
    messages.map((msg, index) => (
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
          {msg.content}
          {msg.sentByUser ? (
            <span className="text-xs text-gray-500 flex justify-end">✓</span>
          ) : (
            ''
            // <span className="text-xs text-gray-500 block mt-1">✓✓</span>
          )}
          {/* <div className="text-xs text-gray-500 mt-1">
      {formatTimestamp(msg.createdAt)}
    </div> */}
        </div>
      </div>
    ))
  )}
</div>
<div className="flex flex-col md:flex-row">
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
</div>


  </div>
</div>

      <UserFooter />
    </>
  );
};

export default UserChat;
