import { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MissionCard } from './components/MissionCard';
import { SimulatedMap } from './components/SimulatedMap';
import { AgentStatusCard } from './components/AgentStatusCard';
import { AutonomousSimulationStatus } from './components/AutonomousSimulationStatus';
import { AgentActivityPanel } from './components/AgentActivityPanel';
import { AgentActivityPage } from './components/AgentActivityPage';
import { ResourcesView } from './components/ResourcesView';
import { ArchitectureView } from './components/ArchitectureView';
import { 
  AgentStage, 
  NavSection, 
  ActivityEvent, 
  RescueTeam, 
  Shelter, 
  RouteInfo, 
  MissionData 
} from './types';
import { 
  INITIAL_MISSION, 
  RESCUE_TEAMS, 
  SHELTERS, 
  ROUTES, 
  DEMO_STEPS,
  StepDefinition
} from './data/mockData';

export default function App() {
  const [currentSection, setCurrentSection] = useState<NavSection>('command-center');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isRunningDemo, setIsRunningDemo] = useState<boolean>(false);
  const [events, setEvents] = useState<ActivityEvent[]>([]);

  // Timer ref for autonomous loop progression
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentStepDef: StepDefinition = DEMO_STEPS[currentStepIndex];

  // Derive initial events based on currentStepIndex
  useEffect(() => {
    // Generate events up to currentStepIndex
    const generatedEvents: ActivityEvent[] = [];
    const baseHour = 10;
    const baseMin = 42;

    for (let i = 0; i <= currentStepIndex; i++) {
      const stepDef = DEMO_STEPS[i];
      const seconds = String((i * 12) % 60).padStart(2, '0');
      const minutes = String(baseMin + Math.floor((i * 12) / 60)).padStart(2, '0');
      
      generatedEvents.push({
        id: `evt-step-${i}`,
        timestamp: `${baseHour}:${minutes}:${seconds}`,
        ...stepDef.event
      });
    }

    setEvents(generatedEvents);
  }, [currentStepIndex]);

  // Autonomous state machine runner
  useEffect(() => {
    if (isRunningDemo) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prevIndex) => {
          if (prevIndex < DEMO_STEPS.length - 1) {
            return prevIndex + 1;
          } else {
            // Reached outcome: pause demo
            setIsRunningDemo(false);
            return prevIndex;
          }
        });
      }, 2700); // 2.7s per step for clear demo visibility
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunningDemo]);

  // Toggle Autonomous Demo Play/Pause
  const handleToggleRunDemo = () => {
    if (isRunningDemo) {
      setIsRunningDemo(false);
    } else {
      if (currentStepIndex >= DEMO_STEPS.length - 1) {
        setCurrentStepIndex(0);
      }
      setIsRunningDemo(true);
    }
  };

  // INJECT FAILURE manually
  // Requirement: "The 'INJECT FAILURE' button should also trigger the Route R1 failure manually."
  const handleInjectFailure = () => {
    // Step index 5 is 'FAILURE' (Route R1 blocked)
    setCurrentStepIndex(5);
    // Start or resume demo playback to demonstrate automatic adaptation and replanning
    setIsRunningDemo(true);
  };

  const handleNextStep = () => {
    if (currentStepIndex < DEMO_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setIsRunningDemo(false);
    setCurrentStepIndex(0);
  };

  const handleJumpToStep = (index: number) => {
    if (index >= 0 && index < DEMO_STEPS.length) {
      setCurrentStepIndex(index);
    }
  };

  // Dynamic state derivations for child components
  const dynamicTeams: RescueTeam[] = RESCUE_TEAMS.map((team) => {
    if (team.id === 'team-2') {
      return {
        ...team,
        status: currentStepDef.team2Status,
        assignedRoute: currentStepDef.routeR1Blocked ? 'Route R1 (BLOCKED)' : 'Route R1'
      };
    }
    if (team.id === 'team-4') {
      return {
        ...team,
        status: currentStepDef.team4Status,
        assignedRoute: currentStepDef.selectedRoute === 'r3' ? 'Route R3 (ACTIVE)' : 'Route R3 (STANDBY)'
      };
    }
    return team;
  });

  const dynamicRoutes: RouteInfo[] = ROUTES.map((route) => {
    if (route.id === 'r1') {
      return {
        ...route,
        status: currentStepDef.routeR1Blocked ? 'BLOCKED' : 'CLEAR',
        riskScore: currentStepDef.routeR1Blocked ? 95 : 12
      };
    }
    if (route.id === 'r3') {
      return {
        ...route,
        status: currentStepDef.selectedRoute === 'r3' ? 'CLEAR' : 'CAUTION',
        riskScore: currentStepDef.selectedRoute === 'r3' ? 15 : 38
      };
    }
    return route;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-900 font-sans">
      {/* Left Sidebar Navigation */}
      <Sidebar 
        currentSection={currentSection}
        onSelectSection={(sec) => setCurrentSection(sec)}
        activeStage={currentStepDef.stage}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <Header />

        {/* Dashboard Body */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Active Navigation Views */}
          {currentSection === 'command-center' && (
            <div id="command-center-view" className="space-y-6">
              
              {/* 1. Mission Card */}
              <MissionCard mission={INITIAL_MISSION} />

              {/* 2. Autonomous Simulation Status Banners (Failure Alert, Replanning Banner, Verification 5-Point Checklist, Final Mission Completed Banner) */}
              <AutonomousSimulationStatus 
                currentStepDef={currentStepDef}
                routeR1Blocked={currentStepDef.routeR1Blocked}
                onInjectFailure={handleInjectFailure}
                onNextStep={handleNextStep}
                onReset={handleReset}
                isLastStep={currentStepIndex >= DEMO_STEPS.length - 1}
              />

              {/* 3. Simulated Incident Map */}
              <SimulatedMap 
                rescueTeams={dynamicTeams}
                shelters={SHELTERS}
                routes={dynamicRoutes}
                activeStage={currentStepDef.stage}
                selectedRoute={currentStepDef.selectedRoute}
                routeR1Blocked={currentStepDef.routeR1Blocked}
                activeTeamId={currentStepDef.activeTeamId}
                isMissionCompleted={currentStepDef.isMissionCompleted}
              />

              {/* 4. Agent Status Card (9-stage pipeline, flow demonstrator, buttons: START AUTONOMOUS DEMO, INJECT FAILURE) */}
              <AgentStatusCard 
                currentStepIndex={currentStepIndex}
                currentStepDef={currentStepDef}
                isRunningDemo={isRunningDemo}
                onToggleRunDemo={handleToggleRunDemo}
                onInjectFailure={handleInjectFailure}
                onNextStep={handleNextStep}
                onReset={handleReset}
                onJumpToStep={handleJumpToStep}
              />

              {/* 5. Agent Activity Panel (auto-updating log of simulated events) */}
              <AgentActivityPanel 
                events={events}
                activeStage={currentStepDef.stage}
              />
            </div>
          )}

          {currentSection === 'agent-activity' && (
            <AgentActivityPage 
              events={events}
              currentStepIndex={currentStepIndex}
              currentStepDef={currentStepDef}
              isRunningDemo={isRunningDemo}
              onToggleRunDemo={handleToggleRunDemo}
              onInjectFailure={handleInjectFailure}
              onNextStep={handleNextStep}
              onReset={handleReset}
            />
          )}

          {currentSection === 'resources' && (
            <ResourcesView 
              rescueTeams={dynamicTeams}
              shelters={SHELTERS}
              routes={dynamicRoutes}
            />
          )}

          {currentSection === 'architecture' && (
            <ArchitectureView />
          )}
        </main>
      </div>
    </div>
  );
}
