import { useEffect, useState } from "react";
import Siderbar from "../components/Siderbar";
import Navbar from "../components/Navbar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { SidebarContext } from "../hooks/SidebarContent";
import { useIsAuthenticated, useAuthUser, useSignOut } from "react-auth-kit";
function AdminRoutes() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const auth = useAuthUser();
  const singout = useSignOut();
  const isAuthenticated = useIsAuthenticated();
   if (!isAuthenticated()) {
     return <Navigate to={"/"} />;
   }
  if (auth().role !== "user") {
    alert("UNATHORIZED ACCESS");
    return singout();
  }

  return (
    <main className="flex overscroll-contain overflow-hidden h-screen w-full bg-slate-100">
      <SidebarContext.Provider value={{ isOpen, toggle }}>
        <Siderbar />
        <section className="flex-1 h-full overflow-y-auto">
          <Navbar />
          <Outlet />
        </section>
      </SidebarContext.Provider>
    </main>
  );
}

export default AdminRoutes;
