import React, { useState, useEffect } from 'react';
import { AxiosAdmin, AxiosUser } from '../../../api/AxiosInstance';
import { useSelector } from 'react-redux';

const PartnerChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch messages from the server
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
        const response = await AxiosAdmin.get('getMessages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (message.trim() !== '') {
      try {
        await AxiosAdmin.post('addMessages', {
          sender: 'manager',
          content: message,
        });
        setMessage('');
        fetchMessages();
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-4">
        <div className="mb-4">
          {/* Display messages */}
          {messages.map((msg, index) => (
            <div key={index} className="text-gray-600 mb-2">
              {msg.sender === 'manager' ? (
                <span className="font-bold text-blue-500">Manager: </span>
              ) : (
                <span className="font-bold text-green-500">User: </span>
              )}
              {msg.content}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            className="flex-grow border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-md py-2 px-4"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnerChat;
