import { useState } from 'react';
import { 
  Activity, 
  CheckCircle, 
  Clock, 
  Terminal, 
  Cpu, 
  Filter, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import { ActivityEvent, AgentStage } from '../types';

interface AgentActivityPanelProps {
  events: ActivityEvent[];
  activeStage?: AgentStage;
}

export function AgentActivityPanel({ events, activeStage }: AgentActivityPanelProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const getStageColor = (stage: AgentStage, status?: string) => {
    if (status === 'alert' || status === 'failed') {
      return 'bg-red-50 text-red-700 border-red-300';
    }
    switch (stage) {
      case 'GOAL':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'OBSERVE':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'DECIDE':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'PLAN':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'ACT':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'VERIFY':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'ADAPT':
      case 'REPLAN':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'OUTCOME':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const filters = ['ALL', 'GOAL', 'OBSERVE', 'DECIDE', 'PLAN', 'ACT', 'ADAPT', 'REPLAN', 'VERIFY', 'OUTCOME'];

  const filteredEvents = selectedFilter === 'ALL'
    ? events
    : events.filter(e => e.stage === selectedFilter);

  return (
    <div 
      id="agent-activity-panel"
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
    >
      {/* Header Bar */}
      <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold tracking-tight text-white">
                Agent Activity Stream
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded">
                LIVE LOG
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Autonomous cognitive deliberation &amp; dispatch execution events
            </p>
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1 overflow-x-auto text-xs pb-1 sm:pb-0 max-w-full">
          <Filter className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
          {filters.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedFilter(st)}
              className={`px-2 py-1 rounded text-[11px] font-mono font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedFilter === st
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Timeline List */}
      <div className="p-6 divide-y divide-slate-100">
        {filteredEvents.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-sm font-mono">
            No events logged for stage filter: {selectedFilter}
          </div>
        ) : (
          filteredEvents.map((evt, index) => {
            const isAlert = evt.status === 'alert' || evt.status === 'failed';
            return (
              <div 
                key={evt.id} 
                id={`activity-event-${evt.id}`}
                className={`py-4.5 first:pt-0 last:pb-0 transition-colors ${
                  isAlert 
                    ? 'bg-red-50/50 -mx-6 px-6 rounded-lg' 
                    : activeStage === evt.stage 
                    ? 'bg-blue-50/30 -mx-6 px-6 rounded-lg' 
                    : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Timeline bullet / Step icon */}
                  <div className="flex flex-col items-center mt-1">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[11px] font-bold border ${getStageColor(evt.stage, evt.status)}`}>
                      {isAlert ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                      ) : (
                        index + 1
                      )}
                    </span>
                    {index < filteredEvents.length - 1 && (
                      <div className="w-0.5 h-8 bg-slate-200 mt-1"></div>
                    )}
                  </div>

                  {/* Main Event Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* STAGE BADGE */}
                        <span className={`px-2 py-0.5 rounded font-mono text-xs font-bold border ${getStageColor(evt.stage, evt.status)}`}>
                          {evt.stage}
                        </span>
                        <h4 className={`text-sm font-bold tracking-tight ${
                          isAlert ? 'text-red-900 font-mono' : 'text-slate-900'
                        }`}>
                          {evt.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-mono text-slate-400 shrink-0">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {evt.timestamp}
                        </span>
                        {evt.confidence && (
                          <span className={`px-1.5 py-0.5 rounded border text-[10px] ${
                            isAlert 
                              ? 'text-red-700 bg-red-50 border-red-200' 
                              : 'text-emerald-700 bg-emerald-50 border-emerald-100'
                          }`}>
                            {(evt.confidence * 100).toFixed(0)}% CONF
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description Paragraph */}
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      {evt.description}
                    </p>

                    {/* Operational Details Badge */}
                    {evt.detail && (
                      <div className={`mt-2.5 p-2 rounded-md text-[11px] font-mono flex items-center gap-2 border ${
                        isAlert 
                          ? 'bg-red-100/70 border-red-200 text-red-900' 
                          : 'bg-slate-50 border-slate-200/80 text-slate-700'
                      }`}>
                        <Terminal className={`w-3.5 h-3.5 shrink-0 ${isAlert ? 'text-red-600' : 'text-blue-500'}`} />
                        <span className="truncate">{evt.detail}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer telemetry */}
      <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500">
        <span className="font-mono">Total Recorded Events: {events.length}</span>
        <span className="flex items-center gap-1 text-slate-600 font-mono">
          <Cpu className="w-3.5 h-3.5 text-blue-600" />
          Autonomous Dispatch Latency: ~180ms
        </span>
      </div>
    </div>
  );
}
