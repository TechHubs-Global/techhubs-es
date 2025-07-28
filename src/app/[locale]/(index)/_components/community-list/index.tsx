import Link from "next/link";
import { motion } from "motion/react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { cn } from "@/lib/utils";
import type { Community } from "@/types/community";
import { useSearchParams, useRouter } from "next/navigation";
import { CommunityCard } from "./card";

interface PaginatedListProps {
  communities: Community[];
  hoveredCommunityId: string | null;
  itemsPerPage?: number;
}

export default function CommunityList({
  communities,
  hoveredCommunityId,
  itemsPerPage = 6,
}: PaginatedListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;

  const totalPages = Math.ceil(communities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCommunities = communities.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
      router.push("/", { scroll: false });
    } else {
      params.set("page", page.toString());
      router.push(`/?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <div className="space-y-8">
      <motion.ul
        key="community-list"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {currentCommunities.map((community, index) => (
          <motion.li
            key={`page-${currentPage}-${community.slug}-${index}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <Link href={`/community/${community.slug}`}>
              <CommunityCard
                community={community}
                isHovered={hoveredCommunityId === community.slug}
              />
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      {totalPages > 1 && (
        <Pagination className="flex justify-center pt-8">
          <PaginationContent
            className={cn(
              "rounded-lg border p-2",
              "dark:bg-card/30 bg-white",
              "dark:border-border/50 border-border/20"
            )}
          >
            <PaginationItem>
              <PaginationPrevious
                href={
                  currentPage === 1
                    ? "/"
                    : `/?page=${currentPage - 1 === 1 ? "" : currentPage - 1}`
                }
                aria-disabled={currentPage === 1}
                className={cn(
                  "cursor-pointer",
                  currentPage === 1
                    ? "pointer-events-none opacity-50 cursor-not-allowed"
                    : ""
                )}
                onClick={(e) => {
                  if (currentPage > 1) {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }
                }}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href={page === 1 ? "/" : `/?page=${page}`}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href={
                  currentPage < totalPages
                    ? `/?page=${currentPage + 1}`
                    : undefined
                }
                aria-disabled={currentPage === totalPages}
                className={cn(
                  "cursor-pointer",
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50 cursor-not-allowed"
                    : ""
                )}
                onClick={(e) => {
                  if (currentPage < totalPages) {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
