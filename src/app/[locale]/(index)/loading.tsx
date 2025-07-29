import { Skeleton } from "@/components/ui/skeleton";
import AddCommunityButton from "./_components/add-community-button";

export default function HomePageLoading() {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col xl:flex-row gap-8 mb-12">
            {/* Map */}
            <div className="w-full xl:w-2/3 relative">
              <Skeleton className="bg-gray-200 dark:bg-card aspect-[4/3] md:aspect-[16/9] xl:aspect-auto xl:h-[600px] w-full" />
            </div>
            {/* Title, description and CTA button */}
            <div className="w-full xl:w-1/3 flex flex-col justify-center">
              <div className="relative space-y-4">
                <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold tracking-tight tech-gradient">
                  Tech Communities in{" "}
                  <span className="bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
                    Spain
                  </span>
                </h1>
                <h2 className="text-lg sm:text-xl text-gray-600 max-w-prose">
                  Discover and connect with tech enthusiasts across the country
                </h2>
                <div className="pt-2">
                  <AddCommunityButton />
                </div>
              </div>
            </div>
          </div>

          {/* Community list */}
          <div className="w-full">
            <div className="rounded-xl shadow-lg p-4 sm:p-6 border dark:bg-card/50 bg-white/80 dark:border-border/50 border-border/20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-[280px] flex flex-col gap-4">
                    <Skeleton className="h-8 w-2/3 mb-2" /> {/* Name */}
                    <Skeleton className="h-4 w-1/3 mb-2" /> {/* Province */}
                    <Skeleton className="h-5 w-1/4 mb-2" /> {/* Category */}
                    <Skeleton className="flex-1 w-full rounded-lg" />{" "}
                    {/* Description */}
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center pt-8">
                <div className="rounded-lg border p-4 flex gap-2 dark:bg-card/30 bg-white dark:border-border/50 border-border/20">
                  {/* Prev button */}
                  <Skeleton className="h-8 w-16" />
                  {/* Page numbers */}
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-8" />
                  ))}
                  {/* Next button */}
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
