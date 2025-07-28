import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import ContactPageClient from "./page.client";

type Props = {
  params: Promise<{ locale: Locale }>;
};

// Generate static params for all locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);
  
  const t = await getTranslations("Contact");

  return (
    <ContactPageClient
      title={t("title")}
      subtitle={t("subtitle")}
      email={t("email")}
      github={t("github")}
      twitter={t("twitter")}
    />
  );
}
