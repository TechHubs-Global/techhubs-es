"use client";

import { motion } from "motion/react";
import { Github, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddCommunityPageClientProps {
  title: string;
  subtitle: string;
  steps: {
    fork: string;
    clone: string;
    branch: string;
    template: string;
    addJson: string;
    place: string;
    commit: string;
    pr: string;
  };
  instructions: string;
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

export default function AddCommunityPageClient({
  title,
  subtitle,
  steps,
  instructions,
  viewOnGitHub,
}: AddCommunityPageClientProps) {
  const stepsList = [
    steps.fork,
    steps.clone,
    steps.branch,
    steps.template,
    steps.addJson,
    steps.place,
    steps.commit,
    steps.pr,
  ];

  return (
    <div className="w-full">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 py-12"
      >
        <motion.div variants={item} className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        <motion.div
          variants={item}
          className="relative group bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 md:p-8 shadow-lg mx-auto max-w-3xl"
        >
          <ol className="space-y-6 mb-8">
            {stepsList.map((step, index) => (
              <motion.li
                key={index}
                variants={item}
                className="flex items-start gap-4 group/item"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-medium transition-colors group-hover/item:bg-primary/20">
                  {index + 1}
                </span>
                <span className="flex-1 pt-1 text-muted-foreground group-hover/item:text-foreground transition-colors">
                  {step}
                </span>
              </motion.li>
            ))}
          </ol>

          <div className="space-y-6">
            <p className="text-lg text-muted-foreground">{instructions}</p>

            <Button
              asChild
              variant="outline"
              className="group relative overflow-hidden rounded-xl border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg w-full sm:w-auto"
            >
              <a
                href="https://github.com/TechHubs-Global/techhubs-es"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-5"
              >
                <Github className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">{viewOnGitHub}</span>
                <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
