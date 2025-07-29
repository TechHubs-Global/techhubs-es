"use client";

import { motion } from "motion/react";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AboutPageClientProps {
  title: string;
  subtitle: string;
  description1: string;
  description2: string;
  mission: string;
  missionText: string;
  vision: string;
  visionText: string;
  joinUs: string;
  joinUsText: string;
  viewOnGitHub: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function AboutPageClient({
  title,
  subtitle,
  description1,
  description2,
  mission,
  missionText,
  vision,
  visionText,
  joinUs,
  joinUsText,
  viewOnGitHub,
}: AboutPageClientProps) {
  return (
    <div className="min-h-screen w-full overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 py-16 max-w-4xl space-y-12"
      >
        <motion.div variants={item} className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            {title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        <motion.div
          variants={item}
          className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 md:p-8 shadow-lg"
        >
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                {description1}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {description2}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  {mission}
                </h3>
                <p className="text-gray-600">{missionText}</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  {vision}
                </h3>
                <p className="text-gray-600">{visionText}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-border/50">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  {joinUs}
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">{joinUsText}</p>
                <Button
                  asChild
                  variant="outline"
                  className="group relative overflow-hidden rounded-xl border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                >
                  <a
                    href="https://github.com/TechHubs-Global/techhubs-es"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-6 py-3"
                  >
                    <Github className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium">{viewOnGitHub}</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
