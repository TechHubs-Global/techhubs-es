import { routing, type Locale } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

import { fetchCommunities } from "@/lib/fetch-communities";
import CommunitiesPageClient from "./page.client";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CommunitiesPage({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  const communities = fetchCommunities();

  return <CommunitiesPageClient communities={communities} />;
}
