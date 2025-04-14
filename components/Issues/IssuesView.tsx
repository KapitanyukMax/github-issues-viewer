'use client';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndContext, DragOverlay, DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { AppDispatch, RootState } from '@/store';
import { updateIssueStatus } from '@/store/github';
import IssuesGroup from './IssuesGroup';
import { IssueStatus } from '@/types/ui/github';
import IssueView from './IssueView';

export default function IssuesView() {
  const dispatch = useDispatch<AppDispatch>();
  const repoInfo = useSelector((state: RootState) => state.github.repoInfo);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  let draggedIssue;

  const handleDragStart = (event: DragStartEvent) => {
    setDraggedId(event.active.id as string);
  };

  function handleDragEnd({ over, active }: DragEndEvent) {
    if (!repoInfo) return;

    const index = repoInfo.issues.findIndex(
      issue => issue.number.toString() === active.id.toString()
    );
    if (index === -1) return;

    dispatch(updateIssueStatus(index, over?.id as IssueStatus));
    setDraggedId(null);
  }

  const getIssueById = (draggedId: string) =>
    repoInfo?.issues.find(issue => issue.number.toString() === draggedId);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 grid-rows-[auto_1fr] w-full h-full gap-x-6 gap-y-2 py-4">
        <div>
          <h2 className="font-bold text-center">ToDo</h2>
        </div>
        <div>
          <h2 className="font-bold text-center">In Progress</h2>
        </div>
        <div>
          <h2 className="font-bold text-center">Done</h2>
        </div>

        <IssuesGroup issueStatus="to-do" loadable />
        <IssuesGroup issueStatus="in-progress" />
        <IssuesGroup issueStatus="done" />
      </div>

      <DragOverlay>
        {draggedId && (draggedIssue = getIssueById(draggedId)) && (
          <IssueView issue={draggedIssue} />
        )}
      </DragOverlay>
    </DndContext>
  );
}
