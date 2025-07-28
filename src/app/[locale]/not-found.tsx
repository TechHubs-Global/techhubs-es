import NotFoundContent from "@/components/common/not-found-content";
import { getTranslations } from "next-intl/server";

export default async function LocaleNotFound() {
  const t = await getTranslations("NotFound");
  const tCommon = await getTranslations("Common");

  return (
    <div className="relative min-h-[70vh] w-full overflow-hidden bg-background">
      <NotFoundContent
        title={t("title")}
        subtitle={t("subtitle")}
        description={t("description")}
        showBackButton={true}
        backButtonText={tCommon("backToHome")}
        backButtonHref="/"
        showHomeButton={false}
        className="relative min-h-[70vh] w-full overflow-hidden bg-background"
      />
    </div>
  );
}
