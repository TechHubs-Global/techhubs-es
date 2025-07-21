import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Community } from "@/types/community";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Globe, MapPin } from "lucide-react";
import XformerlyTwitter from "@/components/icons/x-formerly-twitter";
import Link from "next/link";

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 10,
    },
  },
};

export function CommunityCard({ community }: { community: Community }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;

    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      whileHover="hover"
      onMouseMove={handleMouseMove}
      className="relative group rounded-xl"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              hsl(var(--primary) / 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <Card className="relative flex flex-col h-full overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <Badge
              variant="outline"
              className="bg-primary/5 hover:bg-primary/10 transition-colors"
            >
              {community.category}
            </Badge>
            <div className="flex items-center gap-1.5">
              {community.website && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg hover:bg-primary/10 transition-colors"
                  asChild
                >
                  <a
                    href={community.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <Globe className="h-4 w-4 transition-transform group-hover:scale-110" />
                  </a>
                </Button>
              )}
              {community.twitter && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg hover:bg-primary/10 transition-colors"
                  asChild
                >
                  <a
                    href={`https://x.com/${community.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <XformerlyTwitter className="h-4 w-4 transition-transform group-hover:scale-110" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 space-y-4">
          <motion.div className="space-y-2" layout>
            <h2 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
              {community.name}
            </h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {community.province}
            </p>
          </motion.div>
          <p className="text-sm text-muted-foreground line-clamp-3 group-hover:text-muted-foreground/80 transition-colors">
            {community.shortDescription}
          </p>
        </CardContent>

        <CardFooter className="mt-auto pt-4">
          <Link
            href={`/community/${community.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <span className="relative">
              View Details
              <span className="absolute inset-x-0 -bottom-0.5 h-[1px] bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
            </span>
            <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
