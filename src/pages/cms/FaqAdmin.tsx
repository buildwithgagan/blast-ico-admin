
import React, { useState } from "react";
import { useCmc } from "@/contexts/CmcContext";
import { FaqItem } from "@/types/cmc";
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
import { SortableFaqItem } from "@/components/cms/SortableFaqItem";
import { FaqForm } from "@/components/cms/FaqForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

const FaqAdmin = () => {
  const { faq, updateFaqItems, addFaqItem, deleteFaqItem, updateFaqItem } = useCmc();
  const [selectedFaq, setSelectedFaq] = useState<FaqItem | null>(null);
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
      const oldIndex = faq.items.findIndex(item => item.id === active.id);
      const newIndex = faq.items.findIndex(item => item.id === over.id);
      
      const newItems = arrayMove(faq.items, oldIndex, newIndex);
      
      // Update order property for each item
      const reorderedItems = newItems.map((item, index) => ({
        ...item,
        order: index + 1,
      }));
      
      updateFaqItems(reorderedItems);
      toast.success("FAQ order updated");
    }
  };

  const handleOpenCreateDialog = () => {
    setIsCreating(true);
    setSelectedFaq(null);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (faq: FaqItem) => {
    setIsCreating(false);
    setSelectedFaq(faq);
    setIsDialogOpen(true);
  };

  const handleDeleteFaq = (id: string) => {
    deleteFaqItem(id);
    toast.success("FAQ deleted");
  };

  const handleSubmitFaq = (data: FaqItem) => {
    if (isCreating) {
      addFaqItem({
        ...data,
        order: faq.items.length + 1,
      });
    } else {
      updateFaqItem(data.id, data);
    }
    
    setIsDialogOpen(false);
  };

  const handleCancelEdit = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">FAQ Management</h1>
        <Button onClick={handleOpenCreateDialog}>
          <Plus className="mr-2 h-4 w-4" /> Add FAQ
        </Button>
      </div>

      <Tabs defaultValue="list">
        <TabsList className="mb-4">
          <TabsTrigger value="list">FAQ List</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manage FAQs</CardTitle>
              <CardDescription>
                Drag and drop to reorder FAQs. Click the edit or delete buttons to modify entries.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={faq.items.map(item => item.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {faq.items.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No FAQs yet. Click "Add FAQ" to create your first entry.
                    </div>
                  ) : (
                    faq.items.map((faqItem) => (
                      <SortableFaqItem
                        key={faqItem.id}
                        faq={faqItem}
                        onEdit={handleOpenEditDialog}
                        onDelete={handleDeleteFaq}
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
              <CardTitle>FAQ Preview</CardTitle>
              <CardDescription>
                This is how your FAQ section will appear on the landing page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {faq.items.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No FAQs to preview. Add some FAQs first.
                </div>
              ) : (
                <div className="space-y-4">
                  {faq.items.map((faqItem) => (
                    <div key={faqItem.id} className="border rounded-lg p-4">
                      <h3 className="font-medium text-lg mb-2">{faqItem.question}</h3>
                      <p className="text-muted-foreground">{faqItem.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isCreating ? "Create" : "Edit"} FAQ</DialogTitle>
            <DialogDescription>
              {isCreating
                ? "Add a new FAQ to your landing page."
                : "Make changes to the existing FAQ."}
            </DialogDescription>
          </DialogHeader>
          <FaqForm
            initialData={selectedFaq || undefined}
            onSubmit={handleSubmitFaq}
            onCancel={handleCancelEdit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FaqAdmin;
