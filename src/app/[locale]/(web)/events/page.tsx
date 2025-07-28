import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import EventsPageClient from "./page.client";

type Props = {
  params: Promise<{ locale: Locale }>;
};

// Generate static params for all locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Mock data - En una aplicación real, esto vendría de una API
const events = [
  {
    id: "1",
    title: "LW15 - Madrid, España - Supabase Meetup",
    description:
      "Ven a pasar el rato, conocer gente increíble y charlar sobre todo lo relacionado con la tecnología y la innovación.",
    date: "31 July 2025, 18:00",
    location: "Madrid, Spain",
    attendees: 23,
    host: "Nicolas Gonzalez",
    imageUrl:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/gallery-images/v0/44926835-405e-4870-a748-6c56f9f833cc",
    lumaUrl: "https://lu.ma/hawtfz5f",
    tags: ["Supabase", "Meetup"],
  },
];

export default async function EventsPage({ params }: Props) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

  return <EventsPageClient events={events} />;
}
