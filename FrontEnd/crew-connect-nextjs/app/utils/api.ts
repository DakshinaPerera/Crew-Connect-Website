// utils/api.ts

// Define types for fetch options
interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
  }
  
  // Main authenticated fetch function
  export const authenticatedFetch = async (url: string, options: FetchOptions = {}): Promise<Response> => {
    try {
      // Make the initial request with credentials
      const response = await fetch(url, {
        ...options,
        credentials: 'include',  // Important for sending cookies
        headers: {
          ...options.headers,
          'Content-Type': 'application/json',
        },
      });
  
      // If unauthorized, attempt token refresh
      if (response.status === 401) {
        try {
          // Try to refresh the token
          const refreshResponse = await fetch('http://localhost:4500/api/v1/auth/refresh', {
            method: 'POST',
            credentials: 'include',
          });
  
          if (refreshResponse.ok) {
            // If refresh successful, retry the original request
            return await fetch(url, {
              ...options,
              credentials: 'include',
              headers: {
                ...options.headers,
                'Content-Type': 'application/json',
              },
            });
          } else {
            // If refresh fails, redirect to login
            window.location.href = '/login';
            throw new Error('Session expired. Please login again.');
          }
        } catch (error) {
          // Handle refresh request errors
          window.location.href = '/login';
          throw new Error('Authentication failed');
        }
      }
  
      return response;
    } catch (error) {
      // Handle network or other errors
      console.error('Fetch error:', error);
      throw error;
    }
  };
  
  // Helper function to check auth status
  export const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const response = await authenticatedFetch('http://localhost:4500/api/v1/auth/protected');
      return response.ok;
    } catch (error) {
      return false;
    }
  };