import {
  fetchCommunities,
  fetchCommunityBySlug,
} from "@/lib/fetch-communities";
import CommunityContent from "./_components/content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const generateStaticParams = async () => {
  const communities = fetchCommunities();
  return communities.map((community) => ({
    slug: community.slug,
  }));
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const community = fetchCommunityBySlug(slug);

  if (!community) {
    return {
      title: "Community Not Found",
      description: "The requested community could not be found.",
    };
  }

  return {
    title: `${community.name} - Tech Community in ${community.province}`,
    description: community.shortDescription,
    openGraph: {
      title: `${community.name} - Tech Community in ${community.province}`,
      description: community.shortDescription,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${community.name} - Tech Community in ${community.province}`,
      description: community.shortDescription,
    },
  };
}

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
