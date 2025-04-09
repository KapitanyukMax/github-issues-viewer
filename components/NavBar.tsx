'use client';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

interface NavBarProps {
  owner: string;
  repo: string;
  stars: string;
}

export default function NavBar({ owner, repo, stars }: NavBarProps) {
  const ownerUrl = `https://github.com/${owner}`;
  const repoUrl = `https://github.com/${owner}/${repo}`;

  const router = useRouter();
  const navigateToUrl = (url: string) => {
    router.push(url);
  };
  return (
    <div className="flex flex-row gap-6 items-baseline pt-2 pb-4">
      <nav className="flex flex-row gap-2 items-baseline">
        <Button
          variant="link"
          className="text-blue-400 p-0 hover:no-underline hover:cursor-pointer hover:text-blue-500"
          onClick={() => navigateToUrl(ownerUrl)}
        >
          {owner}
        </Button>
        <span className="text-blue-400">&gt;</span>
        <Button
          variant="link"
          className="text-blue-400 p-0 hover:no-underline hover:cursor-pointer hover:text-blue-500"
          onClick={() => navigateToUrl(repoUrl)}
        >
          {repo}
        </Button>
      </nav>
      <span>⭐{stars} stars</span>
    </div>
  );
}
