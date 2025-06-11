
import React, { useState } from "react";
import { TeamMember, TeamsData } from "@/types/teams";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SortableTeamMemberItem } from "@/components/cms/SortableTeamMemberItem";
import { TeamMemberForm } from "@/components/cms/TeamMemberForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

// Mock data for demonstration - properly typed
const mockTeamData: TeamsData = {
  title: "Our Team",
  description: "Meet the passionate individuals behind our project",
  members: [
    {
      id: "1",
      name: "John Doe",
      position: "CEO & Founder",
      bio: "Experienced entrepreneur with 10+ years in blockchain technology.",
      image: "/placeholder.svg",
      linkedin: "https://linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe",
      email: "john@example.com",
      order: 1,
    },
    {
      id: "2",
      name: "Jane Smith",
      position: "CTO",
      bio: "Leading blockchain developer with expertise in smart contracts.",
      image: "/placeholder.svg",
      linkedin: "https://linkedin.com/in/janesmith",
      order: 2,
    },
  ],
};

const TeamsAdmin = () => {
  const [teamData, setTeamData] = useState<TeamsData>(mockTeamData);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = teamData.members.findIndex(member => member.id === active.id);
      const newIndex = teamData.members.findIndex(member => member.id === over.id);
      
      const newMembers = arrayMove(teamData.members, oldIndex, newIndex);
      
      // Update order property for each member
      const reorderedMembers = newMembers.map((member, index) => ({
        ...member,
        order: index + 1,
      }));
      
      setTeamData(prev => ({
        ...prev,
        members: reorderedMembers,
      }));
      
      toast.success("Team order updated");
    }
  };

  const handleOpenCreateDialog = () => {
    setIsCreating(true);
    setSelectedMember(null);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (member: TeamMember) => {
    setIsCreating(false);
    setSelectedMember(member);
    setIsDialogOpen(true);
  };

  const handleDeleteMember = (id: string) => {
    setTeamData(prev => ({
      ...prev,
      members: prev.members.filter(member => member.id !== id),
    }));
    toast.success("Team member deleted");
  };

  const handleSubmitMember = (data: TeamMember) => {
    if (isCreating) {
      const newMember: TeamMember = {
        ...data,
        id: Date.now().toString(),
        order: teamData.members.length + 1,
      };
      setTeamData(prev => ({
        ...prev,
        members: [...prev.members, newMember],
      }));
      toast.success("Team member added");
    } else {
      setTeamData(prev => ({
        ...prev,
        members: prev.members.map(member =>
          member.id === data.id ? data : member
        ),
      }));
      toast.success("Team member updated");
    }
    
    setIsDialogOpen(false);
  };

  const handleCancelEdit = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Teams Management</h1>
        <Button onClick={handleOpenCreateDialog}>
          <Plus className="mr-2 h-4 w-4" /> Add Team Member
        </Button>
      </div>

      <Tabs defaultValue="list">
        <TabsList className="mb-4">
          <TabsTrigger value="list">Team Members</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manage Team Members</CardTitle>
              <CardDescription>
                Drag and drop to reorder team members. Click the edit or delete buttons to modify entries.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={teamData.members.map(member => member.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {teamData.members.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No team members yet. Click "Add Team Member" to create your first entry.
                    </div>
                  ) : (
                    teamData.members.map((member) => (
                      <SortableTeamMemberItem
                        key={member.id}
                        member={member}
                        onEdit={handleOpenEditDialog}
                        onDelete={handleDeleteMember}
                      />
                    ))
                  )}
                </SortableContext>
              </DndContext>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Team Preview</CardTitle>
              <CardDescription>
                This is how your team section will appear on the landing page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {teamData.members.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No team members to preview. Add some team members first.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teamData.members.map((member) => (
                    <div key={member.id} className="text-center">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <p className="text-primary font-medium mb-2">{member.position}</p>
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isCreating ? "Add" : "Edit"} Team Member</DialogTitle>
            <DialogDescription>
              {isCreating
                ? "Add a new team member to your landing page."
                : "Make changes to the existing team member."}
            </DialogDescription>
          </DialogHeader>
          <TeamMemberForm
            initialData={selectedMember || undefined}
            onSubmit={handleSubmitMember}
            onCancel={handleCancelEdit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamsAdmin;
