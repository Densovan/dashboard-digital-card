import { MetricsCards } from "@/components/metric-card";
import { RecentActivity } from "@/components/recent-activity";
import { RevenueChart } from "@/components/revenue-chart";
import { TopProducts } from "@/components/top-products";
import { useAuthStore } from "@/store/auth-store";

const Dashboard = () => {
  const accessToken = useAuthStore((s) => s.accessToken);
  console.log(accessToken, "accessToken");

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="space-y-4">
        <MetricsCards />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <RevenueChart />
          <RecentActivity />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <TopProducts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
