import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";

import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";

import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import { cn } from "@/lib/utils";

import Analytics from "@/app/analytics";
import "@/app/globals.css";

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { setRequestLocale, getTranslations } from "next-intl/server";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    locale: Locale;
  }>;
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Localized metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  return {
    title: {
      template: `TechHubs Spain | %s`,
      default: `TechHubs Spain | ${t('title')} ${t('country')}`,
    },
    description: t('subtitle'),
    keywords: ['tech', 'communities', 'spain', 'developers', 'meetups', 'events'],
    authors: [{ name: 'TechHubs Spain' }],
    creator: 'TechHubs Spain',
    openGraph: {
      title: `${t('title')} ${t('country')}`,
      description: t('subtitle'),
      url: 'https://techhubs.es',
      siteName: 'TechHubs Spain',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('title')} ${t('country')}`,
      description: t('subtitle'),
    },
  };
}

// Static rendering for all locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html suppressHydrationWarning lang={locale}>
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable} antialiased`,
          "min-h-screen antialiased",
          "dark:bg-black/[0.96] bg-zinc-100",
        )}
      >
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex flex-col min-h-screen text-foreground">
              <Header />
              <main className="flex-1 w-full">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
