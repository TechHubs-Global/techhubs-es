"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";
import type { Community } from "@/types/community";
import { CommunityCard } from "./_components/card";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

interface CommunitiesPageClientProps {
  communities: Community[];
}

export default function CommunitiesPageClient({
  communities,
}: CommunitiesPageClientProps) {
  const t = useTranslations("Communities");
  const [filteredCommunities, setFilteredCommunities] =
    useState<Community[]>(communities);
  const [categories, setCategories] = useState<string[]>(["all"]);
  const [provinces, setProvinces] = useState<string[]>(["all"]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProvince, setSelectedProvince] = useState<string>("all");

  useEffect(() => {
    // Extract and set unique categories
    const uniqueCategories = Array.from(
      new Set(communities.map((c) => c.category).filter(Boolean))
    );
    setCategories(["all", ...uniqueCategories]);

    // Extract and set unique provinces
    const uniqueProvinces = Array.from(
      new Set(communities.map((c) => c.province).filter(Boolean))
    );
    setProvinces(["all", ...uniqueProvinces]);
  }, [communities]);

  useEffect(() => {
    let filtered = communities;
    if (selectedCategory !== "all") {
      filtered = filtered.filter((c) => c.category === selectedCategory);
    }
    if (selectedProvince !== "all") {
      filtered = filtered.filter((c) => c.province === selectedProvince);
    }
    setFilteredCommunities(filtered);
  }, [selectedCategory, selectedProvince, communities]);

  // Helper function to safely capitalize strings
  const capitalize = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Helper function to get translated text for category/province
  const getDisplayText = (value: string, type: "category" | "province") => {
    if (value === "all") {
      return type === "category" ? t("allCategories") : t("allProvinces");
    }
    return capitalize(value);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="space-y-12">
          <div className="relative flex flex-col items-center text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                {t("title")}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t("subtitle")}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 md:p-6"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Tabs
                defaultValue="all"
                className="w-full"
                onValueChange={setSelectedCategory}
              >
                <TabsList className="w-full h-full flex-wrap justify-start gap-2 bg-transparent">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      aria-hidden={true}
                      role="tab"
                      aria-controls={`communities-${category}`}
                      className={cn(
                        "flex-shrink-0 px-4 py-2 rounded-lg",
                        "data-[state=active]:bg-primary/10",
                        "data-[state=active]:text-primary",
                        "transition-all duration-200",
                        "hover:bg-accent/10"
                      )}
                    >
                      {getDisplayText(category, "category")}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <Select onValueChange={setSelectedProvince} defaultValue="all">
                <SelectTrigger
                  className="w-full md:w-[200px]"
                  aria-label={`${t("filterByProvince")}: ${getDisplayText(
                    selectedProvince,
                    "province"
                  )}`}
                >
                  <SelectValue placeholder={t("filterByProvince")} />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((province) => (
                    <SelectItem key={province} value={province}>
                      {getDisplayText(province, "province")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCommunities.map((community) => (
              <CommunityCard key={community.slug} community={community} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
