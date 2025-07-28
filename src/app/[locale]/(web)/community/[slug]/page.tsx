import {
  fetchCommunities,
  fetchCommunityBySlug,
} from "@/lib/fetch-communities";
import CommunityContent from "./_components/content";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  const communities = fetchCommunities();
  return communities.map((community) => ({
    slug: community.slug,
  }));
};

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
