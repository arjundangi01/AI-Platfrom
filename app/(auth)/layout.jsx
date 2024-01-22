import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-[100vh] ">
      {children}
    </div>
  );
};

export default AuthLayout;
