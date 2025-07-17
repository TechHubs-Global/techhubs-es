import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

import { cn } from '@/lib/utils';
import { metadata as metadataConstants } from '@/constants/metadata';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  ...metadataConstants,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang='es'>
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable} antialiased`,
          'min-h-screen antialiased',
          'dark:bg-black/[0.96] bg-zinc-100',
        )}
      >
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <div className='flex flex-col min-h-screen text-foreground'>
            <Header />
            <main className='flex-1 w-full'>{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
