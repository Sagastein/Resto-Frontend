import React, { useState } from "react";
import Adduser from "../components/User/Adduser";
import UsersTable from "../components/User/UsersTable";
import { Routes, Route, Link } from "react-router-dom";
const User = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="mx-4">
      <div className="flex justify-between items-center my-2">
        <h1
          className="mx-4 upp
       text-sm "
        >
          USERS / USERS TABLE
        </h1>
        <button
          onClick={() => setVisible(true)}
          className="px-4 mx-4 py-2 border rounded-md bg-primary
        
        text-white"
        >
          <Link to="adduser">Add User</Link>
        </button>
      </div>

      <UsersTable />
      <Routes>
        <Route path="adduser" element={<Adduser />} />
      </Routes>

      {/* <Adduser onClose={()=>setVisible(false)}/> */}
    </div>
  );
};

export default User;
