import { routing, type Locale } from "@/i18n/routing";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import { fetchCommunities } from "@/lib/fetch-communities";
import { metadata as metadataConstants } from "@/constants/metadata";
import CommunitiesPageClient from "./page.client";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Communities" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    keywords: [
      ...metadataConstants.keywords,
      "meetups",
      "events",
      "networking",
      "developers",
    ],
    openGraph: {
      ...metadataConstants.openGraph,
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `https://techhubs.es/${locale}/communities`,
      locale: locale === "es" ? "es_ES" : "en_US",
    },
    twitter: {
      ...metadataConstants.twitter,
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
    alternates: {
      canonical: "https://techhubs.es/communities",
      languages: {
        "es": "https://techhubs.es/es/communities",
        "en": "https://techhubs.es/en/communities",
        "x-default": "https://techhubs.es/es/communities",
      },
    },
    robots: metadataConstants.robots,
  };
}

export default async function CommunitiesPage({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  const communities = fetchCommunities();

  return <CommunitiesPageClient communities={communities} />;
}
