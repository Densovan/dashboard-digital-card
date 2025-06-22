import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { Navigate } from "react-router";
import { AppSidebar } from "./app-sidebar";
import { Outlet, useLocation } from "react-router";
import { SiteHeader } from "./sidebar-header";
import { useAuthStore } from "@/store/auth-store";

const DashboardLayout: React.FC = () => {
  // const isLogin = useAuthStore((s) => s.isAuthenticated);
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  // if (!hasCheckedAuth) {
  //   return <div className="p-6 text-center">🔄 Loading...</div>; // or a spinner
  // }
  if (!isAuthenticated) {
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
