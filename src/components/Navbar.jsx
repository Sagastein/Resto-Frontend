// import React, { useContext } from "react";
 //import { RiMenu2Fill } from "react-icons/ri";
 //import { SidebarContext } from "../hooks/SidebarContent";

// function Navbar() {
//   const { toggle } = useContext(SidebarContext);
//   return (
//     <nav className="h-12 sticky top-0 z-10 bg-slate-100 flex justify-between border p-2 items-end">
//       <RiMenu2Fill
//         onClick={toggle}
//         className="font-bold z-10 sm:hidden text-2xl hover:text-primary hover:scale-105 cursor-pointer"
//       />
//       <span className="text-xs font-medium font-mono">Today Wen, 12/ 2023</span>
//       <span className="capitalize font-medium font-sans underline underline-offset-2">
//         sagastein
//       </span>
//     </nav>
//   );
// }

// export default Navbar;
import React, { useState,useContext } from "react";
import moment from "moment";
 import { RiMenu2Fill } from "react-icons/ri";
 import { SidebarContext } from "../hooks/SidebarContent";

const DashboardNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currentTime = moment().format("hh:mm A");
  const currentDate = moment().format("MMM DD, YYYY");
const { toggle } = useContext(SidebarContext);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="flex sticky top-0 z-10  justify-between items-center bg-gray-100 p-4">
      <div className="flex items-center">
        <RiMenu2Fill
        onClick={toggle}
         className="font-bold z-10 sm:hidden text-4xl hover:text-primary hover:scale-105 cursor-pointer"
       />
        <div className="hidden md:block mr-4">
          <p className="md:text-xl font-bold">{currentDate}</p>
          <span className="text-gray-500 ml-1">{currentTime}</span>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-4 flex items-center">
          <img
            src="https://picsum.photos/20"
            alt="User Profile"
            className="h-8 w-8 rounded-full mr-2"
          />
          <div>
            <span className="text-sm font-semibold">Sage</span>
            <span className="text-xs text-gray-500 block">Admin</span>
          </div>
        </div>
        <div className="relative inline-block">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-1 rounded items-center"
            onClick={toggleDropdown}
          >
            <svg
              className="fill-current h-4 w-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-8a1 1 0 11-2 0 1 1 0 012 0z"
                clipRule="evenodd"
              />
            </svg>
          
          </button>
          {dropdownOpen && (
            <ul
              className="absolute right-0 mt-2 py-2 w-40 bg-white rounded shadow-md"
              onClick={closeDropdown}
            >
              <li className="px-4 py-2">
                <a href="/profile">Profile</a>
              </li>
              <li className="px-4 py-2">
                <button>Logout</button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;


