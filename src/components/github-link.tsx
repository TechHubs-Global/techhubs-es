import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GitHubLink() {
  return (
    <a
      href='https://github.com/TechHubsAr/techhubsar'
      target='_blank'
      rel='noopener noreferrer'
      className='ml-4'
    >
      <Button variant='ghost' size='icon'>
        <Github className='h-[1.2rem] w-[1.2rem]' />
        <span className='sr-only'>GitHub repository</span>
      </Button>
    </a>
  );
}
