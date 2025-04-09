import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { IssueInfo } from '@/app/types/github';
import { getIssueStateInfo } from '@/app/utils/getRepoInfo';

interface IssueViewProps {
  issue: IssueInfo;
}

export default function IssueView({ issue }: IssueViewProps) {
  const { attributes, listeners, isDragging, setNodeRef } = useDraggable({
    id: issue.number.toString(),
  });

  if (isDragging) return null;
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="flex flex-col bg-white rounded-md p-4 hover:cursor-pointer"
    >
      <h3 className="text-nowrap overflow-hidden text-ellipsis">{issue.title}</h3>
      <p className="text-gray-500">
        #{issue.number} {getIssueStateInfo(issue)}
      </p>
      <p className="text-gray-500">
        {issue.user.login} | Comments: {issue.comments}
      </p>
    </div>
  );
}
