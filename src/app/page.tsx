'use client';

import React, { useState, useMemo } from 'react';
import { useHomologationTasks } from '@/lib/useHomologationTasks';
import { useCarrierDocuments } from '@/lib/useCarrierDocuments';
import { useThemeToggle } from '@/lib/useThemeToggle';
import { useAuth } from '@/lib/useAuth';
import { HomologationsView } from '@/components/HomologationsView';
import { HomologationsListView } from '@/components/HomologationsListView';
import { HomologationDetail } from '@/components/HomologationDetail';
import { Sidebar } from '@/components/Sidebar';
import { Modal } from '@/components/Modal';
import { NewTaskModal } from '@/components/NewTaskModal';
import { NewDocumentModal } from '@/components/NewDocumentModal';
import { LoginPage } from '@/components/LoginPage';
import { StatusFilter, CompletionFilter } from '@/components/StatusFilter';
import { HomologationStatus } from '@/types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'list' | 'kanban'>('list');
  const { mounted } = useThemeToggle();
  const { tasks, selectedTask, setSelectedTask, updateTask, updateTaskSilent, createTask } = useHomologationTasks();
  const { createDocument } = useCarrierDocuments();
  const { user, error, login, logout, isAuthenticated, isEditor } = useAuth();

  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isNewDocModalOpen, setIsNewDocModalOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<HomologationStatus[]>([]);
  const [selectedCompletionFilters, setSelectedCompletionFilters] = useState<CompletionFilter[]>([]);

  const filteredTasks = useMemo(() => {
    const hasStatusFilter = selectedStatuses.length > 0;
    const hasCompletionFilter = selectedCompletionFilters.length > 0;
    if (!hasStatusFilter && !hasCompletionFilter) return tasks;

    return tasks.filter(task => {
      const statusMatch = !hasStatusFilter || selectedStatuses.includes(task.status);
      const isCompleted = task.completed ?? false;
      const completionMatch = !hasCompletionFilter || (
        (selectedCompletionFilters.includes('completed') && isCompleted) ||
        (selectedCompletionFilters.includes('not-completed') && !isCompleted)
      );
      return statusMatch && completionMatch;
    });
  }, [tasks, selectedStatuses, selectedCompletionFilters]);

  if (!mounted) {
    return <div className="flex h-screen bg-gray-50 items-center justify-center text-gray-500">Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={login} error={error} />;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-brand-50 via-cyan-50 to-accent-50 dark:from-brand-950 dark:via-brand-900 dark:to-brand-950 font-sans selection:bg-brand-200 transition-colors duration-300">

      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userName={user?.name}
        userRole={user?.role}
        onLogout={logout}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col relative">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-cyan-300/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-brand-400/10 blur-[120px] pointer-events-none" />

        {isEditor && (
          <div className="px-6 pt-4 relative z-10">
            <StatusFilter
              selectedStatuses={selectedStatuses}
              onChangeStatuses={setSelectedStatuses}
              selectedCompletionFilters={selectedCompletionFilters}
              onChangeCompletionFilters={setSelectedCompletionFilters}
              tasks={tasks}
            />
          </div>
        )}

        <div className="flex-1 p-6 overflow-y-auto relative z-10">
          {activeTab === 'list' && (
            <HomologationsListView
              tasks={filteredTasks}
              onTaskClick={setSelectedTask}
              onAddTask={isEditor ? () => setIsNewTaskModalOpen(true) : undefined}
              onUpdateTask={isEditor ? updateTaskSilent : undefined}
            />
          )}
          {activeTab === 'kanban' && (
            <HomologationsView
              tasks={filteredTasks}
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
            readOnly={!isEditor}
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
