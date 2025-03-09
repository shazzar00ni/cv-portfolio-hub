
import { Plus } from "lucide-react";
import AnimatedSection from "../AnimatedSection";

interface AddBlogPostProps {
  onClick: () => void;
}

const AddBlogPost = ({ onClick }: AddBlogPostProps) => {
  return (
    <AnimatedSection delay={100}>
      <button
        onClick={onClick}
        className="bg-muted/50 border border-dashed border-muted-foreground/30 rounded-lg w-full h-full min-h-[200px] flex flex-col items-center justify-center p-6 transition-colors hover:bg-muted/80"
      >
        <Plus className="h-8 w-8 mb-2 text-muted-foreground" />
        <span className="text-muted-foreground font-medium">Add Article</span>
      </button>
    </AnimatedSection>
  );
};

export default AddBlogPost;
