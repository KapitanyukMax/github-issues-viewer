'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import { loadRepoInfo } from '@/lib/store/github';
import IssueView from './IssueView';
import LoadingCircle from './LoadingCircle';
import { AppDispatch, RootState } from '@/lib/store';

interface IssuesGroupProps {
  issueStatus: string;
  loadable?: boolean;
}

export default function IssuesGroup({ issueStatus, loadable }: IssuesGroupProps) {
  const { repoInfo, loading } = useSelector((state: RootState) => state.github);
  const dispatch = useDispatch<AppDispatch>();

  const filteredIssues = repoInfo?.issues.filter(issue => issue.status === issueStatus);
  const { isOver, setNodeRef } = useDroppable({ id: issueStatus });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.target as HTMLDivElement;
    if (!el) return;

    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 500;

    if (nearBottom && repoInfo) {
      dispatch(loadRepoInfo(repoInfo.owner, repoInfo.repo, true));
    }
  };

  const displayedIssues = filteredIssues?.map(issue => (
    <IssueView issue={issue} key={issue.number} />
  ));

  return (
    <div
      ref={setNodeRef}
      onScroll={loadable ? handleScroll : undefined}
      className={cn(
        isOver ? 'bg-green-100' : 'bg-gray-100',
        'w-full h-full  border overflow-y-auto flex flex-col gap-4 p-4'
      )}
    >
      {displayedIssues}
      {loadable && loading && <LoadingCircle />}
    </div>
  );
}
