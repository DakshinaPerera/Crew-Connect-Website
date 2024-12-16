// utils/api.ts
interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
  }
  
  export const authenticatedFetch = async (url: string, options: FetchOptions = {}): Promise<Response> => {
      try {
          const response = await fetch(url, {
              ...options,
              credentials: 'include',
              headers: {
                  ...options.headers,
                  'Content-Type': 'application/json',
              },
          });
  
          if (response.status === 401) {
              // Try to refresh the token
              const refreshResponse = await fetch('http://localhost:4500/api/v1/auth/refresh', {
                  method: 'POST',
                  credentials: 'include',
              });
  
              if (refreshResponse.ok) {
                  // Retry the original request
                  return authenticatedFetch(url, options);
              } else {
                  // Redirect to login
                  window.location.href = '/login';
                  throw new Error('Authentication failed');
              }
          }
  
          return response;
      } catch (error) {
          console.error('Fetch error:', error);
          throw error;
      }
  };