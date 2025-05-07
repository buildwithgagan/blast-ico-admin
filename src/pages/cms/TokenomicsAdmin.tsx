import { useState } from "react";
import { useCmc } from "@/contexts/CmcContext";
import { TokenAllocation } from "@/types/cmc";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const TokenomicsAdmin = () => {
  const { tokenomics, updateTokenomics } = useCmc();
  
  const [formData, setFormData] = useState({
    tokenSymbol: tokenomics.tokenSymbol,
    name: tokenomics.name,
    totalSupply: tokenomics.totalSupply,
    initialPrice: tokenomics.initialPrice,
    description: tokenomics.description,
    tokenAllocations: [...tokenomics.tokenAllocations]
  });

  // Handle text input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle allocation changes
  const handleAllocationChange = (index: number, field: keyof TokenAllocation, value: string | number) => {
    const updatedAllocations = [...formData.tokenAllocations];
    
    if (field === 'percentage') {
      // Ensure percentage is a valid number
      const numValue = parseInt(value as string);
      if (isNaN(numValue) || numValue < 0) return;
      updatedAllocations[index][field] = numValue;
    } else {
      updatedAllocations[index][field] = value as string;
    }
    
    setFormData({
      ...formData,
      tokenAllocations: updatedAllocations
    });
  };

  // Add new allocation
  const addAllocation = () => {
    if (formData.tokenAllocations.length >= 10) {
      toast.error("Maximum of 10 allocations allowed");
      return;
    }
    
    const newAllocation: TokenAllocation = {
      id: uuidv4(),
      category: "New Category",
      percentage: 0,
      color: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`
    };
    
    setFormData({
      ...formData,
      tokenAllocations: [...formData.tokenAllocations, newAllocation]
    });
  };

  // Remove allocation
  const removeAllocation = (index: number) => {
    if (formData.tokenAllocations.length <= 1) {
      toast.error("Cannot remove all allocations");
      return;
    }
    
    const updatedAllocations = formData.tokenAllocations.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      tokenAllocations: updatedAllocations
    });
  };

  // Save changes
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate total percentage is 100%
    const totalPercentage = formData.tokenAllocations.reduce((sum, item) => sum + item.percentage, 0);
    if (totalPercentage !== 100) {
      toast.error(`Total allocation percentage must be 100%. Currently: ${totalPercentage}%`);
      return;
    }
    
    updateTokenomics(formData);
    toast.success("Tokenomics updated successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Tokenomics</h2>
          <p className="text-muted-foreground">
            Manage token distribution information for your ICO
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Token Information</CardTitle>
            <CardDescription>
              Basic information about your token
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tokenSymbol">Token Symbol</Label>
                  <Input 
                    id="tokenSymbol" 
                    name="tokenSymbol"
                    value={formData.tokenSymbol} 
                    onChange={handleInputChange}
                    placeholder="e.g., BTC"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalSupply">Total Supply</Label>
                  <Input 
                    id="totalSupply" 
                    name="totalSupply"
                    value={formData.totalSupply} 
                    onChange={handleInputChange}
                    placeholder="e.g., 1,000,000"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="initialPrice">Initial Price</Label>
                <Input 
                  id="initialPrice" 
                  name="initialPrice"
                  value={formData.initialPrice} 
                  onChange={handleInputChange}
                  placeholder="e.g., $0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description" 
                  name="description"
                  value={formData.description} 
                  onChange={handleInputChange}
                  placeholder="Describe the utility and purpose of your token"
                  rows={4}
                />
              </div>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Token Allocation</CardTitle>
            <CardDescription>
              Define how your tokens will be distributed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.tokenAllocations.length > 0 && (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={formData.tokenAllocations}
                      dataKey="percentage"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {formData.tokenAllocations.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Distribution Categories</h3>
                <Button type="button" variant="outline" size="sm" onClick={addAllocation}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </div>
              
              <Separator />
              
              {formData.tokenAllocations.map((allocation, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-5">
                    <Input
                      value={allocation.category}
                      onChange={(e) => handleAllocationChange(index, 'category', e.target.value)}
                      placeholder="Category Name"
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      type="number"
                      value={allocation.percentage}
                      onChange={(e) => handleAllocationChange(index, 'percentage', e.target.value)}
                      placeholder="% Value"
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      type="color"
                      value={allocation.color}
                      onChange={(e) => handleAllocationChange(index, 'color', e.target.value)}
                      className="h-9 p-1"
                    />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeAllocation(index)} 
                      className="h-9 w-9 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="text-sm text-muted-foreground mt-2">
                Total: {formData.tokenAllocations.reduce((sum, item) => sum + item.percentage, 0)}% 
                (should equal 100%)
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="ml-auto" onClick={handleSubmit}>
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default TokenomicsAdmin;
