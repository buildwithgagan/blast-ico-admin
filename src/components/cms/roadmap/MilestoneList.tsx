
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RoadmapItem } from "@/types/cmc";
import { Plus } from "lucide-react";
import { MilestoneItem } from "./MilestoneItem";

interface MilestoneListProps {
  items: RoadmapItem[];
  handleMilestoneChange: (index: number, field: keyof RoadmapItem, value: string | number | boolean) => void;
  moveMilestone: (fromIndex: number, direction: 'up' | 'down') => void;
  removeMilestone: (index: number) => void;
  addMilestone: () => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const MilestoneList = ({
  items,
  handleMilestoneChange,
  moveMilestone,
  removeMilestone,
  addMilestone,
  handleSubmit,
}: MilestoneListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Milestones</CardTitle>
        <CardDescription className="flex justify-between items-center">
          <span>Define the key milestones for your project</span>
          <Button type="button" size="sm" onClick={addMilestone}>
            <Plus className="h-4 w-4 mr-2" />
            Add Milestone
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 ? (
          <div className="text-center p-6 border border-dashed rounded-lg">
            <p className="text-muted-foreground">No milestones yet. Add your first milestone to get started.</p>
          </div>
        ) : (
          items.map((milestone, index) => (
            <MilestoneItem
              key={milestone.id}
              milestone={milestone}
              index={index}
              handleMilestoneChange={handleMilestoneChange}
              moveMilestone={moveMilestone}
              removeMilestone={removeMilestone}
              isFirst={index === 0}
              isLast={index === items.length - 1}
            />
          ))
        )}
      </CardContent>
      <CardFooter>
        <Button type="submit" className="ml-auto" onClick={handleSubmit}>
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
};
