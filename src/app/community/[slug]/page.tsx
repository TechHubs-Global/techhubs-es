import {
  fetchCommunities,
  fetchCommunityBySlug,
} from "@/lib/fetch-communities";
import CommunityContent from "./community-content";

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
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-2xl font-bold text-red-500">
          Community not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <CommunityContent community={community} />
    </div>
  );
}
