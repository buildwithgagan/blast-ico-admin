
import { ArrowDownRight, ArrowUpRight, Users, Coins, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    trend: "up" | "down" | "neutral";
  };
  icon: React.ReactNode;
  className?: string;
}

export const StatCard = ({ title, value, change, icon, className }: StatCardProps) => {
  return (
    <Card className={cn("dashboard-card", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            
            {change && (
              <div className="flex items-center mt-2">
                {change.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-success mr-1" />
                ) : change.trend === "down" ? (
                  <ArrowDownRight className="h-4 w-4 text-destructive mr-1" />
                ) : null}
                <span 
                  className={cn(
                    "text-xs font-medium",
                    change.trend === "up" && "text-success",
                    change.trend === "down" && "text-destructive",
                    change.trend === "neutral" && "text-muted-foreground"
                  )}
                >
                  {change.value}
                </span>
              </div>
            )}
          </div>
          
          <div className="bg-primary/10 p-2 rounded-full">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const StatsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        title="Total Raised"
        value="$3,850,000"
        change={{ value: "+12% this week", trend: "up" }}
        icon={<Coins className="h-5 w-5 text-primary" />}
      />
      <StatCard
        title="Token Sold"
        value="6.5M BLAST"
        change={{ value: "65% of total", trend: "neutral" }}
        icon={<Coins className="h-5 w-5 text-primary" />}
      />
      <StatCard
        title="Investors"
        value="1,240"
        change={{ value: "+24 today", trend: "up" }}
        icon={<Users className="h-5 w-5 text-primary" />}
      />
      <StatCard
        title="Current Price"
        value="$0.85"
        change={{ value: "+5% from start", trend: "up" }}
        icon={<Coins className="h-5 w-5 text-primary" />}
      />
      <StatCard
        title="Days Left"
        value="14"
        change={{ value: "Ends May 14", trend: "neutral" }}
        icon={<Calendar className="h-5 w-5 text-primary" />}
      />
      <StatCard
        title="Total Contributors"
        value="542 ETH"
        change={{ value: "86% via ETH", trend: "neutral" }}
        icon={<Coins className="h-5 w-5 text-primary" />}
      />
    </div>
  );
};

export default StatsOverview;
