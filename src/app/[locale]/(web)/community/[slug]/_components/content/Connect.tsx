"use client";

import { motion } from "motion/react";
import { Globe, MessageCircle, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import XformerlyTwitter from "@/components/icons/x-formerly-twitter";

interface CommunityConnectProps {
  website?: string;
  twitter?: string;
  whatsapp?: string;
  telegram?: string;
  discord?: string;
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function CommunityConnect({
  website,
  twitter,
  whatsapp,
  telegram,
  discord,
}: CommunityConnectProps) {
  return (
    <motion.section variants={item} className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Connect</h2>
      <div className="grid grid-cols-2 gap-3">
        {website && (
          <Button
            asChild
            variant="outline"
            className="w-full group hover:border-primary/50 transition-all"
          >
            <a href={website} target="_blank" rel="noopener noreferrer">
              <Globe className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
              Website
            </a>
          </Button>
        )}
        {twitter && (
          <Button
            asChild
            variant="outline"
            className="w-full group hover:border-primary/50 transition-all"
          >
            <a
              href={`https://twitter.com/${twitter}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <XformerlyTwitter className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
              X (Twitter)
            </a>
          </Button>
        )}
        {whatsapp && (
          <Button
            asChild
            variant="outline"
            className="w-full group hover:border-primary/50 transition-all"
          >
            <a href={whatsapp} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
              Whatsapp
            </a>
          </Button>
        )}
        {telegram && (
          <Button
            asChild
            variant="outline"
            className="w-full group hover:border-primary/50 transition-all"
          >
            <a href={telegram} target="_blank" rel="noopener noreferrer">
              <Send className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
              Telegram
            </a>
          </Button>
        )}
        {discord && (
          <Button
            asChild
            variant="outline"
            className="w-full group hover:border-primary/50 transition-all"
          >
            <a href={discord} target="_blank" rel="noopener noreferrer">
              <MessageSquare className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
              Discord
            </a>
          </Button>
        )}
      </div>
    </motion.section>
  );
}
