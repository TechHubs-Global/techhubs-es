"use client";

import { motion } from "motion/react";
import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import XformerlyTwitter from "@/components/icons/x-formerly-twitter";
import type { Community } from "@/types/community";

interface CommunityMembersProps {
  members: Community["members"];
}

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function CommunityMembers({ members }: CommunityMembersProps) {
  const sortedMembers = members
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));
  return (
    <motion.section variants={item} className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedMembers.map((member, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="min-h-[142px] group bg-card/50 backdrop-blur-sm border border-border/50 transition-all duration-300 hover:shadow-xl hover:border-primary/50">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  {member.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex gap-2">
                {member.github && (
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    aria-label={`GitHub: ${member.github}`}
                    className="hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <a
                      href={`https://github.com/${member.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {member.twitter && (
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    aria-label={`X: @${member.twitter}`}
                    className="hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <a
                      href={`https://x.com/${member.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <XformerlyTwitter className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {member.linkedin && (
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    aria-label={`LinkedIn: /in/${member.linkedin}`}
                    className="hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <a
                      href={`https://www.linkedin.com/in/${member.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
