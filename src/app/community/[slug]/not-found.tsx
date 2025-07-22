import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] container mx-auto px-4 py-8 text-center">
      <div className="mb-4">
        <AlertCircle className="mx-auto h-16 w-16 text-red-400" />
      </div>
      <div className="text-2xl font-bold text-red-500 mb-2">
        Community not found
      </div>
      <div className="text-muted-foreground mb-6">
        The community you are looking for does not exist or has been deleted.
      </div>
      <a
        href="/communities"
        className="inline-block px-6 py-2 rounded bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
      >
        Back to community list
      </a>
    </div>
  );
}
