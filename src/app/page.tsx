'use client';

import React, { useState } from 'react';
import { useHomologationTasks } from '@/lib/useHomologationTasks';
import { useCarrierDocuments } from '@/lib/useCarrierDocuments';
import { useThemeToggle } from '@/lib/useThemeToggle';
import { HomologationsView } from '@/components/HomologationsView';
import { HomologationsListView } from '@/components/HomologationsListView';
import { HomologationDetail } from '@/components/HomologationDetail';
import { Sidebar } from '@/components/Sidebar';
import { Modal } from '@/components/Modal';
import { NewTaskModal } from '@/components/NewTaskModal';
import { NewDocumentModal } from '@/components/NewDocumentModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'list' | 'kanban'>('list');
  const { theme, mounted, toggleTheme } = useThemeToggle();
  const { tasks, selectedTask, setSelectedTask, updateTask, createTask } = useHomologationTasks();
  const { createDocument } = useCarrierDocuments();

  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isNewDocModalOpen, setIsNewDocModalOpen] = useState(false);

  if (!mounted) {
    return <div className="flex h-screen bg-gray-50 items-center justify-center text-gray-500">Carregando...</div>;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-100 via-slate-50 to-blue-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 font-sans selection:bg-indigo-200 transition-colors duration-300">

      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col relative">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-400/10 blur-[120px] pointer-events-none" />

        <div className="flex-1 p-6 overflow-y-auto relative z-10">
          {activeTab === 'list' && (
            <HomologationsListView
              tasks={tasks}
              onTaskClick={setSelectedTask}
              onAddTask={() => setIsNewTaskModalOpen(true)}
            />
          )}
          {activeTab === 'kanban' && (
            <HomologationsView
              tasks={tasks}
              onTaskClick={setSelectedTask}
            />
          )}
        </div>
      </main>

      {/* Task Detail Modal */}
      <Modal
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        title={selectedTask?.clientName || 'Detalhes da Homologação'}
        size="xl"
      >
        {selectedTask && (
          <HomologationDetail
            task={selectedTask}
            onUpdate={updateTask}
          />
        )}
      </Modal>

      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        onCreateTask={(clientName) => {
          createTask(clientName);
          setIsNewTaskModalOpen(false);
        }}
      />

      <NewDocumentModal
        isOpen={isNewDocModalOpen}
        onClose={() => setIsNewDocModalOpen(false)}
        onCreateDocument={(data) => {
          createDocument(data);
          setIsNewDocModalOpen(false);
        }}
      />
    </div>
  );
}
