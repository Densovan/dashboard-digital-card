import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { Navigate } from "react-router";
import { AppSidebar } from "./app-sidebar";
import { Outlet, useLocation } from "react-router";
import { SiteHeader } from "./sidebar-header";
import { useAuthStore } from "@/store/auth-store";

const DashboardLayout: React.FC = () => {
  const isLogin = useAuthStore.getState().isAuthenticated;
  const location = useLocation();

  if (!isLogin) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
