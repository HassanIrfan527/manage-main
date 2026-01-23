import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../components/AppSidebar";

const DashboardPage = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <h1>Dashboard</h1>
      </main>
    </SidebarProvider>
  );
};

export default DashboardPage;
