import { 
  Cpu, 
  Eye, 
  Brain, 
  Compass, 
  Send, 
  CheckCircle2, 
  RefreshCw, 
  Layers, 
  Shield, 
  ArrowDown, 
  ArrowRight,
  Database, 
  CloudRain, 
  AlertOctagon, 
  Truck, 
  Navigation, 
  Building2, 
  Zap, 
  Radio, 
  RotateCcw,
  Target,
  Workflow,
  Sparkles,
  GitBranch,
  ShieldCheck,
  Terminal,
  Activity
} from 'lucide-react';

export function ArchitectureView() {
  // Ordered architecture pipeline matching user specification
  const flowNodes = [
    {
      id: 'command-center',
      number: '01',
      title: 'COMMAND CENTER',
      subtitle: 'Human-Agent Collaborative Operational Interface',
      description: 'Single-pane-of-glass dispatch terminal presenting situational awareness, geospatial GIS telemetry, real-time logs, and priority override controls.',
      badge: 'TOP-LEVEL UI',
      badgeColor: 'bg-slate-800 text-slate-200 border-slate-700',
      icon: Terminal
    },
    {
      id: 'crisis-orchestrator',
      number: '02',
      title: 'CRISIS ORCHESTRATOR',
      subtitle: 'Cognitive Master State Machine & Task Scheduler',
      description: 'Central agentic supervisor coordinating sub-modules, dispatching execution ticks, preserving mission state, and mediating loop transitions.',
      badge: 'MASTER SUPERVISOR',
      badgeColor: 'bg-blue-900 text-blue-200 border-blue-700',
      icon: Cpu,
      hasLoopTarget: true
    },
    {
      id: 'goal-manager',
      number: '03',
      title: 'GOAL MANAGER',
      subtitle: 'Objective Formalization & Constraint Ingestion',
      description: 'Translates high-level mission declarations ("Protect residents in Flood Zone A") into deterministic boundary criteria: population, evacuation deadlines, and safety limits.',
      badge: 'GOAL PARSER',
      badgeColor: 'bg-indigo-900 text-indigo-200 border-indigo-700',
      icon: Target
    },
    {
      id: 'planner',
      number: '04',
      title: 'PLANNER',
      subtitle: 'Topological Multi-Step Action Synthesis',
      description: 'Synthesizes end-to-end multi-step trajectories (Team 2 → Route R1 → Flood Zone A), generating primary vectors and pre-computing fallback routes.',
      badge: 'CORRIDOR PLANNER',
      badgeColor: 'bg-blue-900 text-blue-200 border-blue-700',
      icon: Compass
    },
    {
      id: 'decision-engine',
      number: '05',
      title: 'DECISION ENGINE',
      subtitle: 'Multi-Criteria Scoring & Optimization Matrix',
      description: 'Applies heuristic cost functions balancing vehicle water-fording depth, crew capability, transit ETA, and shelter capacity to pick optimal responders.',
      badge: 'SELECTION ENGINE',
      badgeColor: 'bg-violet-900 text-violet-200 border-violet-700',
      icon: Brain
    },
    {
      id: 'action-manager',
      number: '06',
      title: 'ACTION MANAGER',
      subtitle: 'Autonomous Dispatch & Protocol Execution',
      description: 'Marshals concrete side effects: Computer-Aided Dispatch (CAD) packet generation, mobile terminal route syncing, siren authorization, and citizen alerts.',
      badge: 'EXECUTION GATEWAY',
      badgeColor: 'bg-amber-900 text-amber-200 border-amber-700',
      icon: Send
    },
    {
      id: 'simulated-tools',
      number: '07',
      title: 'SIMULATED TOOLS',
      subtitle: 'Domain Specific Tool Ecosystem (6 Microservices)',
      description: 'Dynamic tool layer queried on demand: Weather Service, Incident DB, Resource DB, Route Engine, Shelter DB, and Action Simulator.',
      badge: 'TOOL LAYER',
      badgeColor: 'bg-cyan-900 text-cyan-200 border-cyan-700',
      icon: Database,
      highlightToolbox: true
    },
    {
      id: 'emergency-environment',
      number: '08',
      title: 'EMERGENCY ENVIRONMENT',
      subtitle: 'Dynamic World Simulator & Disaster Telemetry',
      description: 'Simulates physical reality: rising flood hydrographs, shifting debris, road blockages (Route R1 submergence), and GPS vehicle telemetry.',
      badge: 'WORLD SIMULATOR',
      badgeColor: 'bg-rose-900 text-rose-200 border-rose-700',
      icon: Activity
    },
    {
      id: 'feedback',
      number: '09',
      title: 'FEEDBACK',
      subtitle: 'Closed-Loop Telemetric Ingestion & Perception',
      description: 'Ingests stream anomalies in real time: "Unexpected condition detected: Route R1 is blocked by +1.2m water inundation".',
      badge: 'CLOSED LOOP SENSING',
      badgeColor: 'bg-red-900 text-red-200 border-red-700',
      icon: AlertOctagon
    },
    {
      id: 'verification',
      number: '10',
      title: 'VERIFICATION',
      subtitle: '5-Point Autonomous Safety Audit Engine',
      description: 'Audits plan validity before committing resources: [1] Correct team, [2] Route available, [3] Team capacity, [4] Shelter capacity, [5] Mission objective.',
      badge: '5-POINT AUDIT',
      badgeColor: 'bg-emerald-900 text-emerald-200 border-emerald-700',
      icon: CheckCircle2
    },
    {
      id: 'adapt-replan',
      number: '11',
      title: 'ADAPT / REPLAN',
      subtitle: 'Failure Detection & Autonomous Policy Adjustment',
      description: 'Recognizes previous plan is invalid, voids deadlocked vectors, evaluates contingency alternatives (Team 4 → Route R3), and loops back to Orchestrator.',
      badge: 'AUTONOMOUS RECOVERY',
      badgeColor: 'bg-purple-900 text-purple-200 border-purple-700',
      icon: RefreshCw,
      hasLoopBack: true
    }
  ];

  // The 6 explicit simulated tools
  const simulatedTools = [
    {
      name: 'Weather Service',
      role: 'Precipitation, wind gale velocity, and river basin telemetry',
      mockCall: 'WeatherService.getHydrograph("Basin-A")',
      output: 'Rain: 45mm/h, River Rate: +0.45m/hr, Gale Warning',
      latency: '14ms',
      icon: CloudRain,
      color: 'text-blue-500 bg-blue-50 border-blue-200'
    },
    {
      name: 'Incident Database',
      role: 'Disaster incident registry, civilian population coordinates, severity ratings',
      mockCall: 'IncidentDB.getZoneSeverity("Flood Zone A")',
      output: 'Population: 2,450, Priority: CRITICAL, Threat: Inundation',
      latency: '8ms',
      icon: AlertOctagon,
      color: 'text-red-500 bg-red-50 border-red-200'
    },
    {
      name: 'Resource Database',
      role: 'Fleet inventory, water wading specs, team callsigns, crew capacity',
      mockCall: 'ResourceDB.getAvailableTeams({ waterDepth: ">1m" })',
      output: 'Team 2 (Amphibious ARGO), Team 4 (6x6 Transporters), Team 1 (Air)',
      latency: '11ms',
      icon: Truck,
      color: 'text-indigo-500 bg-indigo-50 border-indigo-200'
    },
    {
      name: 'Route Engine',
      role: 'Dynamic topological routing, roadway surface hazard index, bridge telemetry',
      mockCall: 'RouteEngine.computeCorridor({ avoidBlocked: true })',
      output: 'R1: BLOCKED (+1.2m water) | R3: CLEAR (19 min, +18m elevation)',
      latency: '22ms',
      icon: Navigation,
      color: 'text-amber-500 bg-amber-50 border-amber-200'
    },
    {
      name: 'Shelter Database',
      role: 'Live bed availability, medical staff readiness, rations remaining, elevation data',
      mockCall: 'ShelterDB.getCensus("Shelter B")',
      output: '560 Beds Available (800 Total, 30% full), Level 2 Clinic Active',
      latency: '9ms',
      icon: Building2,
      color: 'text-emerald-500 bg-emerald-50 border-emerald-200'
    },
    {
      name: 'Action Simulator',
      role: 'Machine-to-machine Computer-Aided Dispatch (CAD) and siren telemetry',
      mockCall: 'ActionSimulator.dispatchUnit("team-4", "R3")',
      output: 'CAD_ACK_RECEIVED: Unit TITAN-4 mobile transponder synchronized',
      latency: '16ms',
      icon: Zap,
      color: 'text-violet-500 bg-violet-50 border-violet-200'
    }
  ];

  // The 8 explicit points for "WHY THIS IS AGENTIC"
  const agenticPoints = [
    {
      point: 'Goal-driven execution',
      summary: 'Autonomous objective pursuit without step-by-step human prompts.',
      detail: 'The agent is initialized with an operational objective ("Protect residents in Flood Zone A"). Rather than requiring a dispatcher to manually script every action, the agent decomposes this top-level mandate into discrete tactical sub-goals autonomously.',
      icon: Target,
      tag: 'DIRECTIVE-BASED'
    },
    {
      point: 'Dynamic tool selection',
      summary: 'Queries tools based on context, not hardcoded call chains.',
      detail: 'The agent determines when to invoke the Route Engine, when to inspect the Weather Service, and when to verify Shelter capacity based on real-time task needs, treating tools as flexible capabilities in an LLM/agentic loop.',
      icon: Database,
      tag: 'DYNAMIC RPC'
    },
    {
      point: 'Multi-step planning',
      summary: 'Synthesizes forward-looking sequential action sequences.',
      detail: 'Generates cohesive trajectories (Select Team 2 → Route R1 → Flood Zone A Sector Gate → Evacuate to Shelter B), calculating transitive timing, team payload constraints, and return fuel/capacity budgets.',
      icon: Workflow,
      tag: 'HORIZON PLANNING'
    },
    {
      point: 'Environment feedback',
      summary: 'Perceives real-time state changes from simulated physical sensors.',
      detail: 'The agent does not operate in an open-loop vacuum. It continuously streams telemetry from simulated river depth gauges, roadway hazard detectors, and vehicle GPS transponders to keep internal beliefs aligned with reality.',
      icon: Activity,
      tag: 'CLOSED-LOOP TELEMETRY'
    },
    {
      point: 'Failure detection',
      summary: 'Identifies plan breakdown autonomously without human alarm.',
      detail: 'When Route R1 becomes submerged (+1.2m depth), the agent instantly detects a safety policy violation: "Unexpected condition detected: Route R1 is blocked." It does not blindly crash or continue forward.',
      icon: AlertOctagon,
      tag: 'AUTOMATED DETECTION'
    },
    {
      point: 'Adaptive replanning',
      summary: 'Self-corrects and synthesizes contingency solutions on the fly.',
      detail: 'Upon detecting Route R1 failure, the agent voids its previous plan, evaluates alternative routes and units, and selects Team 4 via high-ground Route R3. It completes recovery in milliseconds without waiting for manual human rescheduling.',
      icon: RefreshCw,
      tag: 'ZERO-LATENCY RECOVERY'
    },
    {
      point: 'Verification',
      summary: 'Enforces rigorous deterministic pre-condition audits before action.',
      detail: 'Before committing resources, the agent runs a 5-point verification audit: (1) Correct team, (2) Route available, (3) Team capacity, (4) Shelter capacity, (5) Mission objective. This guarantees hallucination-free emergency dispatch.',
      icon: ShieldCheck,
      tag: 'DETERMINISTIC GUARD'
    },
    {
      point: 'Persistent mission state',
      summary: 'Maintains long-term memory of objectives, telemetry, and actions.',
      detail: 'Across interruptions, failures, and re-routing cycles, the agent preserves the overarching mission context (2,450 civilians at risk, designated destination Shelter B), ensuring continuity until total mission completion.',
      icon: Layers,
      tag: 'STATE PERSISTENCE'
    }
  ];

  return (
    <div id="architecture-view" className="space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[11px] font-mono font-bold bg-blue-900/80 text-blue-300 border border-blue-700/60 rounded">
              SYSTEM TOPOLOGY
            </span>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              CLOSED-LOOP OODA ARCHITECTURE
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white mt-1.5">
            CrisisPilot Autonomous Architecture
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Deterministic, closed-loop agentic framework featuring hierarchical orchestration, multi-step planning, dynamic tool selection, failure perception, and zero-latency adaptive replanning.
          </p>
        </div>

        <div className="bg-slate-950/80 px-4 py-3 rounded-lg border border-slate-800 shrink-0 font-mono text-xs">
          <div className="text-slate-400 text-[10px]">HACKATHON PROTOCOL</div>
          <div className="text-blue-400 font-bold">IIT DEMONSTRATION READY</div>
          <div className="text-slate-500 text-[10px]">100% Deterministic Local State</div>
        </div>
      </div>

      {/* SECTION 1: VISUAL FLOW DIAGRAM */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-200 pb-4 mb-6">
          <div>
            <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-wider">
              SECTION 1 • FULL PIPELINE
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              End-to-End Autonomous Agent Execution Flow
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
            <span>Sequential Flow</span>
            <span className="w-3 h-3 rounded-full bg-purple-600 inline-block ml-2"></span>
            <span>Adaptation Loop</span>
          </div>
        </div>

        {/* Loop Back Notice Header */}
        <div className="mb-6 p-4 rounded-xl bg-purple-50/70 border border-purple-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-600 text-white rounded-lg">
              <RotateCcw className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-purple-950">
                Active Feedback &amp; Adaptive Replanning Loop
              </h4>
              <p className="text-xs text-purple-800">
                When environmental failure is detected, the pipeline automatically loops from <strong>ADAPT / REPLAN</strong> back to <strong>CRISIS ORCHESTRATOR</strong> without human latency.
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block px-3 py-1 font-mono text-xs font-bold bg-purple-200 text-purple-900 rounded-full">
            ↺ CLOSED-LOOP
          </span>
        </div>

        {/* Vertical Connected Flow */}
        <div className="space-y-3 relative max-w-4xl mx-auto">
          {/* Loop-back connecting visual line on the left */}
          <div className="hidden lg:block absolute left-[-28px] top-[140px] bottom-[60px] w-6 border-l-2 border-t-2 border-b-2 border-dashed border-purple-400 rounded-l-2xl pointer-events-none">
            <span className="absolute left-[-60px] top-[45%] -rotate-90 text-[10px] font-mono font-bold text-purple-700 tracking-wider whitespace-nowrap">
              ↺ REPLAN LOOP
            </span>
          </div>

          {flowNodes.map((node, index) => {
            const Icon = node.icon;
            const isLast = index === flowNodes.length - 1;

            return (
              <div key={node.id} className="relative">
                {/* Node Box */}
                <div className={`p-4 rounded-xl border transition-all ${
                  node.hasLoopBack 
                    ? 'border-purple-300 bg-purple-50/40 ring-2 ring-purple-400/30' 
                    : node.highlightToolbox
                    ? 'border-cyan-300 bg-cyan-50/30 ring-2 ring-cyan-400/20'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-slate-50'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Icon className="w-5 h-5 text-blue-400" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono font-bold text-slate-400">
                            STEP {node.number}
                          </span>
                          <h4 className="font-extrabold text-base text-slate-900 tracking-wide">
                            {node.title}
                          </h4>
                          <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded border ${node.badgeColor}`}>
                            {node.badge}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-700 mt-0.5">
                          {node.subtitle}
                        </p>
                      </div>
                    </div>

                    {node.hasLoopBack && (
                      <span className="shrink-0 flex items-center gap-1.5 px-3 py-1 bg-purple-700 text-white text-xs font-mono font-bold rounded-lg shadow-xs">
                        <RotateCcw className="w-3.5 h-3.5" />
                        ↺ Back to Orchestrator
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 mt-2.5 sm:ml-[54px] leading-relaxed">
                    {node.description}
                  </p>
                </div>

                {/* Downward Connector Arrow */}
                {!isLast && (
                  <div className="flex items-center justify-center my-1">
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-2.5 bg-slate-300"></div>
                      <ArrowDown className="w-4 h-4 text-blue-600 -my-1" />
                      <div className="w-0.5 h-2.5 bg-slate-300"></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: THE 6 SIMULATED TOOLS */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6">
        <div className="border-b border-slate-200 pb-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono text-cyan-600 font-bold uppercase tracking-wider">
              SECTION 2 • CAPABILITY ECOSYSTEM
            </span>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-5 h-5 text-cyan-600" />
              Simulated Tools Ecosystem
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              CrisisPilot dynamically selects and queries these 6 specialized microservices to gather context and execute actions.
            </p>
          </div>
          <span className="px-2.5 py-1 text-xs font-mono font-bold bg-cyan-50 text-cyan-800 border border-cyan-200 rounded self-start md:self-auto">
            6 SERVICES ONLINE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {simulatedTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div 
                key={tool.name} 
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${tool.color} border`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {tool.latency} LATENCY
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900">{tool.name}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {tool.role}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200">
                  <div className="bg-slate-900 text-slate-200 p-2 rounded text-[10px] font-mono truncate">
                    <span className="text-blue-400">&gt; </span>{tool.mockCall}
                  </div>
                  <div className="text-[11px] text-slate-700 bg-white p-2 rounded border border-slate-200 leading-snug">
                    <strong className="text-slate-900 text-[10px] block text-slate-400 font-mono">SAMPLE PAYLOAD:</strong>
                    {tool.output}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: WHY THIS IS AGENTIC */}
      <div className="bg-white rounded-xl border-2 border-blue-600/30 shadow-md overflow-hidden p-6 lg:p-8">
        <div className="border-b border-slate-200 pb-5 mb-6">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-mono font-bold bg-blue-600 text-white rounded">
              CORE AI CONCEPTS
            </span>
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wide">
              EVALUATION CRITERIA
            </span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-2">
            WHY THIS IS AGENTIC
          </h3>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            In traditional disaster software, actions are either hardcoded scripts or require human dispatchers to manually orchestrate each step. 
            CrisisPilot embodies a true <strong>autonomous agent</strong> through the 8 core principles below:
          </p>
        </div>

        {/* 8 Agentic Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agenticPoints.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.point}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 hover:border-blue-300 transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-base text-slate-900">
                      • {item.point}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded shrink-0">
                    {item.tag}
                  </span>
                </div>

                <p className="text-xs font-semibold text-blue-900">
                  {item.summary}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Comparison Callout */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-sm text-blue-400">
              Agentic Autonomy vs. Static Rules Engine
            </h4>
            <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">
              Unlike a static if-else script that halts when Route R1 fails, CrisisPilot perceives the failure, reasons over new environmental constraints, queries alternative route heuristics, and replans an optimal extraction corridor autonomously.
            </p>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-mono shrink-0">
            ✓ 0ms HUMAN INTERVENTION NEEDED
          </div>
        </div>
      </div>
    </div>
  );
}
