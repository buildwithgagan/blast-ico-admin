
import { useState } from "react";
import { RoadmapItem, Roadmap } from "@/types/cmc";
import { useCmc } from "@/contexts/CmcContext";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

export const useRoadmap = () => {
  const { roadmap, updateRoadmap } = useCmc();
  
  const [formData, setFormData] = useState<Roadmap>({
    title: roadmap.title || "Project Roadmap",
    description: roadmap.description || "Our development timeline and milestones",
    items: [...roadmap.items]
  });

  // Handle basic text input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle milestone changes
  const handleMilestoneChange = (index: number, field: keyof RoadmapItem, value: string | number | boolean) => {
    const updatedMilestones = [...formData.items];
    
    if (field === "status" && typeof value === "string") {
      updatedMilestones[index] = {
        ...updatedMilestones[index],
        status: value as "completed" | "in-progress" | "upcoming"
      };
    } else {
      updatedMilestones[index] = {
        ...updatedMilestones[index],
        [field]: value
      } as RoadmapItem;
    }
    
    setFormData({
      ...formData,
      items: updatedMilestones
    });
  };

  // Add new milestone
  const addMilestone = () => {
    if (formData.items.length >= 20) {
      toast.error("Maximum of 20 milestones allowed");
      return;
    }
    
    const newMilestone: RoadmapItem = {
      id: uuidv4(),
      title: "New Milestone",
      description: "Description for this milestone",
      quarter: "Q1",
      year: new Date().getFullYear(),
      status: "upcoming"
    };
    
    setFormData({
      ...formData,
      items: [...formData.items, newMilestone]
    });
  };

  // Remove milestone
  const removeMilestone = (index: number) => {
    const updatedMilestones = formData.items.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      items: updatedMilestones
    });
  };

  // Move milestone up or down
  const moveMilestone = (fromIndex: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && fromIndex === 0) || 
      (direction === 'down' && fromIndex === formData.items.length - 1)
    ) {
      return;
    }
    
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    const updatedMilestones = [...formData.items];
    const [movedItem] = updatedMilestones.splice(fromIndex, 1);
    updatedMilestones.splice(toIndex, 0, movedItem);
    
    setFormData({
      ...formData,
      items: updatedMilestones
    });
  };

  // Save changes
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate there's at least one milestone
    if (formData.items.length === 0) {
      toast.error("You need to add at least one milestone");
      return;
    }
    
    updateRoadmap(formData);
    toast.success("Roadmap updated successfully");
  };

  return {
    formData,
    handleInputChange,
    handleMilestoneChange,
    addMilestone,
    removeMilestone,
    moveMilestone,
    handleSubmit
  };
};
