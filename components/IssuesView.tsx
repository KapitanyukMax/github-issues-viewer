'use client';

import React, { useMemo } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import IssuesGroup from './IssuesGroup';
import { IssueInfo } from '@/app/types/github';

export default function IssuesView() {
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 grid-rows-[auto_1fr] w-full gap-x-6 gap-y-2 py-4">
        <div>
          <h2 className="font-bold text-center">ToDo</h2>
        </div>
        <div>
          <h2 className="font-bold text-center">In Progress</h2>
        </div>
        <div>
          <h2 className="font-bold text-center">Done</h2>
        </div>

        <IssuesGroup issueStatus="to-do" />
        <IssuesGroup issueStatus="in-progress" />
        <IssuesGroup issueStatus="done" />
      </div>
    </DndContext>
  );

  function handleDragEnd({ over, active }: DragEndEvent) {
    //console.log(active);
    //setParent(over ? over.id.toString() : null);
  }
}
