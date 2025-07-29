"use client";

import { memo } from "react";
import { motion, type Variants } from "motion/react";
import { useTranslations } from "next-intl";

import { EventCard, type LumaEvent } from "./event-card";

interface EventsListProps {
  events: LumaEvent[];
}

const EventsList = memo(({ events }: EventsListProps) => {
  const t = useTranslations("Events");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  if (events.length === 0) {
    return null;
  }

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="container max-w-[1220px] w-full px-6 md:px-10 relative z-10 mx-auto">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
            {t("next")}
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("nextDescription")}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {events.map((event) => (
            <EventCard key={event.id} event={event} variants={itemVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  );
});

EventsList.displayName = "EventsList";

export { EventsList };
