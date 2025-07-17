import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { Community } from "@/types/community";

export function CommunityInfo({ community }: { community: Community }) {
  return (
    <div className="flex items-center justify-between w-full gap-3">
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg font-semibold tracking-tight">
          {community.name}
        </h3>
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {community.province}
        </p>
        <Badge variant="outline" className="w-fit">
          {community.category}
        </Badge>
      </div>
    </div>
  );
}
