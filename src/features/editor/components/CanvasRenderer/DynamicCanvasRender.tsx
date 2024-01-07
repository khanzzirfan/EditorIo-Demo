'use client';
import dynamic from 'next/dynamic';

export const KonvaCanvasRenderer = dynamic(() => import('./CanvasRenderer'), {
  ssr: false,
});
