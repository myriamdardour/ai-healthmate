import ReactMarkdown from 'react-markdown';
import { User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';

  return (
    <div className={cn(
      "group w-full",
      isUser ? "bg-background" : "bg-chat-surface"
    )}>
      <div className="max-w-3xl mx-auto px-4 py-6 flex gap-4">
        <div className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isUser 
            ? "bg-user-message text-user-message-foreground" 
            : "bg-assistant-message text-assistant-message-foreground border"
        )}>
          {isUser ? (
            <User className="w-4 h-4" />
          ) : (
            <Bot className="w-4 h-4" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className={cn(
            "text-sm leading-relaxed",
            isUser ? "text-foreground" : "text-foreground"
          )}>
            {isUser ? (
              <p className="whitespace-pre-wrap">{message.content}</p>
            ) : (
              <div className="prose prose-sm max-w-none dark:prose-invert
                prose-p:leading-relaxed prose-pre:p-0
                prose-headings:font-semibold prose-headings:text-foreground
                prose-strong:text-foreground prose-code:text-foreground
                prose-pre:bg-muted prose-pre:border">
                <ReactMarkdown>
                  {message.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
          
          <div className="text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
}