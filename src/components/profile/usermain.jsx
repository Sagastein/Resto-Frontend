import React from "react";
import Usernav from "./usernav";
import { Outlet } from "react-router-dom";
const usermain = () => {
  return (
    <main className="flex-1 rounded-md bg-white">
      <Usernav />
      <Outlet />
    </main>
  );
};

export default usermain;
