// components/ProtectedRoute.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authenticatedFetch } from '../utils/api';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await authenticatedFetch('http://localhost:4500/api/v1/auth/protected');
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          router.push('/login');
        }
      } catch (error) {
        router.push('/login');
      }
    };

    verifyAuth();
  }, [router]);

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
}