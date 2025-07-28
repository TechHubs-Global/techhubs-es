import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import AboutPageClient from "./page.client";

type Props = {
  params: Promise<{ locale: Locale }>;
};

// Generate static params for all locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);
  
  const t = await getTranslations("About");

  return (
    <AboutPageClient
      title={t("title")}
      subtitle={t("subtitle")}
      description1={t("description1")}
      description2={t("description2")}
      mission={t("mission")}
      missionText={t("missionText")}
      vision={t("vision")}
      visionText={t("visionText")}
      joinUs={t("joinUs")}
      joinUsText={t("joinUsText")}
      viewOnGitHub={t("viewOnGitHub")}
    />
  );
}
