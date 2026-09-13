import { 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  XCircle, 
  ArrowRight, 
  RefreshCw, 
  Users, 
  Navigation, 
  Truck, 
  Home, 
  Target,
  Sparkles,
  Award
} from 'lucide-react';
import { StepDefinition } from '../data/mockData';
import { SimulationStep, VerificationChecks } from '../types';

interface AutonomousSimulationStatusProps {
  currentStepDef: StepDefinition;
  routeR1Blocked: boolean;
  onInjectFailure: () => void;
  onNextStep: () => void;
  onReset: () => void;
  isLastStep: boolean;
}

export function AutonomousSimulationStatus({
  currentStepDef,
  routeR1Blocked,
  onInjectFailure,
  onNextStep,
  onReset,
  isLastStep
}: AutonomousSimulationStatusProps) {
  const step = currentStepDef.step;

  return (
    <div className="space-y-4" id="autonomous-simulation-status-container">
      {/* 1. FAILURE ALERT BANNER - Display clearly: "Unexpected condition detected: Route R1 is blocked." */}
      {(step === 'FAILURE' || (routeR1Blocked && step === 'ADAPT')) && (
        <div 
          id="failure-alert-banner"
          className="p-4 rounded-xl bg-red-950/90 border-2 border-red-500 text-white shadow-xl shadow-red-950/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-pulse"
        >
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-red-600 text-white shrink-0 mt-0.5 shadow-md shadow-red-600/50">
              <XCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono tracking-widest text-red-300 font-bold uppercase">
                CRITICAL EXCEPTION TRIGGERED
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Unexpected condition detected: Route R1 is blocked.
              </h3>
              <p className="text-xs text-red-200/90 mt-1 leading-relaxed">
                Flash flood surge has submerged arterial Route R1 at marker MP-4.1. Swiftwater ingress compromised. Prior dispatch plan invalidated. Initiating autonomous adaptation loop.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-md bg-red-600/90 text-white font-mono text-xs font-bold uppercase tracking-wider border border-red-400/50">
              ADAPTATION TRIGGERED
            </span>
          </div>
        </div>
      )}

      {/* 2. REPLAN / ADAPT HIGHLIGHT BANNER */}
      {(step === 'ADAPT' || step === 'REPLAN' || step === 'ACT_TEAM_4') && (
        <div 
          id="replan-highlight-banner"
          className="p-4 rounded-xl bg-slate-900 border border-slate-700 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 shrink-0">
              <RefreshCw className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-blue-400 font-bold uppercase">
                {step === 'ADAPT' ? 'COGNITIVE ADAPTATION' : 'AUTONOMOUS REPLANNING'}
              </div>
              <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Contingency Selected: Team 4 → Route R3 → Flood Zone A</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Bypassing blocked Route R1 via elevated Valley Ridge Route R3 with Heavy Evacuation Unit 4.
              </p>
            </div>
          </div>

          <div className="shrink-0 text-xs font-mono bg-slate-950 px-3 py-1.5 rounded border border-slate-800 text-emerald-400 font-bold">
            ROUTE R3: 100% CLEAR
          </div>
        </div>
      )}

      {/* 3. VERIFICATION CHECKLIST - Check: correct team, route available, team capacity, shelter capacity, mission objective */}
      {currentStepDef.verificationChecks && (
        <div 
          id="verification-checklist-panel"
          className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-200">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Step 10: Autonomous Plan Verification Audit
                </h4>
                <p className="text-xs text-slate-500">
                  Validating all 5 critical operational safety constraints before authorization
                </p>
              </div>
            </div>

            <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-emerald-100 text-emerald-800 rounded-full">
              5/5 CHECKS PASSED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Check 1: Correct Team */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-mono text-slate-500 uppercase block">1. Correct Team</span>
                <span className="text-xs font-bold text-slate-900">Rescue Team 4</span>
                <span className="text-[10px] text-emerald-600 block font-medium">Heavy 6x6 Unit</span>
              </div>
            </div>

            {/* Check 2: Route Available */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-mono text-slate-500 uppercase block">2. Route Available</span>
                <span className="text-xs font-bold text-slate-900">Route R3</span>
                <span className="text-[10px] text-emerald-600 block font-medium">Bypass Open (Dry)</span>
              </div>
            </div>

            {/* Check 3: Team Capacity */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-mono text-slate-500 uppercase block">3. Team Capacity</span>
                <span className="text-xs font-bold text-slate-900">12 Specialists</span>
                <span className="text-[10px] text-emerald-600 block font-medium">High-Water Payload</span>
              </div>
            </div>

            {/* Check 4: Shelter Capacity */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-mono text-slate-500 uppercase block">4. Shelter Capacity</span>
                <span className="text-xs font-bold text-slate-900">560 Available Beds</span>
                <span className="text-[10px] text-emerald-600 block font-medium">Shelter B Verified</span>
              </div>
            </div>

            {/* Check 5: Mission Objective */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-mono text-slate-500 uppercase block">5. Mission Objective</span>
                <span className="text-xs font-bold text-slate-900">Flood Zone A</span>
                <span className="text-[10px] text-emerald-600 block font-medium">Target Met</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. FINAL OUTCOME BANNER - Display: "MISSION COMPLETED" */}
      {currentStepDef.isMissionCompleted && (
        <div 
          id="mission-completed-banner"
          className="p-6 rounded-xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 border-2 border-emerald-400 text-white shadow-xl shadow-emerald-950/40 flex flex-col md:flex-row md:items-center justify-between gap-5"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shrink-0 shadow-lg">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 uppercase tracking-wider">
                  AUTONOMOUS DIRECTIVE COMPLETE
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mt-1">
                MISSION COMPLETED
              </h2>
              <p className="text-xs md:text-sm text-emerald-100/90 mt-1 max-w-2xl leading-relaxed">
                Residents in Flood Zone A safely protected and evacuated via contingency Route R3 to Shelter B. The autonomous loop adapted smoothly from unexpected arterial route blockage to successful mission fulfillment with zero human dispatch latency.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={onReset}
              className="px-5 py-3 rounded-lg bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-xs uppercase tracking-wider shadow-lg transition-colors cursor-pointer"
            >
              Restart Full Demo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
