import { Heart, Shield, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function EmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
          <Heart className="w-8 h-8 text-primary" />
        </div>
        
        <h2 className="text-2xl font-semibold mb-3">Welcome to HealthMate AI</h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Describe your symptoms in natural language, and I'll help you understand 
          potential conditions and next steps.
        </p>
        
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="secondary" className="flex items-center gap-1.5">
            <Shield className="w-3 h-3" />
            AI-Powered
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1.5">
            <Heart className="w-3 h-3" />
            Health Focused
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1.5">
            <AlertTriangle className="w-3 h-3" />
            Not Medical Advice
          </Badge>
        </div>
      </div>
    </div>
  );
}