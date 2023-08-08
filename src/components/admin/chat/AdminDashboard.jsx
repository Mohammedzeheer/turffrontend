import React, { useState } from 'react';
import Sidebar from './SideBar';
import AdminChat from './AdminChat';

const users = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
  // Add more users here
];

const AdminDashboard = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="admin-dashboard">
      <Sidebar users={users} onUserClick={handleUserClick} />
      {selectedUserId !== null && <AdminChat userId={selectedUserId} />}
    </div>
  );
};

export default AdminDashboard;
