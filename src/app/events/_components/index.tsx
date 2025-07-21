"use client";

import { memo } from "react";
import { HeroSection } from "./hero-section";
import { EventsList } from "./events-list";
import type { LumaEvent } from "./event-card";

interface LumaEventsProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  primaryImageSrc: string;
  secondaryImageSrc: string;
  reverseLayout?: boolean;
  events?: LumaEvent[];
}

const LumaEvents = memo(
  ({
    title,
    description,
    primaryImageSrc,
    secondaryImageSrc,
    reverseLayout = false,
    events = [],
  }: LumaEventsProps) => {
    return (
      <div className="w-full">
        <HeroSection
          title={title}
          description={description}
          primaryImageSrc={primaryImageSrc}
          secondaryImageSrc={secondaryImageSrc}
          reverseLayout={reverseLayout}
        />

        <EventsList events={events} />
      </div>
    );
  },
);

LumaEvents.displayName = "LumaEvents";

export { LumaEvents };
export type { LumaEvent };
