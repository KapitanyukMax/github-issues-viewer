'use client';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

interface NavBarProps {
  owner: string;
  repo: string;
  stars: number;
}

export default function NavBar({ owner, repo, stars }: NavBarProps) {
  const ownerUrl = `https://github.com/${owner}`;
  const repoUrl = `https://github.com/${owner}/${repo}`;

  const router = useRouter();
  const navigateToUrl = (url: string) => {
    router.push(url);
  };
  return (
    <div className="flex flex-row gap-8 align-baseline">
      <nav className="flex flex-row align-baseline">
        <Button
          variant="link"
          className="text-blue-400 hover:no-underline"
          onClick={() => navigateToUrl(ownerUrl)}
        >
          {owner}
        </Button>
        <span className="text-blue-400">&gt;</span>
        <Button
          variant="link"
          className="text-blue-400 hover:no-underline"
          onClick={() => navigateToUrl(repoUrl)}
        >
          {repo}
        </Button>
      </nav>
      <span>{stars}</span>
    </div>
  );
}
