
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const InstantAirdrop = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!walletAddress || !tokenAmount) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (parseFloat(tokenAmount) <= 0) {
      toast({
        title: "Error",
        description: "Token amount must be greater than 0.",
        variant: "destructive",
      });
      return;
    }

    // Basic wallet address validation (Ethereum format)
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      toast({
        title: "Error",
        description: "Please enter a valid Ethereum wallet address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Instant Airdrop Sent",
        description: `${tokenAmount} BLAST tokens have been successfully sent to ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}.`,
      });
      
      // Reset form
      setWalletAddress("");
      setTokenAmount("");
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Instant Airdrop</h1>
          <p className="text-muted-foreground">
            Send BLAST tokens instantly to a specific wallet address
          </p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Send Instant Airdrop</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="walletAddress">Wallet Address</Label>
              <Input
                id="walletAddress"
                type="text"
                placeholder="0x1234567890abcdef1234567890abcdef12345678"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">
                Enter the Ethereum wallet address to receive the airdrop
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tokenAmount">Number of BLAST Tokens</Label>
              <Input
                id="tokenAmount"
                type="number"
                step="0.01"
                min="0"
                placeholder="e.g., 1000"
                value={tokenAmount}
                onChange={(e) => setTokenAmount(e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">
                Enter the number of BLAST tokens to send
              </p>
            </div>

            <div className="pt-4 border-t">
              <div className="bg-muted p-4 rounded-lg mb-4">
                <h3 className="font-medium mb-2">Transaction Summary:</h3>
                {walletAddress && tokenAmount && (
                  <div className="text-sm space-y-1">
                    <p><strong>Recipient:</strong> {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
                    <p><strong>Amount:</strong> {tokenAmount} BLAST</p>
                  </div>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                    Sending Airdrop...
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

export default InstantAirdrop;
