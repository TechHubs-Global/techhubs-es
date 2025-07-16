'use client';

import { motion } from 'motion/react';
import { Mail, Twitter, Github, ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';

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

const contactLinks = [
  {
    title: 'Email',
    description: 'contact@techhubs.ar',
    href: 'mailto:contact@techhubs.ar',
    icon: Mail,
  },
  {
    title: 'Twitter',
    description: '@techhubsar',
    href: 'https://twitter.com/techhubsar',
    icon: Twitter,
  },
  {
    title: 'GitHub',
    description: 'TechHubsAr/techhubsar',
    href: 'https://github.com/TechHubsAr/techhubsar',
    icon: Github,
  },
];

export default function ContactPage() {
  return (
    <div className='w-full'>
      <motion.div
        variants={container}
        initial='hidden'
        animate='show'
        className='container mx-auto px-4 py-12'
      >
        <motion.div variants={item} className='text-center space-y-4 mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent'>
            Contact Us
          </h1>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Have questions, suggestions, or just want to get in touch? We&apos;d
            love to hear from you!
          </p>
        </motion.div>

        <motion.div
          variants={item}
          className='relative group bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 md:p-8 shadow-lg mx-auto max-w-2xl'
        >
          <div className='relative space-y-8'>
            <div className='grid gap-4'>
              {contactLinks.map((link) => (
                <motion.a
                  key={link.title}
                  variants={item}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={
                    link.href.startsWith('mailto')
                      ? undefined
                      : 'noopener noreferrer'
                  }
                  className={cn(
                    'group/link relative flex items-center gap-4 p-4 md:p-6',
                    'rounded-xl border border-border/50',
                    'bg-background/50 hover:bg-accent/5',
                    'transition-all duration-300',
                    'hover:shadow-lg hover:border-primary/50',
                  )}
                >
                  <div className='p-2 rounded-lg bg-primary/10 text-primary'>
                    <link.icon className='h-5 w-5' />
                  </div>

                  <div className='flex-1'>
                    <h3 className='font-medium text-lg group-hover/link:text-primary transition-colors'>
                      {link.title}
                    </h3>
                    <p className='text-muted-foreground'>{link.description}</p>
                  </div>

                  <ArrowUpRight className='h-5 w-5 text-muted-foreground opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all' />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
