import { useState } from "react";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Tool {
  id: string;
  name: string;
}

interface ToolSelectorProps {
  selectedTools: Tool[];
  onToolsChange: (tools: Tool[]) => void;
}

export const ToolSelector = ({ selectedTools, onToolsChange }: ToolSelectorProps) => {
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
      onToolsChange([...selectedTools, tool]);
    }
  };

  const handleRemoveTool = (toolId: string) => {
    onToolsChange(selectedTools.filter((t) => t.id !== toolId));
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
          <SelectValue placeholder="בחר כלי..." />
        </SelectTrigger>
        <SelectContent className="bg-popover z-50">
          {unselectedTools.map((tool) => (
            <SelectItem key={tool.id} value={tool.id}>
              {tool.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex flex-wrap gap-2 min-h-[40px]">
        {selectedTools.map((tool) => (
          <div
            key={tool.id}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-tag text-tag-foreground hover:bg-tag-hover transition-colors"
          >
            <span className="text-sm font-medium">{tool.name}</span>
            <button
              onClick={() => handleRemoveTool(tool.id)}
              className="hover:opacity-70 transition-opacity"
              aria-label={`הסר ${tool.name}`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
