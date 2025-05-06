
import { supabase } from '@/integrations/supabase/client';

/**
 * Uploads an image file to Supabase Storage
 * @param file The file to upload
 * @returns The public URL of the uploaded file, or empty string if upload fails
 */
export const uploadPortfolioImage = async (file: File): Promise<string> => {
  try {
    // Generate a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `portfolio/${fileName}`;

    // Upload the file to Supabase Storage
    const { error } = await supabase.storage
      .from('portfolio')
      .upload(filePath, file);

    if (error) {
      console.error("Storage upload error:", error);
      throw error;
    }

    // Get the public URL
    const { data } = supabase.storage.from('portfolio').getPublicUrl(filePath);
    return data.publicUrl;
  } catch (error) {
    console.error("Image upload failed:", error);
    return ''; // Return empty string if upload fails
  }
};

/**
 * Returns a default fallback image URL
 */
export const getDefaultPortfolioImage = (): string => {
  return 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
};
