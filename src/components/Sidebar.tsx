import type { ComponentType } from 'react';
import { LayoutDashboard, Activity, ShieldCheck, Cpu, AlertTriangle, Radio } from 'lucide-react';
import { NavSection } from '../types';

interface SidebarProps {
  currentSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  activeStage: string;
}

export function Sidebar({ currentSection, onSelectSection, activeStage }: SidebarProps) {
  const navItems: { id: NavSection; label: string; number: string; icon: ComponentType<{ className?: string }> }[] = [
    { id: 'command-center', label: 'Command Center', number: '01', icon: LayoutDashboard },
    { id: 'agent-activity', label: 'Agent Activity', number: '02', icon: Activity },
    { id: 'resources', label: 'Resources', number: '03', icon: ShieldCheck },
    { id: 'architecture', label: 'Architecture', number: '04', icon: Cpu },
  ];

  return (
    <aside 
      id="main-sidebar" 
      className="w-full md:w-64 bg-slate-950 border-r border-slate-800 text-slate-200 flex flex-col justify-between shrink-0"
    >
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 ring-1 ring-blue-400/40">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-white text-lg">CrisisPilot</span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide font-mono">EMERGENCY OPS AGENT</p>
            </div>
          </div>
        </div>

        {/* Prototype Banner */}
        <div className="mx-3 my-3 p-2.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>Hackathon Demo Prototype • Standalone Local Mode</span>
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1.5" aria-label="Sidebar Navigation">
          <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Operations Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => onSelectSection(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 ring-1 ring-blue-400/30'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                <span className={`text-[11px] font-mono ${isActive ? 'text-blue-200' : 'text-slate-400'}`}>
                  {item.number}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Autonomous Agent Status Widget */}
      <div className="p-4 m-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 font-mono text-[11px]">ACTIVE AGENT STATE</span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            ACTIVE
          </span>
        </div>
        <div className="font-mono text-sm font-semibold text-blue-400 bg-slate-950 px-2.5 py-1.5 rounded border border-slate-800 flex items-center justify-between">
          <span>{activeStage}</span>
          <span className="text-[10px] text-slate-400">STAGE</span>
        </div>
        <p className="mt-2 text-[11px] text-slate-400 leading-relaxed">
          Zero-delay local simulation running for Flood Zone A coordinate perimeter.
        </p>
      </div>
    </aside>
  );
}
