import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Products from "./pages/Products";

import { useRecoilValue } from "recoil";
import { authAtom } from "./recoil/authAtom";
import { themeAtom } from "./recoil/themeAtom";   


import { ProfileProvider } from "./context/ProfileContext";
import WizardContainer from "./components/registration/WizardContainer";


export default function App() {
  const auth = useRecoilValue(authAtom);
  const theme = useRecoilValue(themeAtom);   

  return (
    <div className={theme === "dark" ? "dark bg-black text-white min-h-screen" : "bg-white min-h-screen"}>
      <ProfileProvider>
        <Routes>

          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              auth.isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
            }
          />

          
          <Route
            path="/products"
            element={
              auth.isAuthenticated ? <Products /> : <Navigate to="/login" />
            }
          />

          
          <Route path="*" element={<Navigate to="/login" />} />
          <Route
  path="/register-wizard"
  element={auth.isAuthenticated ? <WizardContainer /> : <Navigate to="/login" />}
          />
          
          



        </Routes>
      </ProfileProvider>
    </div>
  );
}
