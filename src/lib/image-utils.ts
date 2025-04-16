
/**
 * Utility functions for image handling and optimization
 */

/**
 * Format an image URL with optimization parameters
 * @param url - The original image URL
 * @param width - The desired width of the image
 * @param quality - The desired quality (1-100)
 * @returns Optimized image URL
 */
export const getOptimizedImageUrl = (url: string, width = 400, quality = 75): string => {
  if (!url) return '';
  
  // Check if URL already has query parameters
  const hasParams = url.includes('?');
  const separator = hasParams ? '&' : '?';
  
  return `${url}${separator}w=${width}&q=${quality}&auto=format`;
};

/**
 * Get a fallback image URL for when an image fails to load
 */
export const getFallbackImageUrl = (): string => {
  return 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
};

/**
 * Format a date string as "time ago" (e.g., "2 days ago")
 * @param dateString - ISO date string
 * @returns Formatted time ago string
 */
export const getTimeAgo = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    
    // Calculate time difference in milliseconds
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    
    // Convert to appropriate time units
    const diffInSecs = Math.floor(diffInMs / 1000);
    const diffInMins = Math.floor(diffInSecs / 60);
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);
    
    if (diffInYears > 0) {
      return diffInYears === 1 ? '1 year ago' : `${diffInYears} years ago`;
    } else if (diffInMonths > 0) {
      return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`;
    } else if (diffInDays > 0) {
      return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
    } else if (diffInHours > 0) {
      return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
    } else if (diffInMins > 0) {
      return diffInMins === 1 ? '1 minute ago' : `${diffInMins} minutes ago`;
    } else {
      return 'Just now';
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};
