import NotFoundContent from "@/components/common/not-found-content";

export default function CommunityNotFound() {
  return (
    <div className="relative min-h-[60vh] w-full overflow-hidden bg-background">
      <NotFoundContent
        title="Community"
        subtitle="Not Found"
        description="The community you are looking for doesn&apos;t exist or has been deleted."
        showBackButton={true}
        backButtonText="Back to Communities"
        backButtonHref="/communities"
        showHomeButton={true}
        className="relative min-h-[60vh] w-full overflow-hidden bg-background"
      />
    </div>
  );
}
