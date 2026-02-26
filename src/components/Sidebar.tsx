import React from 'react';
import { List, KanbanSquare, Moon, Sun } from 'lucide-react';

type TabType = 'list' | 'kanban';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Sidebar({ activeTab, onTabChange, theme, onToggleTheme }: SidebarProps) {
  return (
    <aside className="w-64 bg-slate-800 dark:bg-slate-950 border-r border-slate-700/50 dark:border-slate-800/50 flex flex-col shadow-2xl z-10 text-slate-300 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-64 bg-indigo-400/10 blur-[80px] pointer-events-none" />

      {/* Logo */}
      <div className="p-6 border-b border-slate-700/50 relative z-10">
        <div className="flex items-center text-white font-bold text-xl tracking-tight">
          Inf. Cadastrais Morada
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

      {/* Theme Toggle */}
      <div className="p-4 border-t border-slate-700/50 dark:border-slate-800/50 relative z-10">
        <button
          onClick={onToggleTheme}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 hover:text-white border border-slate-600/30"
        >
          <div className="flex items-center gap-3">
            {theme === 'dark' ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
            <span>{theme === 'dark' ? 'Modo Escuro' : 'Modo Claro'}</span>
          </div>
          <div className="w-8 h-4 bg-slate-900 rounded-full relative shadow-inner">
            <div className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full transition-transform duration-300 ${theme === 'dark' ? 'translate-x-4 bg-indigo-500' : 'translate-x-0 bg-slate-400'}`} />
          </div>
        </button>
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
