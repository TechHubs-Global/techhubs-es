import type { Community } from '@/types/community';
import communities from '../../public/data/communities.json';

export async function fetchCommunities(): Promise<Community[]> {
  try {
    const data: Community[] = communities;
    return data;
  } catch (error) {
    console.error('Error fetching communities:', error);
    return [];
  }
}

export async function fetchCommunityBySlug(
  slug: string,
): Promise<Community | null> {
  if (!slug) {
    console.error('Error: slug is undefined or empty');
    return null;
  }

  try {
    const data: Community[] = communities;
    const community = data.find((c) => c.slug === slug);
    
    if (!community) {
      console.error(
        `Error: Community with slug ${slug} not found`,
      );
      return null;
    }

    return community;
  } catch (error) {
    console.error(`Error fetching community with slug ${slug}:`, error);
    return null;
  }
}
