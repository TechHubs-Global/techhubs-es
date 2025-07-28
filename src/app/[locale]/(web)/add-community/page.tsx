import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import AddCommunityPageClient from "./page.client";

type Props = {
  params: Promise<{ locale: Locale }>;
};

// Generate static params for all locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AddCommunityPage({ params }: Props) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);
  
  const t = await getTranslations("AddCommunity");

  return (
    <AddCommunityPageClient
      title={t("title")}
      subtitle={t("subtitle")}
      steps={{
        fork: t("steps.fork"),
        clone: t("steps.clone"),
        branch: t("steps.branch"),
        template: t("steps.template"),
        addJson: t("steps.addJson"),
        place: t("steps.place"),
        commit: t("steps.commit"),
        pr: t("steps.pr"),
      }}
      instructions={t("instructions")}
      viewOnGitHub={t("viewOnGitHub")}
    />
  );
}
