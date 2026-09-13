import { 
  Play, 
  RotateCcw, 
  AlertOctagon, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles,
  Bot,
  Info,
  SkipForward,
  Pause,
  ArrowRight
} from 'lucide-react';
import { AgentStage } from '../types';
import { STAGES, DEMO_STEPS, StepDefinition } from '../data/mockData';

interface AgentStatusCardProps {
  currentStepIndex: number;
  currentStepDef: StepDefinition;
  isRunningDemo: boolean;
  onToggleRunDemo: () => void;
  onInjectFailure: () => void;
  onNextStep: () => void;
  onReset: () => void;
  onJumpToStep: (index: number) => void;
}

export function AgentStatusCard({
  currentStepIndex,
  currentStepDef,
  isRunningDemo,
  onToggleRunDemo,
  onInjectFailure,
  onNextStep,
  onReset,
  onJumpToStep
}: AgentStatusCardProps) {
  const currentStage = currentStepDef.stage;
  const currentStageIndex = STAGES.indexOf(currentStage);

  // The 9 sequence concepts explicitly requested:
  // Goal → Decision → Action → Intermediate Result → Failure → Adaptation → Replanning → Verification → Final Outcome
  const demonstrationFlow = [
    { label: 'Goal', stepIndex: 0 },
    { label: 'Decision', stepIndex: 2 },
    { label: 'Action', stepIndex: 4 },
    { label: 'Intermediate Result', stepIndex: 4 },
    { label: 'Failure', stepIndex: 5 },
    { label: 'Adaptation', stepIndex: 6 },
    { label: 'Replanning', stepIndex: 7 },
    { label: 'Verification', stepIndex: 9 },
    { label: 'Final Outcome', stepIndex: 10 },
  ];

  return (
    <div 
      id="agent-status-card"
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
    >
      {/* Top Header */}
      <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold tracking-tight text-white">
                Agent Status &amp; Reasoning Pipeline
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded">
                STEP {currentStepIndex + 1} OF {DEMO_STEPS.length}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Deterministic local state machine representing an autonomous agent
            </p>
          </div>
        </div>

        {/* Current Stage Indicator Pill */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">CURRENT STAGE:</span>
          <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold text-white shadow-sm ring-2 ${
            currentStepDef.step === 'FAILURE'
              ? 'bg-red-600 ring-red-400/50 animate-pulse'
              : currentStepDef.isMissionCompleted
              ? 'bg-emerald-600 ring-emerald-400/50'
              : 'bg-blue-600 ring-blue-400/50 animate-pulse'
          }`}>
            {currentStage}
          </span>
        </div>
      </div>

      {/* 1. VISIBLE FLOW DEMONSTRATOR:
          Goal → Decision → Action → Intermediate Result → Failure → Adaptation → Replanning → Verification → Final Outcome */}
      <div className="bg-slate-950 px-6 py-3 border-b border-slate-800 overflow-x-auto">
        <div className="flex items-center gap-2 text-xs min-w-[760px]">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            DEMO SEQUENCE:
          </span>
          {demonstrationFlow.map((flowItem, idx) => {
            const isPassed = currentStepIndex > flowItem.stepIndex;
            const isCurrent = (
              (flowItem.label === 'Goal' && currentStepIndex <= 1) ||
              (flowItem.label === 'Decision' && (currentStepIndex === 2 || currentStepIndex === 3)) ||
              (flowItem.label === 'Action' && currentStepIndex === 4) ||
              (flowItem.label === 'Intermediate Result' && currentStepIndex === 4) ||
              (flowItem.label === 'Failure' && currentStepIndex === 5) ||
              (flowItem.label === 'Adaptation' && currentStepIndex === 6) ||
              (flowItem.label === 'Replanning' && (currentStepIndex === 7 || currentStepIndex === 8)) ||
              (flowItem.label === 'Verification' && currentStepIndex === 9) ||
              (flowItem.label === 'Final Outcome' && currentStepIndex === 10)
            );

            return (
              <div key={`${flowItem.label}-${idx}`} className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded font-mono text-[11px] font-semibold transition-all ${
                    isCurrent
                      ? flowItem.label === 'Failure'
                        ? 'bg-red-500 text-white shadow-md shadow-red-500/40 ring-1 ring-red-300'
                        : flowItem.label === 'Final Outcome'
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/40'
                        : 'bg-blue-600 text-white shadow-md shadow-blue-500/40 ring-1 ring-blue-300'
                      : isPassed
                      ? 'bg-slate-800 text-slate-300 border border-slate-700'
                      : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  {flowItem.label}
                </span>

                {idx < demonstrationFlow.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. STAGE PIPELINE (GOAL → OBSERVE → DECIDE → PLAN → ACT → VERIFY → ADAPT → REPLAN → OUTCOME) */}
      <div className="p-6 bg-slate-50/60 border-b border-slate-200 overflow-x-auto">
        <div className="min-w-[820px] flex items-center justify-between relative py-2">
          {STAGES.map((stage, index) => {
            const isCurrent = stage === currentStage;
            const isPassed = index < currentStageIndex;

            return (
              <div key={stage} className="flex items-center flex-1 last:flex-none">
                {/* Stage Node */}
                <div
                  className={`group relative flex flex-col items-center transition-all duration-200 ${
                    isCurrent ? 'scale-105' : ''
                  }`}
                >
                  {/* Badge Circle / Pill */}
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-all shadow-sm ${
                      isCurrent
                        ? currentStepDef.step === 'FAILURE'
                          ? 'bg-red-600 text-white ring-4 ring-red-500/30'
                          : 'bg-blue-600 text-white ring-4 ring-blue-500/30 shadow-blue-500/40'
                        : isPassed
                        ? 'bg-emerald-600 text-white ring-2 ring-emerald-500/30'
                        : 'bg-white text-slate-400 border border-slate-200'
                    }`}
                  >
                    {isPassed ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>

                  {/* Stage Label */}
                  <span
                    className={`mt-2 text-xs font-mono font-bold tracking-wider transition-colors ${
                      isCurrent
                        ? currentStepDef.step === 'FAILURE'
                          ? 'text-red-700 underline underline-offset-4 decoration-2'
                          : 'text-blue-700 underline underline-offset-4 decoration-2'
                        : isPassed
                        ? 'text-emerald-700'
                        : 'text-slate-400'
                    }`}
                  >
                    {stage}
                  </span>

                  {isCurrent && (
                    <span className={`w-2 h-1 rounded-full mt-1 ${
                      currentStepDef.step === 'FAILURE' ? 'bg-red-600' : 'bg-blue-600'
                    }`}></span>
                  )}
                </div>

                {/* Arrow Connector between stages */}
                {index < STAGES.length - 1 && (
                  <div className="flex-1 flex items-center justify-center px-1">
                    <div
                      className={`h-0.5 w-full transition-colors ${
                        index < currentStageIndex ? 'bg-emerald-500' : 'bg-slate-200'
                      }`}
                    />
                    <ChevronRight
                      className={`w-3.5 h-3.5 shrink-0 -ml-1 ${
                        index < currentStageIndex ? 'text-emerald-500' : 'text-slate-300'
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Step Description & Operational Context */}
      <div className="px-6 py-4 bg-white border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg mt-0.5 shrink-0 ${
            currentStepDef.step === 'FAILURE' 
              ? 'bg-red-50 text-red-600 border border-red-200' 
              : 'bg-blue-50 text-blue-600 border border-blue-100'
          }`}>
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-slate-400 uppercase">
                {currentStepDef.label}:
              </span>
              <span className="text-sm font-bold text-slate-900">
                {currentStepDef.sublabel}
              </span>
            </div>
            <p className="text-xs text-slate-700 mt-0.5 max-w-2xl leading-relaxed">
              {currentStepDef.description}
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="text-[11px] font-mono text-slate-400">STATE MACHINE STATUS</span>
          <div className="text-xs font-mono font-bold text-blue-700">
            {isRunningDemo ? 'LOOP AUTO-ADVANCING' : 'READY / STEPPING'}
          </div>
        </div>
      </div>

      {/* Button Controls Bar */}
      <div className="p-6 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* PRIMARY BUTTON: START AUTONOMOUS DEMO */}
          <button
            id="start-autonomous-demo-button"
            onClick={onToggleRunDemo}
            className={`px-6 py-3.5 rounded-lg font-bold text-sm tracking-wide shadow-md transition-all flex items-center gap-2.5 cursor-pointer ${
              isRunningDemo
                ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25 ring-2 ring-blue-500/50 hover:scale-[1.02]'
            }`}
          >
            {isRunningDemo ? (
              <>
                <Pause className="w-5 h-5" />
                <span>PAUSE SIMULATION</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>START AUTONOMOUS DEMO</span>
              </>
            )}
          </button>

          {/* SECONDARY REQUIRED BUTTON: INJECT FAILURE (triggers Route R1 failure manually) */}
          <button
            id="inject-failure-button"
            onClick={onInjectFailure}
            className="px-5 py-3.5 rounded-lg font-bold text-sm text-red-700 bg-red-50 hover:bg-red-100 border-2 border-red-300 shadow-sm transition-all flex items-center gap-2 cursor-pointer hover:border-red-500 hover:scale-[1.02]"
            title="Manually trigger Route R1 failure and observe autonomous adaptation"
          >
            <AlertOctagon className="w-4 h-4 text-red-600 animate-pulse" />
            <span>INJECT FAILURE</span>
          </button>

          {/* Manual Step Forward Button */}
          <button
            id="next-step-button"
            onClick={onNextStep}
            disabled={currentStepIndex >= DEMO_STEPS.length - 1}
            className="px-4 py-3.5 rounded-lg text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>Next Step</span>
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          {/* Reset Demo Cycle Button */}
          <button
            id="reset-demo-button"
            onClick={onReset}
            className="px-3.5 py-3.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Reset to Step 1 (GOAL)"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-2 font-mono">
          <span className={`w-2 h-2 rounded-full ${isRunningDemo ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`}></span>
          <span>{isRunningDemo ? 'SIMULATION TICK: ACTIVE (~2.6s)' : 'MODE: MANUAL / PAUSED'}</span>
        </div>
      </div>
    </div>
  );
}
