
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const DividendAirdrop = () => {
  const [percentage, setPercentage] = useState("");
  const [currency, setCurrency] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!percentage || !currency) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (parseFloat(percentage) <= 0 || parseFloat(percentage) > 100) {
      toast({
        title: "Error",
        description: "Percentage must be between 0 and 100.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Dividend Airdrop Initiated",
        description: `${percentage}% dividend airdrop in ${currency} has been successfully initiated to all eligible holders.`,
      });
      
      // Reset form
      setPercentage("");
      setCurrency("");
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dividend Airdrop</h1>
          <p className="text-muted-foreground">
            Distribute airdrops to all BLAST token holders based on their holdings percentage
          </p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Configure Dividend Airdrop</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="percentage">Percentage (%) to Airdrop</Label>
              <Input
                id="percentage"
                type="number"
                step="0.1"
                min="0"
                max="100"
                placeholder="e.g., 2.5"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">
                Enter the percentage of token value to distribute as airdrop
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Select Currency</Label>
              <Select value={currency} onValueChange={setCurrency} required>
                <SelectTrigger>
                  <SelectValue placeholder="Choose currency for airdrop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="BLAST">BLAST</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                The currency in which the airdrop will be distributed
              </p>
            </div>

            <div className="pt-4 border-t">
              <div className="bg-muted p-4 rounded-lg mb-4">
                <h3 className="font-medium mb-2">Calculation Example:</h3>
                <p className="text-sm text-muted-foreground">
                  If you set 2.5% and select ETH: A user holding $100 worth of BLAST tokens will receive $2.5 worth of ETH.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                    Processing Airdrop...
                  </div>
                ) : (
                  "Submit Airdrop"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DividendAirdrop;
