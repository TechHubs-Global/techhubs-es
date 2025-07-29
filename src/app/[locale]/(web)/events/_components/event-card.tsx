"use client";

import { memo } from "react";
import { motion, type Variants } from "motion/react";
import { useTranslations } from "next-intl";
import { ChevronRight, MapPin, Users } from "lucide-react";

interface LumaEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  attendees: number;
  host: string;
  imageUrl: string;
  lumaUrl: string;
  tags: string[];
}

interface EventCardProps {
  event: LumaEvent;
  variants: Variants;
}

const EventCard = memo(({ event, variants }: EventCardProps) => {
  const t = useTranslations("Events");

  const handleEventClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleEventKeyDown = (event: React.KeyboardEvent, url: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleEventClick(url);
    }
  };

  return (
    <motion.div
      key={event.id}
      className="group relative bg-card/50 rounded-2xl backdrop-blur-[15px] border border-border/50 overflow-hidden transition-all duration-300 hover:bg-card/70 hover:border-border cursor-pointer flex flex-col"
      variants={variants}
      transition={{ duration: 0.7, ease: "easeOut" }}
      tabIndex={0}
      role="button"
      aria-label={`Go to event ${event.title}`}
      onClick={() => handleEventClick(event.lumaUrl)}
      onKeyDown={(e) => handleEventKeyDown(e, event.lumaUrl)}
    >
      {/* Event Image */}
      <div className="relative h-48 md:h-52 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          style={{
            backgroundImage: `url(${event.imageUrl})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Event Tags */}
        <div
          className="absolute top-4 left-4 flex flex-wrap gap-2"
          aria-label={t("tags")}
        >
          {event.tags.slice(0, 2).map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-3 py-1 bg-background/20 backdrop-blur-sm text-white text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Attendees Count */}
        <div
          className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-background/20 backdrop-blur-sm rounded-full"
          aria-label={t("attendees")}
        >
          <Users className="w-4 h-4 text-white" />
          <span className="text-white text-xs font-medium">
            {event.attendees}
          </span>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3" aria-label={t("date")}>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-muted-foreground text-sm font-medium">
            {event.date}
          </span>
        </div>

        <h4 className="text-foreground text-lg font-semibold mb-2 line-clamp-2">
          {event.title}
        </h4>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
          {event.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-muted-foreground text-sm">
            {t("by")}{" "}
            <span className="font-medium text-foreground">{event.host}</span>
          </span>
        </div>

        {/* Footer */}
        <div className="mt-auto space-y-4">
          <div className="flex items-center gap-2" aria-label={t("location")}>
            <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="text-muted-foreground text-sm">{event.location}</span>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">{t("viewEvent")}</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

EventCard.displayName = "EventCard";

export { EventCard };
export type { LumaEvent };
