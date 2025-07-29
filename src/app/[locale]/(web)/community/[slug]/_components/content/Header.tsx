"use client";

import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CommunityHeaderProps {
  name: string;
  province: string;
  category: string;
  fullDescription: string;
}

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function CommunityHeader({
  name,
  province,
  category,
  fullDescription,
}: CommunityHeaderProps) {
  return (
    <motion.header variants={item} className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
          {name}
        </h1>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{province}</span>
        </div>
      </div>
      <Badge variant="outline" className="text-sm px-3 py-1">
        {category}
      </Badge>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Description</h2>
        <p className="text-base text-gray-600 leading-relaxed">
          {fullDescription}
        </p>
      </div>
    </motion.header>
  );
}
