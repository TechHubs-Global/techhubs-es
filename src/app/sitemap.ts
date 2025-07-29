import { MetadataRoute } from "next";
import { fetchCommunities } from "@/lib/fetch-communities";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://techhubs.es";
  const currentDate = new Date();
  const communities = fetchCommunities();

  const staticRoutes = [
    {
      path: "",
      priority: 1.0,
      changeFreq: "weekly" as const,
    },
    {
      path: "/communities",
      priority: 0.9,
      changeFreq: "daily" as const,
    },
    {
      path: "/events",
      priority: 0.8,
      changeFreq: "daily" as const,
    },
    {
      path: "/about",
      priority: 0.7,
      changeFreq: "monthly" as const,
    },
    {
      path: "/contact",
      priority: 0.6,
      changeFreq: "monthly" as const,
    },
    {
      path: "/add-community",
      priority: 0.5,
      changeFreq: "monthly" as const,
    },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  sitemapEntries.push({
    url: baseUrl,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 1.0,
    alternates: {
      languages: routing.locales.reduce(
        (acc, locale) => {
          acc[locale] = `${baseUrl}/${locale}`;
          return acc;
        },
        {} as Record<string, string>,
      ),
    },
  });

  routing.locales.forEach((locale) => {
    staticRoutes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: currentDate,
        changeFrequency: route.changeFreq,
        priority: route.priority,
        alternates: {
          languages: routing.locales.reduce(
            (acc, loc) => {
              acc[loc] = `${baseUrl}/${loc}${route.path}`;
              return acc;
            },
            {} as Record<string, string>,
          ),
        },
      });
    });
  });

  routing.locales.forEach((locale) => {
    communities.forEach((community) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/community/${community.slug}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: {
          languages: routing.locales.reduce(
            (acc, loc) => {
              acc[loc] = `${baseUrl}/${loc}/community/${community.slug}`;
              return acc;
            },
            {} as Record<string, string>,
          ),
        },
      });
    });
  });

  return sitemapEntries;
}
