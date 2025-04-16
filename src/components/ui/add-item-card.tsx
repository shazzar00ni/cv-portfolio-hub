
import { Plus } from "lucide-react";
import AnimatedSection from "../AnimatedSection";
import { cn } from "@/lib/utils";

interface AddItemCardProps {
  onClick: () => void;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AddItemCard({
  onClick,
  title = "Add New Item",
  subtitle,
  icon = <Plus className="h-8 w-8 mb-2 text-muted-foreground" />,
  className,
  delay = 100
}: AddItemCardProps) {
  return (
    <AnimatedSection delay={delay}>
      <button
        onClick={onClick}
        className={cn(
          "bg-muted/50 border border-dashed border-muted-foreground/30 rounded-lg w-full h-full min-h-[200px] flex flex-col items-center justify-center p-6 transition-colors hover:bg-muted/80",
          className
        )}
      >
        {icon}
        <span className="text-muted-foreground font-medium">{title}</span>
        {subtitle && <p className="text-center text-muted-foreground text-sm mt-2">{subtitle}</p>}
      </button>
    </AnimatedSection>
  );
}
