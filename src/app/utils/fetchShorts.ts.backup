export interface Short {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  description: string;
}

interface FetchOptions {
  maxRetries?: number;
  retryDelay?: number;
}

export async function fetchYouTubeShorts(options: FetchOptions = {}): Promise<Short[]> {
  const { maxRetries = 2, retryDelay = 1000 } = options;
  let retries = 0;
  let lastError: Error | null = null;

  while (retries <= maxRetries) {
    try {
      // Get the current origin (protocol + hostname + port)
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      
      // Build the absolute URL
      const apiUrl = `${origin}/api/youtube-shorts`;
      
      console.log(`Fetching YouTube shorts (attempt ${retries + 1}/${maxRetries + 1})...`);
      
      // Fetch shorts from our API endpoint
      const response = await fetch(apiUrl, {
        // Add cache busting for retries
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        // Add timestamp to prevent caching on retries
        cache: 'no-store'
      });
      
      if (!response.ok) {
        const text = await response.text();
        let errorMessage = `Failed to fetch shorts: ${response.status}`;
        
        try {
          const errorData = JSON.parse(text);
          if (errorData && errorData.error) {
            errorMessage = errorData.error;
          }
        } catch {
          // If we can't parse the error, use the response text
          if (text) {
            errorMessage += ` - ${text.substring(0, 100)}`;
          }
        }
        
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      
      // Validate the response format
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format: Expected an array of shorts');
      }
      
      return data;
    } catch (error) {
      console.error(`Error in fetchYouTubeShorts (attempt ${retries + 1}):`, error);
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // If we haven't reached max retries, wait and try again
      if (retries < maxRetries) {
        retries++;
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      } else {
        // We've reached max retries, throw the last error
        throw lastError;
      }
    }
  }
  
  // This should never be reached due to the throw in the catch block
  return [];
} 