
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SecuritySettings = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Security Settings</h1>
          <p className="text-muted-foreground">Configure security options for the BLAST ICO platform</p>
        </div>
        <div>
          <Button>Save Settings</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Two-Factor Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable 2FA for Login</p>
                  <p className="text-sm text-muted-foreground">Require 2FA for all admin users</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable 2FA for Critical Actions</p>
                  <p className="text-sm text-muted-foreground">Transactions over $10,000 require 2FA</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Authentication</p>
                  <p className="text-sm text-muted-foreground">Send email verification for sign-ins</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Access Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Session Timeout</label>
                <Select defaultValue="30">
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">IP Restriction</p>
                  <p className="text-sm text-muted-foreground">Limit access to specific IPs</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Audit Logging</p>
                  <p className="text-sm text-muted-foreground">Log all administrative actions</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Role-Based Access Control</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Configure access levels for different admin roles</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="font-medium">Super Admin</p>
              <p className="text-sm text-muted-foreground">Full access to all features</p>
              <Button variant="outline" size="sm">Configure Permissions</Button>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Finance Admin</p>
              <p className="text-sm text-muted-foreground">Access to financial data and transactions</p>
              <Button variant="outline" size="sm">Configure Permissions</Button>
            </div>
            <div className="space-y-2">
              <p className="font-medium">KYC Verifier</p>
              <p className="text-sm text-muted-foreground">Limited access for KYC verification</p>
              <Button variant="outline" size="sm">Configure Permissions</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;
