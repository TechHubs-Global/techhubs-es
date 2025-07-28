import NotFoundContent from "@/components/common/not-found-content";
import { getTranslations } from "next-intl/server";

export default async function CommunityNotFound() {
  const t = await getTranslations("Community");

  return (
    <div className="relative min-h-[60vh] w-full overflow-hidden bg-background">
      <NotFoundContent
        title={t("notFoundTitle")}
        subtitle={t("notFoundSubtitle")}
        description={t("notFoundDescription")}
        showBackButton={true}
        backButtonText={t("notFoundBackButton")}
        backButtonHref="/communities"
        showHomeButton={true}
        className="relative min-h-[60vh] w-full overflow-hidden bg-background"
      />
    </div>
  );
}
