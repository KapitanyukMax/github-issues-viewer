import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { IssueInfo } from '@/app/types/github';

interface IssueViewProps {
  issue: IssueInfo;
}

export default function IssueView({ issue }: IssueViewProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: issue.number });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="hover:cursor-pointer"
    >
      Issue
    </div>
  );
}
