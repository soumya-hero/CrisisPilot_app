import { useState } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  Clock, 
  Terminal, 
  Cpu, 
  Filter, 
  Search,
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  Database, 
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  ListFilter,
  FileText,
  Code
} from 'lucide-react';
import { ActivityEvent, AgentStage, SimulationStep } from '../types';
import { DEMO_STEPS, StepDefinition } from '../data/mockData';

interface AgentActivityPageProps {
  events: ActivityEvent[];
  currentStepIndex: number;
  currentStepDef: StepDefinition;
  isRunningDemo: boolean;
  onToggleRunDemo: () => void;
  onInjectFailure: () => void;
  onNextStep: () => void;
  onReset: () => void;
}

export function AgentActivityPage({
  events,
  currentStepIndex,
  currentStepDef,
  isRunningDemo,
  onToggleRunDemo,
  onInjectFailure,
  onNextStep,
  onReset
}: AgentActivityPageProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'timeline' | 'table' | 'raw'>('timeline');

  // Toggle individual card expansion
  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Build the complete chronological log including historical and future simulated steps
  const chronologicalLog = DEMO_STEPS.map((stepDef, idx) => {
    const isPast = idx < currentStepIndex;
    const isCurrent = idx === currentStepIndex;
    const isFuture = idx > currentStepIndex;

    // Derived status
    let status: ActivityEvent['status'] = isFuture ? 'pending' : (isCurrent ? (stepDef.event.status || 'in-progress') : 'completed');
    if (stepDef.isFailureAlert && (isCurrent || isPast)) {
      status = 'alert';
    }

    return {
      id: `step-${idx + 1}`,
      stepNumber: idx + 1,
      stepKey: stepDef.step,
      stage: stepDef.stage,
      label: stepDef.label,
      sublabel: stepDef.sublabel,
      timestamp: isFuture ? '--:--:--' : `10:42:${String(idx * 12 + 1).padStart(2, '0')}`,
      title: stepDef.event.title,
      description: stepDef.event.description,
      detail: stepDef.event.detail,
      confidence: stepDef.event.confidence,
      status,
      actionType: stepDef.event.actionType || 'COGNITIVE_STEP',
      toolUsed: stepDef.event.toolUsed || 'Crisis Orchestrator',
      inputData: stepDef.event.inputData || '{}',
      outputData: stepDef.event.outputData || '{}',
      rationale: stepDef.event.rationale || 'Deterministic step executed according to autonomous mission policy.',
      isCurrent,
      isPast,
      isFuture
    };
  });

  // Filter logic
  const filteredSteps = chronologicalLog.filter(step => {
    // Filter by stage
    if (selectedFilter !== 'ALL' && step.stage !== selectedFilter) {
      return false;
    }
    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = 
        step.title.toLowerCase().includes(q) ||
        step.description.toLowerCase().includes(q) ||
        step.toolUsed.toLowerCase().includes(q) ||
        step.actionType.toLowerCase().includes(q) ||
        step.rationale.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Copy full audit log to clipboard
  const handleCopyLog = () => {
    const markdown = chronologicalLog.map(s => (
`### [Step ${s.stepNumber}] [${s.timestamp}] ${s.stage} - ${s.title}
- **Action Type**: ${s.actionType}
- **Tool Invoked**: ${s.toolUsed}
- **Status**: ${s.status.toUpperCase()} (Confidence: ${Math.round((s.confidence || 1) * 100)}%)
- **Rationale**: ${s.rationale}
- **Input**: ${s.inputData}
- **Output**: ${s.outputData}
`
    )).join('\n---\n\n');

    navigator.clipboard.writeText(
`# CrisisPilot Autonomous Agent - Complete Chronological Decision & Action Log
Generated: ${new Date().toISOString()}
Mission: Protect residents in Flood Zone A
Total Steps: ${DEMO_STEPS.length}
Verification: 5/5 PASSED

${markdown}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const stagesList = ['ALL', 'GOAL', 'OBSERVE', 'DECIDE', 'PLAN', 'ACT', 'ADAPT', 'REPLAN', 'VERIFY', 'OUTCOME'];

  return (
    <div id="agent-activity-page" className="space-y-6">
      {/* Top Banner with Real-Time Counters */}
      <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[11px] font-mono font-bold bg-blue-900/80 text-blue-300 border border-blue-700/60 rounded">
              DECISION &amp; ACTION AUDIT LOG
            </span>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              CHRONOLOGICAL RECORDER ACTIVE
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white mt-1.5">
            Agent Activity &amp; Deliberation Log
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Complete chronological record of all autonomous OODA decisions, tool invocations, real-time sensor perceptions, failure detection events, and adaptive replanning solutions.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onToggleRunDemo}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold font-mono flex items-center gap-2 shadow-sm transition-all cursor-pointer ${
              isRunningDemo 
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isRunningDemo ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunningDemo ? 'PAUSE DEMO' : 'RUN DEMO'}
          </button>

          <button
            onClick={onNextStep}
            disabled={currentStepIndex >= DEMO_STEPS.length - 1}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold border border-slate-700 flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
            title="Advance one step"
          >
            <SkipForward className="w-3.5 h-3.5" />
            STEP
          </button>

          <button
            onClick={onInjectFailure}
            className="px-3 py-2 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 text-xs font-mono font-bold border border-red-800/80 flex items-center gap-1.5 cursor-pointer"
            title="Simulate Route R1 Blocked"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            INJECT FAILURE
          </button>

          <button
            onClick={handleCopyLog}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold border border-slate-700 flex items-center gap-1.5 cursor-pointer"
            title="Copy audit log to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'COPIED!' : 'EXPORT LOG'}
          </button>
        </div>
      </div>

      {/* Audit Telemetry Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Total Sequence Steps</span>
          <span className="text-xl font-black text-slate-900">{DEMO_STEPS.length} Total</span>
          <span className="text-[11px] text-blue-600 block mt-0.5">
            Step {currentStepIndex + 1} Active
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Current Stage</span>
          <span className="text-xl font-black text-blue-700">{currentStepDef.stage}</span>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            {currentStepDef.sublabel}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Tool Invocations</span>
          <span className="text-xl font-black text-slate-900">6 Services</span>
          <span className="text-[11px] text-emerald-600 block mt-0.5">
            Weather, Route, Shelter, CAD
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Fault Recovery</span>
          <span className="text-xl font-black text-purple-700">1 Adaptation</span>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            {currentStepDef.routeR1Blocked ? 'Route R1 Blocked → R3' : 'Monitoring Corridors'}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Verification Status</span>
          <span className="text-xl font-black text-emerald-600">5/5 Passed</span>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            100% Policy Compliance
          </span>
        </div>
      </div>

      {/* Main Log Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Controls Toolbar: Search, Filters, Tab Toggles */}
        <div className="p-4 bg-slate-900 text-white border-b border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Search Field */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search decisions, tool calls, keywords (e.g. Route R1, Team 4)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* View Mode Tabs */}
          <div className="flex items-center gap-1.5 shrink-0 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'timeline'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              Chronological Timeline
            </button>

            <button
              onClick={() => setActiveTab('table')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'table'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              Structured Table
            </button>

            <button
              onClick={() => setActiveTab('raw')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'raw'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              JSON Stream
            </button>
          </div>
        </div>

        {/* Stage Filter Chips */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-[11px] font-mono text-slate-400 font-semibold mr-1 shrink-0">
            FILTER STAGE:
          </span>
          {stagesList.map((stage) => (
            <button
              key={stage}
              onClick={() => setSelectedFilter(stage)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedFilter === stage
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {stage}
            </button>
          ))}
          {selectedFilter !== 'ALL' && (
            <button
              onClick={() => setSelectedFilter('ALL')}
              className="text-xs text-blue-600 hover:underline ml-2 font-medium shrink-0 cursor-pointer"
            >
              Reset filter
            </button>
          )}
        </div>

        {/* TAB 1: CHRONOLOGICAL TIMELINE VIEW */}
        {activeTab === 'timeline' && (
          <div className="divide-y divide-slate-100 p-6 space-y-4">
            {filteredSteps.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                No decisions or actions match the current filter or search criteria.
              </div>
            ) : (
              filteredSteps.map((step) => {
                const isExpanded = !!expandedItems[step.id];
                const isFailure = step.status === 'alert';
                const isCurrent = step.isCurrent;

                // Color styles
                let cardBorder = isCurrent 
                  ? 'border-blue-400 ring-2 ring-blue-500/20 bg-blue-50/20' 
                  : isFailure
                  ? 'border-red-300 bg-red-50/20'
                  : 'border-slate-200 bg-white hover:border-slate-300';

                return (
                  <div 
                    key={step.id} 
                    className={`rounded-xl border p-5 transition-all ${cardBorder} space-y-3`}
                  >
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        {/* Step Pill */}
                        <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-slate-900 text-white">
                          STEP {String(step.stepNumber).padStart(2, '0')}
                        </span>

                        {/* Stage Badge */}
                        <span className={`px-2.5 py-0.5 text-xs font-mono font-bold rounded ${
                          isFailure 
                            ? 'bg-red-100 text-red-800 border border-red-300' 
                            : step.stage === 'OUTCOME'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : step.stage === 'VERIFY'
                            ? 'bg-teal-100 text-teal-800 border border-teal-300'
                            : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}>
                          {step.stage}
                        </span>

                        {/* Action Type */}
                        <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {step.actionType}
                        </span>

                        {/* Tool Used Badge */}
                        <span className="text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 flex items-center gap-1">
                          <Database className="w-3 h-3 text-blue-500" />
                          {step.toolUsed}
                        </span>
                      </div>

                      {/* Right Meta: Status & Timestamp */}
                      <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {step.timestamp}
                        </span>

                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          step.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                          step.status === 'alert' ? 'bg-red-100 text-red-800 animate-pulse' :
                          step.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {step.status.toUpperCase()}
                        </span>

                        {step.confidence !== undefined && (
                          <span className="text-slate-400 text-[10px]">
                            {Math.round(step.confidence * 100)}% conf
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Agent Rationale Callout */}
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
                      <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-blue-600" />
                        Agent Cognitive Rationale
                      </div>
                      <p className="text-slate-700 leading-relaxed italic">
                        "{step.rationale}"
                      </p>
                    </div>

                    {/* Collapsible Tool IO Drawer */}
                    <div>
                      <button
                        onClick={() => toggleExpanded(step.id)}
                        className="text-xs font-mono text-blue-600 hover:text-blue-800 flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        {isExpanded ? 'Hide Raw Tool Telemetry & Parameters' : 'Inspect Tool Parameters & Payload'}
                      </button>

                      {isExpanded && (
                        <div className="mt-2.5 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
                          <div className="bg-slate-900 text-slate-200 p-3 rounded-lg border border-slate-800">
                            <span className="text-[10px] text-blue-400 block font-bold mb-1">
                              INPUT PARAMETERS:
                            </span>
                            <pre className="text-[11px] whitespace-pre-wrap overflow-x-auto text-emerald-300">
                              {step.inputData}
                            </pre>
                          </div>

                          <div className="bg-slate-900 text-slate-200 p-3 rounded-lg border border-slate-800">
                            <span className="text-[10px] text-cyan-400 block font-bold mb-1">
                              RETURN PERCEPTION / OUTPUT:
                            </span>
                            <pre className="text-[11px] whitespace-pre-wrap overflow-x-auto text-amber-300">
                              {step.outputData}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 2: STRUCTURED AUDIT TABLE */}
        {activeTab === 'table' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[11px] uppercase">
                <tr>
                  <th className="px-4 py-3">Step</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Stage</th>
                  <th className="px-4 py-3">Tool Queried</th>
                  <th className="px-4 py-3">Action / Decision Summary</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-sans">
                {filteredSteps.map((step) => (
                  <tr key={step.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                      #{step.stepNumber}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-500 whitespace-nowrap">
                      {step.timestamp}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        step.status === 'alert' ? 'bg-red-100 text-red-800' :
                        step.stage === 'OUTCOME' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {step.stage}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-blue-700 font-medium whitespace-nowrap">
                      {step.toolUsed}
                    </td>
                    <td className="px-4 py-3 max-w-md">
                      <div className="font-bold text-slate-900">{step.title}</div>
                      <div className="text-slate-500 text-[11px] truncate mt-0.5">{step.description}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-mono">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        step.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        step.status === 'alert' ? 'bg-red-50 text-red-700 border border-red-200' :
                        step.status === 'in-progress' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {step.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-600 whitespace-nowrap">
                      {step.confidence !== undefined ? `${Math.round(step.confidence * 100)}%` : '100%'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: RAW JSON STREAM */}
        {activeTab === 'raw' && (
          <div className="p-4 bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto max-h-[600px]">
            <pre className="text-blue-300">
              {JSON.stringify(filteredSteps, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
