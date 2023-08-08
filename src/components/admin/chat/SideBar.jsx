import React from 'react';

const Sidebar = ({ users, onUserClick }) => {
  return (
    <div className="sidebar">
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => onUserClick(user.id)}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;