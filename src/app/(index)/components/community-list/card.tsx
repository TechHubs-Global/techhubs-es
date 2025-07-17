"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CommunityInfo } from "./info";
import { cn } from "@/lib/utils";
import type { Community } from "@/types/community";
import { CommunityDescription } from "./description";

interface CommunityCardProps {
  community: Community;
  isHovered: boolean;
}

export function CommunityCard({ community, isHovered }: CommunityCardProps) {
  const [localHovered, setLocalHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setLocalHovered(true)}
      onMouseLeave={() => setLocalHovered(false)}
      className={cn(
        "group w-full h-[280px] p-5 backdrop-blur-sm",
        "dark:bg-background/50 bg-white",
        "rounded-xl flex flex-col gap-4 cursor-pointer",
        "dark:border-border/50 border-border/20",
        "transition-all duration-300 ease-out",
        "hover:bg-accent/5",
        (localHovered || isHovered) &&
          "ring-2 ring-primary/50 ring-offset-2 ring-offset-background shadow-lg"
      )}
    >
      <motion.div layout className="flex-none">
        <CommunityInfo community={community} />
      </motion.div>
      <motion.div layout className="flex-1">
        <CommunityDescription community={community} />
      </motion.div>
    </div>
  );
}
