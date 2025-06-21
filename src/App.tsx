import { Route, Routes } from "react-router";
import AuthLayout from "./components/Layout/auth-layout";
import LoginForm from "./components/auth-screen/login";
import DashboardLayout from "./components/Layout/dashboard-layout";
import Dashboard from "./screens/dashboard";

function App() {
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
