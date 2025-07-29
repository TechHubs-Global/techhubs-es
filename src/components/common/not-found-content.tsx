"use client";

import dynamic from "next/dynamic";
import { Suspense, memo, useMemo } from "react";
import { ArrowLeft, Home } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import { DEFAULT_GLOBE_CONFIG } from "@/components/ui/globe";

const Globe = dynamic(
  () => import("@/components/ui/globe").then((mod) => ({ default: mod.Globe })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full animate-pulse bg-muted/20 rounded-full" />
    ),
  }
);

interface NotFoundContentProps {
  title?: string;
  subtitle?: string;
  description?: string;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
  showHomeButton?: boolean;
  className?: string;
}

const ActionLinks = memo(
  ({
    showBackButton = true,
    backButtonText = "Go Back",
    backButtonHref = "/",
    showHomeButton = true,
  }: Pick<
    NotFoundContentProps,
    "showBackButton" | "backButtonText" | "backButtonHref" | "showHomeButton"
  >) => {
    const t = useTranslations("Common");

    return (
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-8">
        {showBackButton && (
          <Link
            href={backButtonHref}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            />
            {backButtonText}
          </Link>
        )}

        {showHomeButton && (
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border/50 bg-background/80 backdrop-blur-md text-foreground font-medium hover:bg-background/90 hover:border-border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 shadow-lg"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            {t("backToHome")}
          </Link>
        )}
      </div>
    );
  }
);

ActionLinks.displayName = "ActionLinks";

const HelpText = memo(() => {
  const tNav = useTranslations("Navigation");

  return (
    <div className="pt-8">
      <p className="text-sm text-gray-600 drop-shadow-sm">
        Looking for something specific?{" "}
        <Link
          href="/communities"
          className="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary/50 transition-colors"
        >
          {tNav("communities")}
        </Link>{" "}
        or{" "}
        <Link
          href="/contact"
          className="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary/50 transition-colors"
        >
          {tNav("contact")}
        </Link>
        .
      </p>
    </div>
  );
});

HelpText.displayName = "HelpText";

const BackgroundGlobe = memo(() => {
  const globeConfig = useMemo(() => DEFAULT_GLOBE_CONFIG, []);

  return (
    <div className="block inset-0 z-0" role="presentation">
      <div className="absolute bottom-[-100px] md:bottom-[-150px] left-1/2 transform -translate-x-1/2">
        <div className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-40 dark:opacity-25">
          <Suspense
            fallback={
              <div className="w-full h-full animate-pulse bg-muted/10 rounded-full" />
            }
          >
            <Globe className="w-full h-full" config={globeConfig} />
          </Suspense>
        </div>
      </div>
    </div>
  );
});

BackgroundGlobe.displayName = "BackgroundGlobe";

const NotFoundContent = memo(
  ({
    title,
    subtitle,
    description,
    showBackButton,
    backButtonText,
    backButtonHref,
    showHomeButton,
    className,
  }: NotFoundContentProps) => {
    return (
      <div className={className}>
        <BackgroundGlobe />

        <div
          className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/60 z-5"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] container mx-auto px-4 py-8">
          <section
            className="text-center max-w-2xl mx-auto space-y-6"
            aria-labelledby="not-found-title"
          >
            <header className="space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight drop-shadow-sm">
                <span className="text-foreground">{title}</span>
                <span className="bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
                  {" "}
                  {subtitle}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-prose mx-auto drop-shadow-sm">
                {description}
              </p>
            </header>

            <ActionLinks
              showBackButton={showBackButton}
              backButtonText={backButtonText}
              backButtonHref={backButtonHref}
              showHomeButton={showHomeButton}
            />

            <HelpText />
          </section>
        </div>
      </div>
    );
  }
);

NotFoundContent.displayName = "NotFoundContent";

export default NotFoundContent;
export type { NotFoundContentProps };
