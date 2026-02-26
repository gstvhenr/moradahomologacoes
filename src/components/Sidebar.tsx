import React from 'react';
import { List, KanbanSquare, LogOut, User } from 'lucide-react';

type TabType = 'list' | 'kanban';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  userName?: string;
  userRole?: string;
  onLogout?: () => void;
}

export function Sidebar({ activeTab, onTabChange, userName, userRole, onLogout }: SidebarProps) {
  return (
    <aside className="w-64 bg-slate-800 dark:bg-slate-950 border-r border-slate-700/50 dark:border-slate-800/50 flex flex-col shadow-2xl z-10 text-slate-300 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-64 bg-indigo-400/10 blur-[80px] pointer-events-none" />

      {/* Logo */}
      <div className="p-6 border-b border-slate-700/50 relative z-10">
        <div className="flex items-center text-white font-bold text-xl tracking-tight">
          Homologações Morada
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 relative z-10">
        <NavButton
          active={activeTab === 'list'}
          onClick={() => onTabChange('list')}
          icon={<List className="w-4 h-4" />}
          label="Homologações"
        />
        <NavButton
          active={activeTab === 'kanban'}
          onClick={() => onTabChange('kanban')}
          icon={<KanbanSquare className="w-4 h-4" />}
          label="Tarefas"
        />
      </nav>

      <div className="p-4 border-t border-slate-700/50 dark:border-slate-800/50 relative z-10 space-y-2">
        {userName && (
          <div className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300">
            <div className="w-7 h-7 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <User className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <span className="truncate font-medium text-slate-200">{userName}</span>
          </div>
        )}
        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/30"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        )}
      </div>
    </aside>
  );
}

// Internal sub-component — not exported
function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${active
        ? 'bg-indigo-500/20 text-indigo-200 shadow-inner border border-indigo-500/30'
        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white border border-transparent'
        }`}
    >
      {icon}
      {label}
    </button>
  );
}
