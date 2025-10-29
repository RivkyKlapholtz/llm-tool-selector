import { useState } from "react";
import { X, ChevronDown, Edit2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Tool {
  id: string;
  name: string;
  description?: string;
}

interface ToolSelectorProps {
  selectedTools: Tool[];
  onToolsChange: (tools: Tool[]) => void;
}

export const ToolSelector = ({ selectedTools, onToolsChange }: ToolSelectorProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedToolForDescription, setSelectedToolForDescription] = useState<Tool | null>(null);
  const [description, setDescription] = useState("");
  const [editingToolId, setEditingToolId] = useState<string | null>(null);
  const [openToolIds, setOpenToolIds] = useState<Set<string>>(new Set());

  // Mock data - in real app this comes from backend
  const availableTools: Tool[] = [
    { id: "1", name: "Web Search" },
    { id: "2", name: "Calculator" },
    { id: "3", name: "Weather API" },
    { id: "4", name: "Translation" },
    { id: "5", name: "Image Generator" },
  ];

  const handleSelectTool = (toolId: string) => {
    const tool = availableTools.find((t) => t.id === toolId);
    if (tool && !selectedTools.find((t) => t.id === tool.id)) {
      setSelectedToolForDescription(tool);
      setDescription("");
      setEditingToolId(null);
      setIsDialogOpen(true);
    }
  };

  const handleConfirmTool = () => {
    if (selectedToolForDescription) {
      if (editingToolId) {
        // Update existing tool
        onToolsChange(
          selectedTools.map((t) =>
            t.id === editingToolId
              ? { ...t, description }
              : t
          )
        );
      } else {
        // Add new tool
        onToolsChange([
          ...selectedTools,
          { ...selectedToolForDescription, description },
        ]);
      }
      setIsDialogOpen(false);
      setDescription("");
      setSelectedToolForDescription(null);
      setEditingToolId(null);
    }
  };

  const handleRemoveTool = (toolId: string) => {
    onToolsChange(selectedTools.filter((t) => t.id !== toolId));
    setOpenToolIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(toolId);
      return newSet;
    });
  };

  const handleEditTool = (tool: Tool) => {
    setSelectedToolForDescription(tool);
    setDescription(tool.description || "");
    setEditingToolId(tool.id);
    setIsDialogOpen(true);
  };

  const toggleToolOpen = (toolId: string) => {
    setOpenToolIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(toolId)) {
        newSet.delete(toolId);
      } else {
        newSet.add(toolId);
      }
      return newSet;
    });
  };

  const unselectedTools = availableTools.filter(
    (tool) => !selectedTools.find((t) => t.id === tool.id)
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground text-right">
        בחר את הtools שבהם הllm ישתמש לענות על השאלה שלך
      </h2>
      
      <Select onValueChange={handleSelectTool}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Tools" />
        </SelectTrigger>
        <SelectContent className="bg-popover z-50">
          {unselectedTools.map((tool) => (
            <SelectItem key={tool.id} value={tool.id}>
              {tool.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="space-y-2 min-h-[40px]">
        {selectedTools.map((tool) => (
          <Collapsible
            key={tool.id}
            open={openToolIds.has(tool.id)}
            onOpenChange={() => toggleToolOpen(tool.id)}
          >
            <div className="border border-border rounded-lg bg-card p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                  <CollapsibleTrigger asChild>
                    <button className="hover:opacity-70 transition-opacity">
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          openToolIds.has(tool.id) ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </CollapsibleTrigger>
                  <span className="text-sm font-medium text-foreground">
                    {tool.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditTool(tool)}
                    className="hover:opacity-70 transition-opacity"
                    aria-label={`ערוך ${tool.name}`}
                  >
                    <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => handleRemoveTool(tool.id)}
                    className="hover:opacity-70 transition-opacity"
                    aria-label={`הסר ${tool.name}`}
                  >
                    <X className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </div>
              </div>
              <CollapsibleContent className="mt-2">
                {tool.description && (
                  <p className="text-sm text-muted-foreground pr-6">
                    {tool.description}
                  </p>
                )}
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-right">
              {editingToolId ? "ערוך תיאור כלי" : "הוסף תיאור לכלי"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4" dir="rtl">
            <div className="space-y-2">
              <Label htmlFor="description" className="text-right block">
                תיאור
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="הסבר לLLM מה הכלי הזה עושה (הנח שכבר יש לו תיאור בסיסי), תן לו תיאור טוב, בסיסי שיאפשר לLLM לספק לך את התוצאה הכי טובה בשביל הuse case שלך"
                className="min-h-[120px] text-right"
                dir="rtl"
              />
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              ביטול
            </Button>
            <Button onClick={handleConfirmTool}>
              {editingToolId ? "עדכן" : "אישור"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
