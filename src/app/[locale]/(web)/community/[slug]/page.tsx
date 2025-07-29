import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

import CommunityContent from "./_components/content";
import {
  fetchCommunities,
  fetchCommunityBySlug,
} from "@/lib/fetch-communities";

import { metadata as metadataConstants } from "@/constants/metadata";

type Props = {
  params: Promise<{ slug: string; locale: Locale }>;
};

export const generateStaticParams = async () => {
  const communities = fetchCommunities();
  const paths: { slug: string; locale: Locale }[] = [];

  routing.locales.forEach((locale) => {
    communities.forEach((community) => {
      paths.push({ slug: community.slug, locale });
    });
  });

  return paths;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const community = fetchCommunityBySlug(slug);
  const t = await getTranslations({ locale, namespace: "Community" });

  if (!community) {
    return {
      title: t("notFoundTitle"),
      description: t("notFoundDescription"),
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const truncatedDescription =
    community.shortDescription.length > 150
      ? community.shortDescription.substring(0, 147) + "..."
      : community.shortDescription;

  const metaTitle = t("metaTitle", {
    name: community.name,
    province: community.province,
  });

  const metaDescription = t("metaDescription", {
    name: community.name,
    category: community.category,
    province: community.province,
    description: truncatedDescription,
  });

  const communityKeywords = [
    community.name.toLowerCase(),
    community.category.toLowerCase(),
    community.province.toLowerCase(),
    "meetup",
    "networking",
  ];

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: [...metadataConstants.keywords, ...communityKeywords],
    openGraph: {
      ...metadataConstants.openGraph,
      title: metaTitle,
      description: metaDescription,
      url: `https://techhubs.es/${locale}/community/${slug}`,
      locale: locale === "es" ? "es_ES" : "en_US",
    },
    twitter: {
      ...metadataConstants.twitter,
      title: metaTitle,
      description: metaDescription,
    },
    alternates: {
      canonical: `https://techhubs.es/community/${slug}`,
      languages: {
        "es": `https://techhubs.es/es/community/${slug}`,
        "en": `https://techhubs.es/en/community/${slug}`,
        "x-default": `https://techhubs.es/es/community/${slug}`,
      },
    },
    robots: metadataConstants.robots,
  };
}

export default async function CommunityPage({ params }: Props) {
  const { slug } = await params;
  const community = fetchCommunityBySlug(slug);
  if (!community) {
    notFound();
  }

  return (
    <div className="min-h-screen w-full">
      <CommunityContent community={community} />
    </div>
  );
}
