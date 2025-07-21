"use client";

import Image from "next/image";
import { memo } from "react";
import { motion, type Variants } from "motion/react";

interface HeroSectionProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  primaryImageSrc: string;
  secondaryImageSrc: string;
  reverseLayout?: boolean;
}

const HeroSection = memo(
  ({
    title,
    description,
    primaryImageSrc,
    secondaryImageSrc,
    reverseLayout = false,
  }: HeroSectionProps) => {
    const containerVariants: Variants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.2,
        },
      },
    };

    const itemVariants: Variants = {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
      },
    };

    const layoutClasses = reverseLayout
      ? "md:grid-cols-2 md:grid-flow-col-dense"
      : "md:grid-cols-2";

    const textOrderClass = reverseLayout ? "md:col-start-2" : "";
    const imageOrderClass = reverseLayout ? "md:col-start-1" : "";

    return (
      <section className="relative overflow-hidden">
        <div className="container max-w-[1220px] w-full px-6 md:px-10 relative z-10 mx-auto">
          <motion.div
            className={`grid grid-cols-1 gap-16 md:gap-8 w-full items-center ${layoutClasses}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Text Content */}
            <motion.div
              className={`flex flex-col items-start gap-4 mt-10 md:mt-0 max-w-[546px] mx-auto md:mx-0 ${textOrderClass}`}
              variants={itemVariants}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="space-y-2 md:space-y-1">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
                  {title}
                </h2>
              </div>

              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                {description}
              </p>
            </motion.div>

            <motion.div
              className={`relative mt-10 md:mt-0 mx-auto ${imageOrderClass} w-full max-w-[300px] md:max-w-[471px]`}
              variants={itemVariants}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {/* Background secondary image */}
              <motion.div
                className={`absolute w-[300px] h-[317px] md:w-[472px] md:h-[500px] bg-muted/30 rounded-[32px] z-0`}
                style={{
                  top: reverseLayout ? "auto" : "10%",
                  bottom: reverseLayout ? "10%" : "auto",
                  left: reverseLayout ? "auto" : "-20%",
                  right: reverseLayout ? "-20%" : "auto",
                  transform: reverseLayout
                    ? "translate(0, 0)"
                    : "translateY(10%)",
                  filter: "blur(2px)",
                }}
                initial={{ y: reverseLayout ? 0 : 0 }}
                whileInView={{ y: reverseLayout ? -20 : -30 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <Image
                  src={secondaryImageSrc}
                  alt="Luma events"
                  fill
                  className="w-full h-full object-cover rounded-[32px]"
                />
              </motion.div>

              {/* Main image */}
              <motion.div
                className="relative w-full h-[405px] md:h-[637px] bg-card/10 rounded-[32px] backdrop-blur-[15px] backdrop-brightness-[100%] border-0 z-10 overflow-hidden"
                initial={{ y: reverseLayout ? 0 : 0 }}
                whileInView={{ y: reverseLayout ? 20 : 30 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className="p-0 h-full">
                  <div
                    className="h-full relative"
                    style={{
                      backgroundSize: "100% 100%",
                    }}
                  >
                    <Image
                      src={primaryImageSrc}
                      alt="Luma events"
                      fill
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  },
);

HeroSection.displayName = "HeroSection";

export { HeroSection };
