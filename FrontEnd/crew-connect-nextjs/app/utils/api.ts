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
      try {
        const refreshResponse = await fetch('http://localhost:4500/api/v1/auth/refresh', {
          method: 'POST',
          credentials: 'include',
        });

        if (refreshResponse.ok) {
          return await fetch(url, {
            ...options,
            credentials: 'include',
            headers: {
              ...options.headers,
              'Content-Type': 'application/json',
            },
          });
        } else {
          return response; // Return the original 401 response instead of redirecting
        }
      } catch (error) {
        return response; // Return the original 401 response on error
      }
    }

    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const checkAuthStatus = async (): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:4500/api/v1/auth/protected', {
      credentials: 'include',
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};