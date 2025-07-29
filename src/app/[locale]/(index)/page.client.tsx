"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import SpainMap from "@/components/spain-map";
import { Spotlight } from "@/components/ui/spotlight";
import AddCommunityButton from "./_components/add-community-button";
import CommunityList from "./_components/community-list";

import { cn } from "@/lib/utils";
import type { Community } from "@/types/community";

interface HomePageClientProps {
  communities: Community[];
}

export default function HomePageClient({ communities }: HomePageClientProps) {
  const t = useTranslations("HomePage");
  const [hoveredCommunityId, setHoveredCommunityId] = useState<string | null>(
    null
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col xl:flex-row gap-8 mb-12">
        <div className="w-full xl:w-2/3 relative">
          <div className="aspect-[4/3] md:aspect-[16/9] xl:aspect-auto xl:h-[600px]">
            <SpainMap
              communities={communities}
              onHoverCommunity={setHoveredCommunityId}
            />
          </div>
        </div>

        <div className="w-full xl:w-1/3 flex flex-col justify-center">
          <Spotlight />
          <div className="relative space-y-4">
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold tracking-tight tech-gradient">
              {t("title")}{" "}
              <span className="bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
                {t("country")}
              </span>
            </h1>
            <h2 className="text-lg sm:text-xl text-gray-600 max-w-prose">
              {t("subtitle")}
            </h2>
            <div className="pt-2">
              <AddCommunityButton />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div
          className={cn(
            "rounded-xl shadow-lg p-4 sm:p-6 border",
            "dark:bg-card/50 bg-white/80",
            "dark:border-border/50 border-border/20"
          )}
        >
          <CommunityList
            communities={communities}
            hoveredCommunityId={hoveredCommunityId}
          />
        </div>
      </div>
    </div>
  );
}
