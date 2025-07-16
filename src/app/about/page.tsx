'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Github } from 'lucide-react';

import { Button } from '@/components/ui/button';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <div className='min-h-screen w-full overflow-hidden'>
      <motion.div
        variants={container}
        initial='hidden'
        animate='show'
        className='container mx-auto px-4 py-16 max-w-4xl space-y-12'
      >
        <motion.div variants={item} className='text-center space-y-4'>
          <h1 className='text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent'>
            About TechHubsAr
          </h1>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Connecting and empowering tech communities across Spain
          </p>
        </motion.div>

        <motion.div
          variants={item}
          className='bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 md:p-8 shadow-lg'
        >
          <div className='space-y-8'>
            <div className='space-y-6'>
              <p className='text-lg text-muted-foreground leading-relaxed'>
                TechHubsAr is a community-driven project aimed at showcasing and
                connecting tech communities across Spain. Our mission is to
                foster collaboration, knowledge sharing, and growth within the
                Spanish tech ecosystem.
              </p>
              <p className='text-lg text-muted-foreground leading-relaxed'>
                We believe in the power of local tech communities to drive
                innovation, create opportunities, and shape the future of
                technology in Spain.
              </p>
            </div>

            <div className='space-y-6'>
              <h2 className='text-2xl font-semibold tracking-tight'>
                Our Goals
              </h2>
              <ul className='grid gap-4'>
                {[
                  'Showcase diverse tech communities across Spain',
                  'Facilitate connections between tech enthusiasts, professionals, and communities',
                  'Promote knowledge sharing and collaboration within the tech ecosystem',
                  'Support the growth and development of local tech initiatives',
                ].map((goal, index) => (
                  <motion.li
                    key={index}
                    variants={item}
                    className='flex items-start gap-4 group'
                  >
                    <span className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold transition-colors group-hover:bg-primary/20'>
                      {index + 1}
                    </span>
                    <span className='flex-1 pt-1 text-muted-foreground group-hover:text-foreground transition-colors'>
                      {goal}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className='space-y-6'>
              <h2 className='text-2xl font-semibold tracking-tight'>
                Get Involved
              </h2>
              <p className='text-lg text-muted-foreground leading-relaxed'>
                TechHubs is an open-source project, and we welcome
                contributions from the community. Whether you want to add your
                tech community, improve our platform, or share your ideas, we&apos;d
                love to hear from you!
              </p>
              <div className='flex flex-col sm:flex-row gap-4'>
                <Button
                  asChild
                  className='bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:opacity-90 transition-opacity'
                >
                  <Link href='/add-community'>Add your community</Link>
                </Button>
                <Button
                  asChild
                  variant='outline'
                  className='group hover:border-primary/50 transition-colors'
                >
                  <a
                    href='https://github.com/TechHubsAr/techhubsar'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2'
                  >
                    <Github className='h-4 w-4 group-hover:scale-110 transition-transform' />
                    Contribute on GitHub
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
