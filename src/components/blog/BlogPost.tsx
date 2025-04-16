
import { ExternalLink } from 'lucide-react';
import { BlogPostType } from './types';
import AnimatedSection from '../AnimatedSection';
import { getTimeAgo } from '@/lib/image-utils';
import { Button } from '../ui/button';
import { OptimizedImage } from '../ui/optimized-image';

interface BlogPostProps {
  post: BlogPostType;
}

const BlogPost = ({ post }: BlogPostProps) => {
  const platformIcons = {
    medium: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/medium.svg",
    substack: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/substack.svg",
    other: "https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/rss.svg"
  };

  return (
    <AnimatedSection delay={parseInt(post.id) * 100} className="hover-lift">
      <div className="bg-card border rounded-lg overflow-hidden flex flex-col h-full">
        {post.image && (
          <div className="relative w-full aspect-[1.91/1]">
            <OptimizedImage 
              src={post.image}
              alt={post.alt || post.title} 
              width={400}
              height={210}
              className="w-full h-full"
            />
          </div>
        )}
        <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-grow">
          <div className="flex items-center mb-2 md:mb-3">
            <img 
              src={platformIcons[post.platform]} 
              alt={post.platform} 
              className="w-4 h-4 md:w-5 md:h-5 mr-2 invert dark:invert-0 opacity-70"
              loading="lazy"
              width="20"
              height="20"
            />
            <span className="text-xs text-muted-foreground">{post.platform.charAt(0).toUpperCase() + post.platform.slice(1)}</span>
            <span className="mx-2 text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{getTimeAgo(post.date)}</span>
          </div>
          
          <h3 className="text-base md:text-lg font-medium mb-2">{post.title}</h3>
          <p className="text-muted-foreground text-xs md:text-sm mb-4 flex-grow line-clamp-3">{post.description}</p>
          
          <Button asChild variant="outline" className="w-full mt-auto text-xs md:text-sm py-1 md:py-2">
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              Read Article <ExternalLink size={14} className="ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default BlogPost;
