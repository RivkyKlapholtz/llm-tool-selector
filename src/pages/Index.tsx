import { useState, useEffect } from "react";
import { ToolSelector } from "@/components/ToolSelector";
import { PromptArea } from "@/components/PromptArea";
import { ResultView } from "@/components/ResultView";
import { ReasoningDisplay } from "@/components/ReasoningDisplay";
import { toast } from "sonner";

interface Tool {
  id: string;
  name: string;
}

const Index = () => {
  const [selectedTools, setSelectedTools] = useState<Tool[]>([]);
  const [prompt, setPrompt] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reasoning, setReasoning] = useState<any>(null);

  useEffect(() => {
    const fetchReasoning = async () => {
      try {
        const response = await fetch('/getReasoning');
        if (response.ok) {
          const data = await response.json();
          setReasoning(data);
        }
      } catch (error) {
        console.log('No reasoning available');
      }
    };

    fetchReasoning();
  }, []);

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast.error("אנא הכנס שאלה");
      return;
    }

    if (selectedTools.length === 0) {
      toast.error("אנא בחר לפחות כלי אחד");
      return;
    }

    // Here you would send data to backend
    const data = {
      tools: selectedTools.map((t) => t.id),
      prompt: prompt,
    };

    console.log("Sending to backend:", data);
    toast.success("השאלה נשלחה בהצלחה!");
    
    // Show result view
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <ResultView />;
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Right Side - Tool Selection */}
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <ToolSelector 
              selectedTools={selectedTools} 
              onToolsChange={setSelectedTools}
            />
          </div>

          {/* Left Side - Prompt Area */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
              <PromptArea
                prompt={prompt}
                onPromptChange={setPrompt}
                onSubmit={handleSubmit}
              />
            </div>
            
            {reasoning && <ReasoningDisplay reasoning={reasoning} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
