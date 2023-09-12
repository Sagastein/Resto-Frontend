import React, { useContext } from "react";
import { RxDashboard } from "react-icons/rx";
import { FiUsers } from "react-icons/fi";
import { BsArrowLeftCircle } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RiAccountBoxLine, RiExchangeBoxLine } from "react-icons/ri";
import { SidebarContext } from "../hooks/SidebarContent";
import { NavLink } from "react-router-dom";
const Siderbar = () => {
  const { isOpen, toggle } = useContext(SidebarContext);

  const menu = [
    { name: "Dashboard", icon: <RxDashboard />, link: "" },
    { name: "Users", icon: <FiUsers />, link: "users" },
    { name: "Account", icon: <RiAccountBoxLine />, link: "account" },
    { name: "Transaction", icon: <RiExchangeBoxLine />, link: "transaction" },
  ];

  return (
    <aside
      className={` ${
        isOpen
          ? "fixed z-20 duration-300 transition-all sm:static"
          : "hidden transition-all  duration-300 sm:flex"
      } w-64 sm:flex flex-col bg-primary border-r-[3px] xl:w-[20vw] border-white h-screen delay-300 transition-all duration-500`}
    >
      <section className="flex mt-5">
        <div className="w-min mx-auto">
          <span className="text-white text-4xl rounded-md shadow-md shadow-black tracking-widest">
            Saga
          </span>
        </div>
        <span
          onClick={toggle}
          className="text-white text-4xl sm:hidden hover:scale-105 cursor-pointer mx-5"
        >
          <AiOutlineCloseCircle />
        </span>
      </section>
      <span className="w-11/12 bg-white p-[1px] mx-auto rounded-md"></span>
      <div className="grid my-16 py-4 justify-center">
        <ul className="text-white grid space-y-8 capitalize tracking-wide">
          {menu.map((menuItem, index) => (
            <li key={index} className="grid rounded-md hover:bg-slate-700 my-2">
              <NavLink
                end
                onClick={toggle}
                className="p-2 rounded-md"
                to={menuItem.link}
              >
                <div className="grid  cursor-pointer grid-flow-col  gap-2 justify-start items-center">
                  <span className="text-xl font-bold fill-currentrounded-md">
                    {menuItem.icon}
                  </span>
                  <span className="font-normal text-fluid uppercase">
                    {menuItem.name}
                  </span>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute left-9  bottom-3 mx-auto cursor-pointer border rounded flex gap-2 justify-center items-center">
        <span className="text-white text-xl">
          <BsArrowLeftCircle />
        </span>
        <span className="text-white capitalize">logout</span>
      </div>
    </aside>
  );
};

export default Siderbar;
