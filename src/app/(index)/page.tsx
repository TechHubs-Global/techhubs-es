import { fetchCommunities } from "@/lib/fetch-communities";
import ClientPage from "./page.client";

const communities = fetchCommunities();

export default function HomePage() {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-4">
        <ClientPage communities={communities} />
      </div>
    </div>
  );
}
