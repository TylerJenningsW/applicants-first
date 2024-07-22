'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getBrowserClient } from '../../../utils/supabase/supaBaseBrowserClient';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const supabase = getBrowserClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error fetching session:', error.message);
      }

      if (!session?.user) {
        router.push('/login'); // Redirect to login page if not authenticated
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };

    checkUser();
  }, [router, supabase]);

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while checking auth status
  }

  if (!user) {
    return null; // Prevent rendering the protected content before redirect
  }

  return <>{children}</>;
};

export default ProtectedRoute;
