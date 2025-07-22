import NotFoundContent from "@/components/common/not-found-content";

export default function GlobalNotFound() {
  return (
    <div className="relative min-h-[60vh] w-full overflow-hidden bg-background">
      <NotFoundContent
        title="404"
        subtitle="Not Found"
        description="The page you are looking for doesn&apos;t exist."
        showBackButton={false}
        showHomeButton={true}
        className="relative min-h-[60vh] w-full overflow-hidden bg-background"
      />
    </div>
  );
} 