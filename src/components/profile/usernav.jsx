import { NavLink } from "react-router-dom";

const usernav = () => {
  return (
    <>
      <nav className="p-2  my-4">
        <ul className="flex justify-around">
          <NavLink end to="">
            <li className="cursor-pointer p-2 capitalize font-serif font-medium text-sm">
              Account settings
            </li>
          </NavLink>
          <NavLink to="deposit">
            <li className="cursor-pointern p-2 capitalize font-serif font-medium text-sm">
              new deposit
            </li>
          </NavLink>
          <NavLink to="trans">
            <li className="cursor-pointer p-2 capitalize font-serif font-medium text-sm">
              Transactions
            </li>
          </NavLink>
        </ul>
        <hr />
      </nav>
    </>
  );
};

export default usernav;
