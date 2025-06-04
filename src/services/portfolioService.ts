
/**
 * Uploads an image file (simplified version without Supabase)
 * @param file The file to upload
 * @returns A placeholder URL since we're not using backend storage
 */
export const uploadPortfolioImage = async (file: File): Promise<string> => {
  try {
    // Since we're not using Supabase anymore, we'll return the default image
    // In a real implementation, you could upload to a different service
    console.log('File selected:', file.name);
    return getDefaultPortfolioImage();
  } catch (error) {
    console.error("Image upload failed:", error);
    return '';
  }
};

/**
 * Returns a default fallback image URL
 */
export const getDefaultPortfolioImage = (): string => {
  return 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
};
