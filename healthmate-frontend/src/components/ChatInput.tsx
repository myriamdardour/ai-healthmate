import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    onSubmit(input.trim());
    setInput("");
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
  };

  return (
    <div className="sticky bottom-0 bg-background border-t px-4 py-4">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Describe your symptoms..."
              className="min-h-[52px] max-h-[200px] resize-none rounded-xl 
                border-input bg-background px-4 py-3 pr-12
                focus:ring-2 focus:ring-ring focus:border-transparent
                placeholder:text-muted-foreground"
              style={{ height: 'auto' }}
            />
            <div className="absolute bottom-3 right-3">
              <Button 
                type="submit" 
                size="sm"
                disabled={!input.trim() || isLoading}
                className="h-8 w-8 p-0 rounded-lg"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
        
        <p className="text-xs text-muted-foreground text-center mt-3">
          ⚠️ This is AI-generated information and not medical advice. Always consult healthcare professionals.
        </p>
      </div>
    </div>
  );
}