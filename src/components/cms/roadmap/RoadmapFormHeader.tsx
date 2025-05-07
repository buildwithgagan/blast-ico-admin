
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface RoadmapFormHeaderProps {
  title: string;
  description: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const RoadmapFormHeader = ({
  title,
  description,
  handleInputChange,
}: RoadmapFormHeaderProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Roadmap Information</CardTitle>
        <CardDescription>
          Basic information about your project roadmap
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Roadmap Title</Label>
            <Input 
              id="title" 
              name="title"
              value={title} 
              onChange={handleInputChange}
              placeholder="e.g., MAST Project Roadmap"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description" 
              name="description"
              value={description} 
              onChange={handleInputChange}
              placeholder="Provide a brief overview of your roadmap"
              rows={3}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
