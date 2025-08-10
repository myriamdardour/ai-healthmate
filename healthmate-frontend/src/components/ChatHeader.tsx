import { Heart } from "lucide-react";

export function ChatHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md px-4 py-3">
      <div className="max-w-3xl mx-auto flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
          <Heart className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-semibold text-lg">HealthMate AI</h1>
          <p className="text-xs text-muted-foreground">AI Health Assistant</p>
        </div>
      </div>
    </header>
  );
}