import { useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { EmptyState } from "./EmptyState";
import { ScrollArea } from "@/components/ui/scroll-area";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface DiagnoseResponse {
  symptoms: string;
  ai_summary: string;
  disclaimer: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (content: string, sender: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSubmit = async (userMessage: string) => {
    addMessage(userMessage, 'user');
    setIsLoading(true);

    try {
      const response = await fetch(`${backendUrl}/diagnose`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data: DiagnoseResponse = await response.json();
      addMessage(data.ai_summary, 'assistant');
    } catch (error) {
      addMessage("I'm sorry, I'm having trouble connecting right now. Please try again later.", 'assistant');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen chat-container">
      <ChatHeader />
      
      <div className="flex-1 flex flex-col min-h-0">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <ScrollArea className="flex-1">
            <div className="space-y-0">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && <TypingIndicator />}
            </div>
          </ScrollArea>
        )}
        
        <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
