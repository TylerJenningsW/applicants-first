'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('message') || 'Sorry, something went wrong';

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Error</h1>
      <p>{decodeURIComponent(errorMessage)}</p>
    </div>
  );
}
