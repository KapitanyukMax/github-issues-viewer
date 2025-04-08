import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import { useGitHub } from '@/app/context/GitHubContext';
import IssueView from './IssueView';

interface IssuesGroupProps {
  issueStatus: string;
}

export default function IssuesGroup({ issueStatus }: IssuesGroupProps) {
  const { repoInfo, updateRepoInfo } = useGitHub();
  const filteredIssues = repoInfo?.issues.filter(issue => issue.status === issueStatus);
  const { isOver, setNodeRef } = useDroppable({ id: issueStatus });

  return (
    <div
      ref={setNodeRef}
      className={cn(isOver ? 'opacity-50' : 'opacity-100', 'w-full h-full bg-gray-100 border')}
    >
      {filteredIssues?.map(issue => <IssueView issue={issue} key={issue.number} />)}
    </div>
  );
}
