import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface PromptAreaProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export const PromptArea = ({ prompt, onPromptChange, onSubmit, onClose }: PromptAreaProps) => {
  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Prompt</h2>
        <p className="text-muted-foreground">הכנס כאן את השאלה שלך</p>
      </div>

      <Textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="כתוב את השאלה שלך כאן..."
        className="flex-1 min-h-[300px] resize-none text-base"
        dir="rtl"
      />

      <div className="flex justify-start gap-3">
        <Button
          onClick={onSubmit}
          size="lg"
          className="px-8 py-6 text-base font-medium"
          disabled={!prompt.trim()}
        >
          יאללה, בוא נראה במה AI יותר טוב ממני....
        </Button>
        <Button
          onClick={onClose}
          size="lg"
          variant="secondary"
          className="px-8 py-6 text-base font-medium"
        >
          סגור
        </Button>
      </div>
    </div>
  );
};
