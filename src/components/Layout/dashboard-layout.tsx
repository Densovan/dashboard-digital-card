import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Outlet } from "react-router";
import { SiteHeader } from "./sidebar-header";
// import Sidebar from '../components/Sidebar';
// import Navbar from '../components/Navbar';

const DashboardLayout: React.FC = () => {
  return (
    // <div style={{ display: "flex", height: "100vh" }}>
    //   <AppSidebar />
    //   <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
    //     {/* <Navbar /> */}
    //     <main style={{ padding: "1rem", flex: 1 }}>
    //       <Outlet />
    //     </main>
    //   </div>
    // </div>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <Outlet />
        {/* <DashboardContent /> */}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
