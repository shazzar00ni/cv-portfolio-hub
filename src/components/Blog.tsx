
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { BlogPostType } from './blog/types';
import AnimatedSection from './AnimatedSection';
import BlogPost from './blog/BlogPost';
import AddBlogPost from './blog/AddBlogPost';
import BlogPostModal from './blog/BlogPostModal';

const Blog = () => {
  const { toast } = useToast();
  const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([
    {
      id: '1',
      title: 'From Pixels to Production: Figma's New Design-to-Code Feature',
      description: 'Exploring how Figma's design-to-code feature is reshaping the workflow between designers and developers.',
      url: 'https://medium.com/@shanlockett/from-pixels-to-production-figmas-new-design-to-code-feature-8f7d25e758ad',
      platform: 'medium',
      date: '2023-12-10T12:00:00Z',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '2',
      title: 'Unlocking Digital Flexibility: The Transformative Benefits of Headless CMS',
      description: 'A deep dive into how headless CMS architecture provides greater flexibility and scalability for modern digital experiences.',
      url: 'https://medium.com/@shanlockett/unlocking-digital-flexibility-the-transformative-benefits-of-headless-cms-16622a762c69',
      platform: 'medium',
      date: '2023-11-05T12:00:00Z',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '3',
      title: 'The Future of Web Development with React and TypeScript',
      description: 'An exploration of modern web development practices and how TypeScript improves the React developer experience.',
      url: 'https://medium.com/example/future-of-web-development',
      platform: 'medium',
      date: '2023-10-15T12:00:00Z',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '4',
      title: 'Creating Accessible UI Components from Scratch',
      description: 'Learn how to build accessible, reusable UI components that work for everyone regardless of ability.',
      url: 'https://substack.com/example/accessible-ui-components',
      platform: 'substack',
      date: '2023-09-22T12:00:00Z',
      image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '5',
      title: 'My Journey as a Self-Taught Developer',
      description: 'The challenges, wins, and lessons learned from teaching myself programming and landing my first job.',
      url: 'https://medium.com/example/self-taught-developer',
      platform: 'medium',
      date: '2023-08-05T12:00:00Z',
      image: 'https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  ]);

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const handleAddPost = (post: BlogPostType) => {
    setBlogPosts(prev => [post, ...prev]);
  };

  return (
    <section id="blog" className="py-16 md:py-24 border-t border-muted">
      <div className="container-custom">
        <AnimatedSection>
          <h2 className="section-heading">BLOG</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            Check out my latest articles about web development, design, and technology.
            I regularly write on Medium and Substack to share my knowledge and experiences.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogPost key={post.id} post={post} />
            ))}
            <AddBlogPost onClick={() => setIsPostModalOpen(true)} />
          </div>
        </AnimatedSection>
      </div>

      <BlogPostModal 
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onAddPost={handleAddPost}
      />
    </section>
  );
};

export default Blog;
