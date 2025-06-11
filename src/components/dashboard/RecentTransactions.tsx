
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  investor: string;
  amount: string;
  tokenAmount: string;
  type: "purchase" | "distribution" | "refund";
  status: "completed" | "pending" | "failed";
  date: string;
}

const transactions: Transaction[] = [
  {
    id: "tx123",
    investor: "0x1a2...3b4c",
    amount: "5.2 ETH",
    tokenAmount: "12,500 BLAST",
    type: "purchase",
    status: "completed",
    date: "2025-04-30 09:14",
  },
  {
    id: "tx122",
    investor: "0x7b8...9c0d",
    amount: "2.8 ETH",
    tokenAmount: "6,720 BLAST",
    type: "purchase",
    status: "completed",
    date: "2025-04-30 08:42",
  },
  {
    id: "tx121",
    investor: "0x4d5...6e7f",
    amount: "1.5 ETH",
    tokenAmount: "3,600 BLAST",
    type: "purchase",
    status: "pending",
    date: "2025-04-30 08:15",
  },
  {
    id: "tx120",
    investor: "0x9a0...1b2c",
    amount: "0.8 ETH",
    tokenAmount: "1,920 BLAST",
    type: "refund",
    status: "completed",
    date: "2025-04-29 23:57",
  },
  {
    id: "tx119",
    investor: "0x3d4...5e6f",
    amount: "4.0 ETH",
    tokenAmount: "9,600 BLAST",
    type: "purchase",
    status: "completed",
    date: "2025-04-29 22:34",
  },
];

const RecentTransactions = () => {
  return (
    <Card className="dashboard-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Recent Transactions</CardTitle>
        <a href="/transaction-history" className="text-sm text-primary hover:underline">View All</a>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between border-b border-border/20 pb-3 last:border-0 last:pb-0">
              <div>
                <p className="font-medium">{tx.investor}</p>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline"
                    className={cn(
                      "text-xs",
                      tx.type === "purchase" && "bg-primary/10 text-primary border-primary/20",
                      tx.type === "distribution" && "bg-success/10 text-success border-success/20",
                      tx.type === "refund" && "bg-warning/10 text-warning border-warning/20"
                    )}
                  >
                    {tx.type}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{tx.tokenAmount}</p>
                <p className="text-xs text-muted-foreground">{tx.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
