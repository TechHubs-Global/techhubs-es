import { Suspense } from 'react';

import { fetchCommunities } from '@/lib/fetch-communities';
import ClientPage from './page.client';

export default async function HomePage() {
  const communities = await fetchCommunities();

  return (
    <div className='w-full'>
      <div className='container mx-auto px-4 py-4'>
        <Suspense
          fallback={
            <div className='animate-pulse w-full h-[600px] bg-muted/20 rounded-xl' />
          }
        >
          <ClientPage communities={communities} />
        </Suspense>
      </div>
    </div>
  );
}
