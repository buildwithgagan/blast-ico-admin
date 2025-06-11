
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Investor {
  id: string;
  name: string;
  email: string;
  wallet: string;
  contribution: string;
  tokens: string;
  status: "approved" | "pending" | "rejected";
  date: string;
  kyc: boolean;
}

const investorData: Investor[] = [
  {
    id: "INV001",
    name: "John Doe",
    email: "john@example.com",
    wallet: "0x1a2b3c4d5e6f7g8h9i0j",
    contribution: "$25,000",
    tokens: "29,412 BLAST",
    status: "approved",
    date: "2025-04-29",
    kyc: true,
  },
  {
    id: "INV002",
    name: "Jane Smith",
    email: "jane@example.com",
    wallet: "0x2b3c4d5e6f7g8h9i0j1k",
    contribution: "$10,000",
    tokens: "11,765 BLAST",
    status: "approved",
    date: "2025-04-28",
    kyc: true,
  },
  {
    id: "INV003",
    name: "Robert Johnson",
    email: "robert@example.com",
    wallet: "0x3c4d5e6f7g8h9i0j1k2l",
    contribution: "$5,000",
    tokens: "5,882 BLAST",
    status: "pending",
    date: "2025-04-30",
    kyc: false,
  },
  {
    id: "INV004",
    name: "Emily Davis",
    email: "emily@example.com",
    wallet: "0x4d5e6f7g8h9i0j1k2l3m",
    contribution: "$15,000",
    tokens: "17,647 BLAST",
    status: "rejected",
    date: "2025-04-27",
    kyc: true,
  },
  {
    id: "INV005",
    name: "Michael Brown",
    email: "michael@example.com",
    wallet: "0x5e6f7g8h9i0j1k2l3m4n",
    contribution: "$30,000",
    tokens: "35,294 BLAST",
    status: "approved",
    date: "2025-04-26",
    kyc: true,
  },
  {
    id: "INV006",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    wallet: "0x6f7g8h9i0j1k2l3m4n5o",
    contribution: "$7,500",
    tokens: "8,824 BLAST",
    status: "pending",
    date: "2025-04-30",
    kyc: false,
  },
];

const InvestorManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Investor Management</h1>
          <p className="text-muted-foreground">View and manage investors in the BLAST ICO</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export CSV</Button>
          <Button>Add Investor</Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Input 
            placeholder="Search investors..." 
            className="w-[300px]" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="secondary">Search</Button>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              {investorData.filter(investor => investor.status === "approved").length} Approved
            </Badge>
          </div>
          <div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {investorData.filter(investor => investor.status === "pending").length} Pending
            </Badge>
          </div>
          <div>
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
              {investorData.filter(investor => investor.status === "rejected").length} Rejected
            </Badge>
          </div>
        </div>
      </div>
      
      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contribution</TableHead>
                <TableHead>Tokens</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>KYC</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {investorData.map((investor) => (
                <TableRow key={investor.id}>
                  <TableCell className="font-medium">{investor.id}</TableCell>
                  <TableCell>{investor.name}</TableCell>
                  <TableCell>{investor.email}</TableCell>
                  <TableCell>{investor.contribution}</TableCell>
                  <TableCell>{investor.tokens}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        investor.status === "approved" && "bg-success/10 text-success border-success/20",
                        investor.status === "pending" && "bg-primary/10 text-primary border-primary/20",
                        investor.status === "rejected" && "bg-destructive/10 text-destructive border-destructive/20"
                      )}
                    >
                      {investor.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {investor.kyc ? (
                      <Check className="h-5 w-5 text-success" />
                    ) : (
                      <X className="h-5 w-5 text-destructive" />
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default InvestorManagement;
