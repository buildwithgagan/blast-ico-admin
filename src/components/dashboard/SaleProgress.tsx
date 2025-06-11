
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const SaleProgress = () => {
  const totalSupply = 10000000; // 10 million tokens
  const soldTokens = 6500000; // 6.5 million tokens
  const percentageSold = (soldTokens / totalSupply) * 100;
  
  const softCap = 3000000; // 3 million tokens
  const hardCap = 10000000; // 10 million tokens
  const softCapPercentage = (softCap / hardCap) * 100;
  
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle>Token Sale Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-medium">{percentageSold.toFixed(1)}%</span>
            </div>
            <div className="relative pt-1">
              <Progress value={percentageSold} className="h-3" />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground">{soldTokens.toLocaleString()} BLAST</span>
              <span className="text-xs text-muted-foreground">{totalSupply.toLocaleString()} BLAST</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-6">
            <div>
              <p className="font-medium">Soft Cap</p>
              <p className="text-xs text-muted-foreground">3M BLAST</p>
              <div className="mt-1">
                <span className="inline-flex items-center rounded-full bg-success/20 px-2 py-1 text-xs font-medium text-success">
                  Reached
                </span>
              </div>
            </div>
            <div>
              <p className="font-medium">Hard Cap</p>
              <p className="text-xs text-muted-foreground">10M BLAST</p>
              <div className="mt-1">
                <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                  In Progress
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SaleProgress;
