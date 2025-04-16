
import { Plus } from "lucide-react";
import { AddItemCard } from "../ui/add-item-card";

interface AddBlogPostProps {
  onClick: () => void;
}

const AddBlogPost = ({ onClick }: AddBlogPostProps) => {
  return (
    <AddItemCard 
      onClick={onClick}
      title="Add Article"
      icon={<Plus className="h-8 w-8 mb-2 text-muted-foreground" />}
      delay={300}
    />
  );
};

export default AddBlogPost;
