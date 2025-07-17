import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import XformerlyTwitter from "@/components/icons/x-formerly-twitter";
import { Community } from "@/types/community";

export function CommunityDescription({ community }: { community: Community }) {
  return (
    <div className="h-full bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 p-4 flex flex-col justify-between">
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
        {community.shortDescription}
      </p>
      <div className="flex justify-end space-x-2 pt-2">
        {community.website && (
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-accent/10"
            aria-label="Website"
            onClick={(e) => {
              e.preventDefault();
              window.open(community.website, "_blank", "noopener,noreferrer");
            }}
          >
            <Globe className="h-4 w-4" />
          </Button>
        )}
        {community.twitter && (
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-accent/10"
            aria-label="Twitter"
            onClick={(e) => {
              e.preventDefault();
              window.open(
                `https://x.com/${community.twitter}`,
                "_blank",
                "noopener,noreferrer"
              );
            }}
          >
            <XformerlyTwitter className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
