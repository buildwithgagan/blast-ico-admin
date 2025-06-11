import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Calendar, FileText, Search } from "lucide-react";

// Define transaction types
type TransactionStatus = "completed" | "pending" | "failed";
type TransactionType = "purchase" | "refund" | "distribution";
type CurrencyType = "ETH" | "BTC" | "USDT" | "USDC";

// Transaction data interface
interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  status: TransactionStatus;
  investor: string;
  amount: string;
  currency: CurrencyType;
  tokenAmount: string;
  txHash: string;
}

// Dummy transaction data
const transactionData: Transaction[] = [
  {
    id: "TX-78901",
    date: "2025-04-28T14:23:02",
    type: "purchase",
    status: "completed",
    investor: "0x1a2b...3c4d",
    amount: "12.5",
    currency: "ETH",
    tokenAmount: "125,000",
    txHash: "0x5e6f...7g8h"
  },
  {
    id: "TX-78902",
    date: "2025-04-27T09:45:12",
    type: "purchase",
    status: "completed",
    investor: "investor@example.com",
    amount: "50,000",
    currency: "USDT",
    tokenAmount: "100,000",
    txHash: "0x9a0b...1c2d"
  },
  {
    id: "TX-78903",
    date: "2025-04-26T18:12:45",
    type: "distribution",
    status: "pending",
    investor: "0x3e4f...5g6h",
    amount: "1.2",
    currency: "BTC",
    tokenAmount: "96,000",
    txHash: "0x3d4e...5f6g"
  },
  {
    id: "TX-78904",
    date: "2025-04-25T11:05:22",
    type: "refund",
    status: "completed",
    investor: "enterprise@corp.com",
    amount: "25,000",
    currency: "USDC",
    tokenAmount: "50,000",
    txHash: "0x7h8i...9j0k"
  },
  {
    id: "TX-78905",
    date: "2025-04-24T16:37:08",
    type: "purchase",
    status: "failed",
    investor: "0x7i8j...9k0l",
    amount: "7.8",
    currency: "ETH",
    tokenAmount: "78,000",
    txHash: "0x1m2n...3o4p"
  },
  {
    id: "TX-78906",
    date: "2025-04-23T08:19:54",
    type: "purchase",
    status: "completed",
    investor: "whale@crypto.io",
    amount: "4.5",
    currency: "BTC",
    tokenAmount: "360,000",
    txHash: "0x5q6r...7s8t"
  },
  {
    id: "TX-78907",
    date: "2025-04-22T22:41:31",
    type: "distribution",
    status: "completed",
    investor: "0x9m0n...1o2p",
    amount: "18.2",
    currency: "ETH",
    tokenAmount: "182,000",
    txHash: "0x9u0v...1w2x"
  }
];

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric', 
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Get status badge variant
const getStatusBadge = (status: TransactionStatus) => {
  switch(status) {
    case "completed":
      return "bg-success/10 text-success border-success/20";
    case "pending":
      return "bg-warning/10 text-warning border-warning/20";
    case "failed":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "";
  }
};

// Get transaction type badge variant
const getTypeBadge = (type: TransactionType) => {
  switch(type) {
    case "purchase":
      return "bg-primary/10 text-primary border-primary/20";
    case "refund":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "distribution":
      return "bg-accent/10 text-accent border-accent/20";
    default:
      return "";
  }
};

const TransactionHistory = () => {
  const [dateRange, setDateRange] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  
  const totalInvestment = {
    eth: transactionData.filter(t => t.currency === "ETH" && t.status === "completed")
      .reduce((sum, t) => sum + parseFloat(t.amount.replace(/,/g, '')), 0),
    btc: transactionData.filter(t => t.currency === "BTC" && t.status === "completed")
      .reduce((sum, t) => sum + parseFloat(t.amount.replace(/,/g, '')), 0),
    usdt: transactionData.filter(t => t.currency === "USDT" && t.status === "completed")
      .reduce((sum, t) => sum + parseFloat(t.amount.replace(/,/g, '')), 0),
    totalTokens: transactionData.filter(t => t.status === "completed")
      .reduce((sum, t) => sum + parseInt(t.tokenAmount.replace(/,/g, '')), 0),
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Transaction History</h1>
          <p className="text-muted-foreground">View all transactions in the BLAST ICO</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Export CSV
          </Button>
          <Button className="gap-2">
            <Calendar className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>
      </div>
      
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium">Transaction Type</label>
            <Select value={transactionType} onValueChange={setTransactionType}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="purchase">Purchase</SelectItem>
                <SelectItem value="refund">Refund</SelectItem>
                <SelectItem value="distribution">Distribution</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium">Date Range</label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="All Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium">Investor</label>
            <div className="mt-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by wallet or email" 
                className="pl-9" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-end">
            <Button className="w-full">Apply Filters</Button>
          </div>
        </div>
      </Card>
      
      <Card className="bg-card">
        <div className="p-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Investor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Tokens</TableHead>
                  <TableHead>TX Hash</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionData.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn(getTypeBadge(transaction.type))}>
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn(getStatusBadge(transaction.status))}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.investor}</TableCell>
                    <TableCell>{transaction.amount} {transaction.currency}</TableCell>
                    <TableCell>{transaction.tokenAmount} BLAST</TableCell>
                    <TableCell className="font-mono text-xs">{transaction.txHash}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {totalInvestment.eth.toFixed(2)} ETH Received
              </Badge>
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                {totalInvestment.btc.toFixed(1)} BTC Received
              </Badge>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                {totalInvestment.usdt.toLocaleString()} USDT Received
              </Badge>
              <Badge variant="outline">
                {totalInvestment.totalTokens.toLocaleString()} BLAST Tokens Distributed
              </Badge>
            </div>
          </div>
          
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TransactionHistory;
