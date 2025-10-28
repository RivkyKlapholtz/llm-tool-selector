import { ScrollArea } from "@/components/ui/scroll-area";

interface ReasoningDisplayProps {
  reasoning: any;
}

export const ReasoningDisplay = ({ reasoning }: ReasoningDisplayProps) => {
  return (
    <div className="mt-6 bg-card rounded-2xl p-6 shadow-sm border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-right">
        צעדים מאחורי הקלעים
      </h3>
      <ScrollArea className="h-[400px] w-full rounded-md border border-border p-4">
        <pre className="text-sm text-foreground whitespace-pre-wrap text-right" dir="rtl">
          {JSON.stringify(reasoning, null, 2)}
        </pre>
      </ScrollArea>
    </div>
  );
};
