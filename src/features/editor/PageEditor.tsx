'use client';
import dynamic from 'next/dynamic';

export const PageEditor = dynamic(() => import('./Editor'), {
  ssr: false,
});
