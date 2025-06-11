
import { Button } from "@/components/ui/button";
import StatsOverview from "@/components/dashboard/StatsOverview";
import SaleProgress from "@/components/dashboard/SaleProgress";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import InvestorDistribution from "@/components/dashboard/InvestorDistribution";
import MilestoneTimeline from "@/components/dashboard/MilestoneTimeline";

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome to the BLAST ICO Control Center</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export Report</Button>
          <Button>Add Investor</Button>
        </div>
      </div>
      
      <StatsOverview />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SaleProgress />
        <InvestorDistribution />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTransactions />
        <MilestoneTimeline />
      </div>
    </div>
  );
};

export default Dashboard;
