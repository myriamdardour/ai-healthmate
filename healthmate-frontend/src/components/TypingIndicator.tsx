import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="bg-chat-surface">
      <div className="max-w-3xl mx-auto px-4 py-6 flex gap-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-assistant-message text-assistant-message-foreground border">
          <Bot className="w-4 h-4" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
              <div 
                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" 
                style={{ animationDelay: '0.1s' }}
              />
              <div 
                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" 
                style={{ animationDelay: '0.2s' }}
              />
            </div>
            <span className="text-sm text-muted-foreground ml-2">
              Analyzing symptoms...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}