import { defineRouting } from "next-intl/routing";

export type Locale = (typeof routing.locales)[number];

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
});
