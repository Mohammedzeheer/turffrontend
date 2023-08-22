// Layout.js
import React from "react";
import ChatIcon from "./ChatIcon";

const Layout = ({ children }) => {
  return (
    <div>
      <ChatIcon />
      {children}
    </div>
  );
};

export default Layout;
