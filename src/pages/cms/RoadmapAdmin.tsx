
import { RoadmapFormHeader } from "@/components/cms/roadmap/RoadmapFormHeader";
import { MilestoneList } from "@/components/cms/roadmap/MilestoneList";
import { useRoadmap } from "@/hooks/useRoadmap";

const RoadmapAdmin = () => {
  const {
    formData,
    handleInputChange,
    handleMilestoneChange,
    addMilestone,
    removeMilestone,
    moveMilestone,
    handleSubmit
  } = useRoadmap();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Roadmap</h2>
          <p className="text-muted-foreground">
            Define the timeline and milestones for your project
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <RoadmapFormHeader
          title={formData.title}
          description={formData.description}
          handleInputChange={handleInputChange}
        />
        
        <MilestoneList 
          items={formData.items}
          handleMilestoneChange={handleMilestoneChange}
          moveMilestone={moveMilestone}
          removeMilestone={removeMilestone}
          addMilestone={addMilestone}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default RoadmapAdmin;
