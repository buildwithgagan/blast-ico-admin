
import { useCmc } from "@/contexts/CmcContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, Circle } from "lucide-react";

const RoadmapDisplay = () => {
  const { roadmap, loading } = useCmc();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
        </CardHeader>
        <CardContent className="space-y-8">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  // Group milestones by year
  const milestonesByYear = roadmap.items.reduce((acc, milestone) => {
    if (!acc[milestone.year]) {
      acc[milestone.year] = [];
    }
    acc[milestone.year].push(milestone);
    return acc;
  }, {} as Record<string, typeof roadmap.items>);

  // Sort years
  const sortedYears = Object.keys(milestonesByYear).sort();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">{roadmap.title || "Project Roadmap"}</CardTitle>
        <CardDescription>{roadmap.description || "Our project development timeline"}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {sortedYears.map((year) => (
            <div key={year} className="space-y-4">
              <h3 className="text-lg font-bold">{year}</h3>
              <div className="relative border-l-2 border-border pl-6 ml-2 space-y-6">
                {milestonesByYear[year].map((milestone) => (
                  <div key={milestone.id} className="relative">
                    <div 
                      className="absolute -left-8 p-1 bg-background"
                    >
                      {milestone.status === "completed" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{milestone.title}</h4>
                        <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">
                          {milestone.quarter} {milestone.year}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoadmapDisplay;
