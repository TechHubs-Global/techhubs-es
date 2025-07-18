import Link from 'next/link';
import { Plus } from 'lucide-react';

import { cn } from '@/lib/utils';

export default function AddCommunityButton() {
  return (
    <Link href='/add-community' className='inline-block'>
      <button
        className={cn(
          'group relative overflow-hidden rounded-xl mt-8',
          'bg-card border border-border',
          'transition-all duration-300',
          'shadow-sm hover:shadow-md',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          // Neon effect
          'hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.5)]',
          'hover:border-primary/50',
          'dark:hover:shadow-[0_0_25px_-5px_hsl(var(--primary)/0.7)]',
        )}
        aria-label='Add new community to the platform'
        type='button'
      >
        {/* Animated background gradient with Spain colors */}
        <div
          className={cn(
            'absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300',
            'group-hover:opacity-100',
            'animate-[pulse_2s_ease-in-out_infinite]',
          )}
          style={{
            background: 'linear-gradient(45deg, rgba(220, 38, 38, 0.1), rgba(234, 179, 8, 0.1))',
          }}
        />

        {/* Main content */}
        <span
          className={cn(
            'relative z-10 flex items-center gap-2 rounded-lg',
            'bg-card/95 backdrop-blur-sm',
            'px-6 py-3 text-sm font-medium',
            'border border-border/50',
            'transition-all duration-300',
            'group-hover:bg-card group-hover:border-primary/30',
            'group-hover:shadow-inner',
          )}
        >
          <span
            className={cn(
              'flex items-center gap-2',
              'text-foreground transition-colors duration-300',
              'group-hover:text-primary font-mono',
            )}
          >
            <Plus
              className={cn('w-4 h-4', 'dark:text-primary text-primary/90')}
            />
            Add new community
          </span>
        </span>

        {/* Neon border animation with Spain flag colors */}
        <div
          className={cn(
            'absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300',
            'group-hover:opacity-100',
            'animate-[shimmer_2s_ease-in-out_infinite]',
          )}
          style={{
            background: 'linear-gradient(90deg, transparent, #dc2626, #eab308, transparent)',
            animation: 'shimmer 2s ease-in-out infinite',
          }}
        />
      </button>
    </Link>
  );
}
