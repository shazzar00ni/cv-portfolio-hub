
import { useState } from 'react';
import { Image as ImageIcon, Plus, X } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type PortfolioItem = {
  id: string;
  image: string;
  title: string;
  description: string;
  category: string;
};

const Portfolio = () => {
  const { toast } = useToast();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: '1',
      image: '/lovable-uploads/c6302c70-c741-4067-8864-38474f706526.png',
      title: 'Artify-AI',
      description: 'A collaborative platform that empowers artistic creators by merging AI technology with an intuitive interface. Features include art generation, creative coding tutorials, collaboration tools, and NFT integration.',
      category: 'Web Development',
    },
    {
      id: '2',
      image: '/lovable-uploads/5510da89-2afb-483c-8ac3-ee05636eaf15.png',
      title: 'Markdown Editor',
      description: 'A responsive web application for creating and previewing markdown content in real-time. Features include syntax highlighting, split-pane view, and a clean, modern interface.',
      category: 'Web Development',
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Web Development Project',
      description: 'Modern responsive website built with React and Tailwind CSS.',
      category: 'Web Development',
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Mobile App Design',
      description: 'UI/UX design for a productivity mobile application.',
      category: 'UI/UX Design',
    },
    {
      id: '5',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Backend System',
      description: 'Robust backend architecture with Node.js and PostgreSQL.',
      category: 'Backend',
    },
  ]);

  const [filter, setFilter] = useState<string>('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<PortfolioItem>>({
    id: Math.random().toString(36).substring(2, 9),
    title: '',
    description: '',
    category: '',
    image: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const categories = ['all', ...new Set(portfolioItems.map((item) => item.category))];

  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItem.title || !newItem.description || !newItem.category || !imageFile) {
      toast({
        title: "Missing information",
        description: "Please fill all fields and select an image",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would upload the image to a storage service
    // and get back a URL. For this demo, we'll use a placeholder URL
    // if there's an actual file selected
    const imagePath = imageFile 
      ? `https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`
      : '';
    
    // Add the new item with the image URL
    setPortfolioItems(prev => [
      ...prev, 
      { 
        ...newItem, 
        id: newItem.id || Math.random().toString(36).substring(2, 9),
        image: imagePath 
      } as PortfolioItem
    ]);
    
    // Show success toast
    toast({
      title: "Project added",
      description: "Your project has been added to the portfolio",
    });
    
    // Reset form and close modal
    setIsUploadModalOpen(false);
    setNewItem({
      id: Math.random().toString(36).substring(2, 9),
      title: '',
      description: '',
      category: '',
      image: '',
    });
    setImageFile(null);
    setImagePreview('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create a preview for the UI
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveItem = (id: string) => {
    setPortfolioItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Project removed",
      description: "The project has been removed from your portfolio",
    });
  };

  return (
    <section id="portfolio" className="py-16 md:py-24">
      <div className="container-custom">
        <AnimatedSection>
          <h2 className="section-heading">PORTFOLIO</h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                onClick={() => setFilter(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <AnimatedSection 
                key={item.id} 
                className="group bg-card border border-muted rounded-lg overflow-hidden hover-lift"
                delay={parseInt(item.id) * 100}
              >
                <div className="relative aspect-video">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="absolute top-2 right-2 p-1 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} className="text-destructive" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                  <span className="inline-block px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
                    {item.category}
                  </span>
                </div>
              </AnimatedSection>
            ))}
            
            <AnimatedSection 
              className="flex flex-col items-center justify-center border border-dashed border-muted rounded-lg p-8 hover-lift cursor-pointer h-full min-h-[280px]"
              onClick={() => setIsUploadModalOpen(true)}
              delay={400}
            >
              <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                <Plus size={24} className="text-primary" />
              </div>
              <p className="text-center font-medium">Add New Project</p>
              <p className="text-center text-muted-foreground text-sm mt-2">
                Upload images, add details and share your work
              </p>
            </AnimatedSection>
          </div>
        </AnimatedSection>
      </div>

      {/* Modal for uploading projects */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-muted rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-muted">
              <h3 className="text-lg font-medium">Add New Project</h3>
              <button 
                onClick={() => {
                  setIsUploadModalOpen(false);
                  setImagePreview('');
                  setImageFile(null);
                }}
                className="rounded-full p-1 hover:bg-muted"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Project Image</label>
                <div className={cn(
                  "border-2 border-dashed border-muted rounded-lg p-4 text-center",
                  imagePreview ? "border-primary" : ""
                )}>
                  {imagePreview ? (
                    <div className="relative aspect-video mb-2">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover rounded-md" 
                      />
                      <button 
                        type="button"
                        onClick={() => {
                          setImagePreview('');
                          setImageFile(null);
                        }}
                        className="absolute top-2 right-2 p-1 bg-background/80 rounded-full"
                      >
                        <X size={16} className="text-destructive" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-4">
                      <ImageIcon size={40} className="text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">
                        Drag & drop or click to upload
                      </p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    className="hidden" 
                    id="image-upload" 
                  />
                  <label 
                    htmlFor="image-upload" 
                    className="mt-2 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium cursor-pointer"
                  >
                    {imagePreview ? 'Replace Image' : 'Select Image'}
                  </label>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
                <input 
                  type="text" 
                  id="title"
                  value={newItem.title} 
                  onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                  className="w-full px-3 py-2 border border-muted rounded-md" 
                  required 
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium mb-2">Category</label>
                <input 
                  type="text" 
                  id="category" 
                  value={newItem.category} 
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  className="w-full px-3 py-2 border border-muted rounded-md" 
                  required 
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
                <textarea 
                  id="description" 
                  value={newItem.description} 
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  className="w-full px-3 py-2 border border-muted rounded-md" 
                  rows={3} 
                  required 
                />
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsUploadModalOpen(false);
                    setImagePreview('');
                    setImageFile(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={!imageFile || !newItem.title || !newItem.description || !newItem.category}>
                  Add Project
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
