import { ScrollArea } from "@/components/ui/scroll-area";

interface ReasoningDisplayProps {
  reasoning: any;
}

export const ReasoningDisplay = ({ reasoning }: ReasoningDisplayProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-right">
        צעדים מאחורי הקלעים
      </h3>
      <ScrollArea className="h-[400px] w-full rounded-md border border-border p-4">
        <div className="space-y-4 text-right" dir="rtl">
          {reasoning.steps?.map((step: any, index: number) => (
            <div key={index} className="border-b border-border pb-4 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-muted-foreground">{step.timestamp}</span>
                <h4 className="text-sm font-semibold text-foreground">
                  שלב {step.step}: {step.action}
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">{step.details}</p>
            </div>
          ))}
          {reasoning.finalAnswer && (
            <div className="mt-4 p-4 bg-secondary rounded-lg">
              <p className="text-sm font-medium text-foreground">{reasoning.finalAnswer}</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
