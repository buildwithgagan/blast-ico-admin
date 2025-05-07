
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { RoadmapItem } from "@/types/cmc";
import { GripVertical, Trash2 } from "lucide-react";

interface MilestoneItemProps {
  milestone: RoadmapItem;
  index: number;
  handleMilestoneChange: (index: number, field: keyof RoadmapItem, value: string | number | boolean) => void;
  moveMilestone: (index: number, direction: 'up' | 'down') => void;
  removeMilestone: (index: number) => void;
  isFirst: boolean;
  isLast: boolean;
}

export const MilestoneItem = ({
  milestone,
  index,
  handleMilestoneChange,
  moveMilestone,
  removeMilestone,
  isFirst,
  isLast,
}: MilestoneItemProps) => {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
          <h3 className="font-medium">Milestone {index + 1}</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            onClick={() => moveMilestone(index, 'up')} 
            disabled={isFirst}
            className="h-8 w-8"
          >
            ↑
            <span className="sr-only">Move Up</span>
          </Button>
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            onClick={() => moveMilestone(index, 'down')} 
            disabled={isLast}
            className="h-8 w-8"
          >
            ↓
            <span className="sr-only">Move Down</span>
          </Button>
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            onClick={() => removeMilestone(index)} 
            className="h-8 w-8 text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`title-${index}`}>Title</Label>
          <Input 
            id={`title-${index}`} 
            value={milestone.title} 
            onChange={(e) => handleMilestoneChange(index, 'title', e.target.value)}
            placeholder="e.g., Launch Beta Version"
          />
        </div>
        <div className="flex gap-4 items-center">
          <div className="w-1/3 space-y-2">
            <Label htmlFor={`quarter-${index}`}>Quarter</Label>
            <select 
              id={`quarter-${index}`}
              value={milestone.quarter}
              onChange={(e) => handleMilestoneChange(index, 'quarter', e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="Q1">Q1</option>
              <option value="Q2">Q2</option>
              <option value="Q3">Q3</option>
              <option value="Q4">Q4</option>
            </select>
          </div>
          <div className="w-1/3 space-y-2">
            <Label htmlFor={`year-${index}`}>Year</Label>
            <Input 
              id={`year-${index}`} 
              value={milestone.year} 
              onChange={(e) => {
                const value = parseInt(e.target.value) || milestone.year;
                handleMilestoneChange(index, 'year', value);
              }}
              placeholder="2024"
            />
          </div>
          <div className="w-1/3 space-y-2">
            <Label htmlFor={`completed-${index}`} className="block mb-1">Completed</Label>
            <div className="flex items-center space-x-2">
              <Switch 
                id={`completed-${index}`} 
                checked={milestone.status === "completed"}
                onCheckedChange={(checked) => {
                  const status = checked ? "completed" : "upcoming";
                  handleMilestoneChange(index, 'status', status);
                }}
              />
              <span className="text-sm text-muted-foreground">
                {milestone.status === "completed" ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor={`description-${index}`}>Description</Label>
        <Textarea 
          id={`description-${index}`} 
          value={milestone.description} 
          onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)}
          placeholder="Describe what this milestone involves"
          rows={2}
        />
      </div>
    </div>
  );
};
