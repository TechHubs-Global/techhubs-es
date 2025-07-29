"use client";

import { motion } from "motion/react";
import type { Community } from "@/types/community";
import CommunityHeader from "./Header";
import CommunityConnect from "./Connect";
import CommunityMembers from "./Members";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

interface CommunityContentProps {
  community: Community;
}

export default function CommunityContent({ community }: CommunityContentProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="container mx-auto px-4 py-8 md:py-12 space-y-12"
    >
      <CommunityHeader
        name={community.name}
        province={community.province}
        category={community.category}
        fullDescription={community.fullDescription}
      />
      <div className="grid md:grid-cols-2 gap-8">
        <CommunityConnect
          website={community.website}
          twitter={community.twitter}
          whatsapp={community.whatsapp}
          telegram={community.telegram}
          discord={community.discord}
        />
      </div>
      <CommunityMembers members={community.members} />
    </motion.div>
  );
}
