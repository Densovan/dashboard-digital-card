import { Route, Routes } from "react-router";
import AuthLayout from "./components/layout/auth-layout";
import LoginForm from "./components/auth-screen/login";
import DashboardLayout from "./components/layout/dashboard-layout";
import Dashboard from "./screens/dashboard";
import { useAuthStore } from "@/store/auth-store";
import { useEffect } from "react";

function App() {
  const checkAuth = useAuthStore((s) => s.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <>
      <Routes>
        {/* Auth Route */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
        </Route>

        {/* Dashboard route */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
