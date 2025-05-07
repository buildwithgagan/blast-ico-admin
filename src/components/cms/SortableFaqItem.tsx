
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { FaqItem } from "@/types/cmc";

interface SortableFaqItemProps {
  faq: FaqItem;
  onEdit: (faq: FaqItem) => void;
  onDelete: (id: string) => void;
}

export function SortableFaqItem({ faq, onEdit, onDelete }: SortableFaqItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: faq.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-3">
      <Card className="border">
        <CardContent className="p-4 flex items-center justify-between gap-2">
          <div
            className="cursor-grab p-2 hover:bg-muted rounded"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1 truncate px-2">
            <h3 className="font-medium text-sm truncate">{faq.question}</h3>
            <p className="text-xs text-muted-foreground truncate">
              {faq.answer.substring(0, 100)}
              {faq.answer.length > 100 ? "..." : ""}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(faq)}
              className="hover:bg-muted"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(faq.id)}
              className="hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
