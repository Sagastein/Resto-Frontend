import "./App.css";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";

import Account from "./pages/Account";
import Profile from "./pages/Profile";
import { Routes, Route, Navigate } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import Transactions from "./pages/Transactions";
import Login from "./pages/login";
import AdminRoutes from "./Routes/AdminRoutes";
import AccountSettings from "./components/profile/AccountSettings";
import UserDeposit from "./components/profile/UserDeposit";
import UserTransactions from "./components/profile/UserTransactions";

function App() {
  const PrivateRoute = () => {
    
    const isAuthenticated = useIsAuthenticated();
    const auth = isAuthenticated();
    return auth ? <AdminRoutes /> : <Navigate to="/" />;
  };

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="admin" element={<PrivateRoute />}>
        <Route index element={<Dashboard />} />
        <Route path="users/*" element={<User />} />
        <Route path="Account" element={<Account />} />
        <Route path="profile/:id/" element={<Profile />}>
          <Route index element={<AccountSettings />} />
          <Route path="deposit" element={<UserDeposit />} />
          <Route path="trans" element={<UserTransactions />} />
        </Route>
        <Route path="transaction" element={<Transactions />} />
      </Route>
      <Route path="*" element={<div>Page Not |Found</div>} />
    </Routes>
  );
}

export default App;
