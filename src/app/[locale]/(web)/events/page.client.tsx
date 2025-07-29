import { HeroSection } from "./_components/hero-section";
import { EventsList } from "./_components/events-list";
import type { LumaEvent } from "./_components/event-card";

interface EventsPageClientProps {
  events: LumaEvent[];
}

export default function EventsPageClient({ events }: EventsPageClientProps) {
  return (
    <div className="w-full">
      <HeroSection
        primaryImageSrc="/assets/events/primary.webp"
        secondaryImageSrc="/assets/events/secondary.webp"
        reverseLayout={false}
      />
      <EventsList events={events} />
    </div>
  );
}
