
import React from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { FaqItem } from "@/types/cmc";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import { toast } from "sonner";

interface FaqFormProps {
  initialData?: FaqItem;
  onSubmit: (data: FaqItem) => void;
  onCancel: () => void;
}

export function FaqForm({ initialData, onSubmit, onCancel }: FaqFormProps) {
  const form = useForm<FaqItem>({
    defaultValues: initialData || {
      id: uuidv4(),
      question: "",
      answer: "",
      order: 999, // Will be updated when added to the list
    },
  });

  const handleSubmit = (data: FaqItem) => {
    onSubmit(data);
    toast.success(initialData ? "FAQ updated successfully" : "FAQ created successfully");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the question..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter the answer..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? "Update" : "Create"} FAQ
          </Button>
        </div>
      </form>
    </Form>
  );
}
