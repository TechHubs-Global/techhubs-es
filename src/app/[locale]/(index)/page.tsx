import { fetchCommunities } from "@/lib/fetch-communities";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import HomePageClient from "./page.client";

type Props = {
  params: Promise<{ locale: Locale }>;
};

// Generate static params for all locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

const communities = fetchCommunities();

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-4">
        <HomePageClient communities={communities} />
      </div>
    </div>
  );
}
