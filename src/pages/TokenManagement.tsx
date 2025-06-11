
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const TokenManagement = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Token Management</h1>
          <p className="text-muted-foreground">Manage your BLAST token details and distribution</p>
        </div>
        <div>
          <Button>Update Token Settings</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Token Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">Blockchain Asset Service Token</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Symbol</p>
                  <p className="font-medium">BLAST</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Decimals</p>
                  <p className="font-medium">18</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Supply</p>
                  <p className="font-medium">10,000,000 BLAST</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contract Address</p>
                  <p className="font-medium truncate">0x1a2b3c4d5e6f7g8h9i0j...</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Price</p>
                  <p className="font-medium">$0.85</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Price Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Token Price (USD)</label>
                <Input type="number" defaultValue="0.85" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Min Purchase</label>
                  <Input type="number" defaultValue="100" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Purchase</label>
                  <Input type="number" defaultValue="100000" />
                </div>
              </div>
              <Button className="w-full">Update Price</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Distribution Control</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Use this panel to distribute tokens to investors after the ICO ends</p>
          <Button disabled>Start Distribution</Button>
          <p className="mt-2 text-sm text-muted-foreground">Distribution will be available after ICO ends on May 14, 2025</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TokenManagement;
