import { 
  AgentStage, 
  SimulationStep, 
  ActivityEvent, 
  RescueTeam, 
  Shelter, 
  RouteInfo, 
  MissionData, 
  VerificationChecks 
} from '../types';

export const STAGES: AgentStage[] = [
  'GOAL',
  'OBSERVE',
  'DECIDE',
  'PLAN',
  'ACT',
  'VERIFY',
  'ADAPT',
  'REPLAN',
  'OUTCOME'
];

export interface StepDefinition {
  step: SimulationStep;
  stage: AgentStage;
  label: string;
  sublabel: string;
  description: string;
  routeR1Blocked: boolean;
  selectedRoute: 'r1' | 'r3';
  activeTeamId: 'team-2' | 'team-4';
  team2Status: 'DISPATCHED' | 'STANDBY' | 'EN_ROUTE' | 'ON_SCENE' | 'HALTED';
  team4Status: 'DISPATCHED' | 'STANDBY' | 'EN_ROUTE' | 'ON_SCENE' | 'HALTED';
  event: Omit<ActivityEvent, 'id' | 'timestamp'>;
  verificationChecks?: VerificationChecks;
  isFailureAlert?: boolean;
  isMissionCompleted?: boolean;
}

export const DEMO_STEPS: StepDefinition[] = [
  // 1. GOAL
  {
    step: 'GOAL',
    stage: 'GOAL',
    label: '1. GOAL',
    sublabel: 'Objective Formulation',
    description: 'Autonomous goal formulated: Protect residents in Flood Zone A.',
    routeR1Blocked: false,
    selectedRoute: 'r1',
    activeTeamId: 'team-2',
    team2Status: 'STANDBY',
    team4Status: 'STANDBY',
    event: {
      stage: 'GOAL',
      title: 'Goal defined: Protect residents in Flood Zone A.',
      description: 'Primary objective established: Safeguard and evacuate 2,450 civilians under critical threat from rising riverwaters in Flood Zone A.',
      detail: 'Target Population: 2,450 | Severity: CRITICAL | Mandate: Autonomous Protection',
      confidence: 1.0,
      status: 'completed',
      actionType: 'OBJECTIVE_FORMULATION',
      toolUsed: 'Incident Database',
      inputData: '{ zone: "Flood Zone A", severity: "CRITICAL", waterRiseRate: "+0.45m/hr" }',
      outputData: '{ objectiveId: "OBJ-FLOOD-A-01", targetPopulation: 2450, priority: 1, extractionRequired: true }',
      rationale: 'Flash flood alert triggered priority 1 mandate. Agent formalizes mathematical constraint: extract civilians before water breach threshold.'
    }
  },
  // 2. OBSERVE
  {
    step: 'OBSERVE',
    stage: 'OBSERVE',
    label: '2. OBSERVE',
    sublabel: 'Multimodal Sensor & Asset Ingestion',
    description: 'Ingesting weather, incident severity, population, rescue teams, shelters, and routes.',
    routeR1Blocked: false,
    selectedRoute: 'r1',
    activeTeamId: 'team-2',
    team2Status: 'STANDBY',
    team4Status: 'STANDBY',
    event: {
      stage: 'OBSERVE',
      title: 'Weather, incident, resource and route information retrieved.',
      description: 'Retrieved situational parameters: Weather: Gale winds + heavy rain | Severity: CRITICAL | Population: 2,450 | Teams: 3 units | Shelters: Shelter B (560 cap) | Routes: R1 & R3.',
      detail: 'Telemetry: River Gauge +0.45m/hr | 3 Teams Active | Route R1 Clear | Shelter B 560 beds',
      confidence: 0.98,
      status: 'completed',
      actionType: 'SENSOR_INGESTION',
      toolUsed: 'Weather Service & Resource Database',
      inputData: '{ queries: ["WeatherService.Current", "ResourceDB.Teams", "ShelterDB.Capacity", "RouteEngine.Status"] }',
      outputData: '{ weather: "Severe Gale & Rain", unitsAvailable: 3, routesQueried: ["R1", "R3"], sheltersReady: ["Shelter B (560 beds)"] }',
      rationale: 'Ingests environmental and operational telemetry across 4 simulated services to construct current world state representation.'
    }
  },
  // 3. DECIDE
  {
    step: 'DECIDE',
    stage: 'DECIDE',
    label: '3. DECIDE',
    sublabel: 'Constraint & Suitability Optimization',
    description: 'Selected Team 2 because it is the best available team.',
    routeR1Blocked: false,
    selectedRoute: 'r1',
    activeTeamId: 'team-2',
    team2Status: 'STANDBY',
    team4Status: 'STANDBY',
    event: {
      stage: 'DECIDE',
      title: 'Team 2 selected based on distance, capacity and availability.',
      description: 'Constraint matrix ranked available units: Team 2 selected (Amphibious Swiftwater) with lowest transit ETA (11 min) and specialized watercraft capabilities.',
      detail: 'Scoring: Team 2 (96.4/100) > Team 4 (82.1/100) > Team 1 (74.0/100)',
      confidence: 0.97,
      status: 'completed',
      actionType: 'DECISION_EVALUATION',
      toolUsed: 'Resource Database',
      inputData: '{ candidateTeams: ["team-1", "team-2", "team-4"], criteria: ["ETA", "amphibiousCapability", "crewReadiness"] }',
      outputData: '{ selectedTeam: "team-2", score: 96.4, etaMinutes: 11, reason: "Fastest response with Zodiac watercraft" }',
      rationale: 'Team 2 holds swiftwater rescue equipment and has an 11-minute ETA via North Expressway Arterial (Route R1).'
    }
  },
  // 4. PLAN
  {
    step: 'PLAN',
    stage: 'PLAN',
    label: '4. PLAN',
    sublabel: 'Corridor & Ingress Route Synthesis',
    description: 'Created operational vector: Team 2 → Route R1 → Flood Zone A.',
    routeR1Blocked: false,
    selectedRoute: 'r1',
    activeTeamId: 'team-2',
    team2Status: 'STANDBY',
    team4Status: 'STANDBY',
    event: {
      stage: 'PLAN',
      title: 'Team 2 → Route R1 → Flood Zone A.',
      description: 'Tactical routing path generated: Team 2 routed via arterial Route R1 with direct highway access to Flood Zone A Sector Gate.',
      detail: 'Corridor: Route R1 | Length: 4.8 km | ETA: 11 min | Surface Risk: Low',
      confidence: 0.95,
      status: 'completed',
      actionType: 'ROUTE_SYNTHESIS',
      toolUsed: 'Route Engine',
      inputData: '{ origin: "Forward Staging Base North", destination: "Flood Zone A", avoidFlooding: true }',
      outputData: '{ routeId: "R1", name: "North Expressway Arterial", distanceKm: 4.8, etaMinutes: 11, surfaceRisk: 12 }',
      rationale: 'Synthesized topological route with lowest transit latency and confirmed passable bridges along Route R1.'
    }
  },
  // 5. ACT (Simulate dispatching Team 2)
  {
    step: 'ACT_TEAM_2',
    stage: 'ACT',
    label: '5. ACT',
    sublabel: 'Dispatch Execution for Team 2',
    description: 'Simulating dispatching Team 2 via Route R1.',
    routeR1Blocked: false,
    selectedRoute: 'r1',
    activeTeamId: 'team-2',
    team2Status: 'DISPATCHED',
    team4Status: 'STANDBY',
    event: {
      stage: 'ACT',
      title: 'Dispatch action initiated for Rescue Team 2.',
      description: 'Autonomous dispatch order issued to Rescue Team 2 (RAPTOR-2). Digital CAD coordinates uploaded to mobile terminal; sirens initiated.',
      detail: 'Token: DSP-88219-A | Unit: Rescue Team 2 | Route: R1 | ETA: 11 min',
      confidence: 0.99,
      status: 'in-progress',
      actionType: 'DISPATCH_ACTION',
      toolUsed: 'Action Simulator',
      inputData: '{ command: "CAD_DISPATCH", unit: "team-2", route: "R1", codePriority: 1, sirenAuth: true }',
      outputData: '{ ack: "CAD_ACK_RECEIVED", unitStatus: "DISPATCHED", timestamp: "10:42:48", mdtSync: true }',
      rationale: 'Issued machine-to-machine dispatch instruction to mobile terminal with turn-by-turn guidance and automated civilian warning.'
    }
  },
  // 6. FAILURE (Route R1 becomes blocked)
  {
    step: 'FAILURE',
    stage: 'ADAPT',
    label: '6. FAILURE',
    sublabel: 'Obstruction & Hazard Detection',
    description: 'Unexpected condition detected: Route R1 is blocked.',
    routeR1Blocked: true,
    selectedRoute: 'r1',
    activeTeamId: 'team-2',
    team2Status: 'HALTED',
    team4Status: 'STANDBY',
    isFailureAlert: true,
    event: {
      stage: 'ADAPT',
      title: 'Unexpected condition detected: Route R1 is blocked.',
      description: 'Flash inundation overflow and fallen utility infrastructure detected at Route R1 Checkpoint 3. Route is impassable. Team 2 transit halted.',
      detail: 'ALERT: Route R1 Impassable | Depth: +1.2m over road surface | Team 2 Halted',
      confidence: 1.0,
      status: 'alert',
      actionType: 'FAILURE_DETECTION',
      toolUsed: 'Route Engine & Telemetry',
      inputData: '{ routeId: "R1", roadSensor: "SENSOR-R1-CP3", waterDepthOverRoad: 1.2, powerLineHazard: true }',
      outputData: '{ routeStatus: "BLOCKED", safetyViolation: true, team2TransitHalted: true }',
      rationale: 'Closed-loop telemetry stream detected unexpected roadway submergence exceeding safe vehicle limits. Emergency halt triggered.'
    }
  },
  // 7. ADAPT (Recognize previous plan invalid)
  {
    step: 'ADAPT',
    stage: 'ADAPT',
    label: '7. ADAPT',
    sublabel: 'Plan Invalidation & Situational Awareness',
    description: 'Agent recognizes that its previous plan (Team 2 via Route R1) is no longer valid.',
    routeR1Blocked: true,
    selectedRoute: 'r1',
    activeTeamId: 'team-2',
    team2Status: 'HALTED',
    team4Status: 'STANDBY',
    event: {
      stage: 'ADAPT',
      title: 'Plan invalidated: Ingress Route R1 compromised.',
      description: 'Cognitive loop detects critical plan failure: Route R1 obstruction prevents Team 2 from meeting target extraction window. Prior plan voided.',
      detail: 'State: PLAN_INVALIDATED | Safety constraint violated on Route R1',
      confidence: 0.98,
      status: 'alert',
      actionType: 'PLAN_INVALIDATION',
      toolUsed: 'Crisis Orchestrator',
      inputData: '{ activePlan: "PLAN-R1-TEAM2", failureReason: "ROUTE_BLOCKED", teamStatus: "HALTED" }',
      outputData: '{ planStatus: "VOIDED", stateTransition: "TRIGGER_REPLAN", adaptationReason: "CORRIDOR_COMPROMISED" }',
      rationale: 'Agent internal self-monitoring validates that existing operational assumptions are broken. Immediately invalidates plan to trigger replanning.'
    }
  },
  // 8. REPLAN (Evaluate alternatives: choose Team 4 -> Route R3 -> Flood Zone A)
  {
    step: 'REPLAN',
    stage: 'REPLAN',
    label: '8. REPLAN',
    sublabel: 'Contingency Re-Routing & Resource Re-Allocation',
    description: 'Evaluated alternatives and chose: Team 4 → Route R3 → Flood Zone A.',
    routeR1Blocked: true,
    selectedRoute: 'r3',
    activeTeamId: 'team-4',
    team2Status: 'HALTED',
    team4Status: 'STANDBY',
    event: {
      stage: 'REPLAN',
      title: 'Alternative selected: Team 4 → Route R3 → Flood Zone A.',
      description: 'Secondary contingency solver evaluated high-ground Valley Bypass (Route R3). Assigned heavy-transport Unit 4 with 6x6 high-water vehicles.',
      detail: 'New Vector: Team 4 → Route R3 → Flood Zone A | Elevation: Safe (+18m)',
      confidence: 0.96,
      status: 'completed',
      actionType: 'CONTINGENCY_REPLAN',
      toolUsed: 'Route Engine & Resource Database',
      inputData: '{ excludedRoutes: ["R1"], availableUnits: ["team-4", "team-1"], destination: "Flood Zone A" }',
      outputData: '{ contingencyPlan: "PLAN-R3-TEAM4", assignedTeam: "team-4", assignedRoute: "R3", etaMinutes: 19 }',
      rationale: 'Route R3 offers high-ground elevation bypass (+18m above riverbed). Team 4 possesses heavy 6x6 transport trucks ideal for evacuation.'
    }
  },
  // 9. ACT (Simulate dispatching Team 4 through Route R3)
  {
    step: 'ACT_TEAM_4',
    stage: 'ACT',
    label: '9. ACT',
    sublabel: 'Contingency Dispatch Execution',
    description: 'Simulating dispatching Team 4 through Route R3.',
    routeR1Blocked: true,
    selectedRoute: 'r3',
    activeTeamId: 'team-4',
    team2Status: 'HALTED',
    team4Status: 'DISPATCHED',
    event: {
      stage: 'ACT',
      title: 'Dispatch action initiated for Rescue Team 4 via Route R3.',
      description: 'Autonomous reroute commands issued. Rescue Team 4 (TITAN-4) dispatched with 12 specialists and 6x6 high-water transporters via Route R3.',
      detail: 'Token: DSP-99402-B | Unit: Rescue Team 4 | Route: R3 | ETA: 19 min',
      confidence: 0.99,
      status: 'in-progress',
      actionType: 'REROUTE_DISPATCH',
      toolUsed: 'Action Simulator',
      inputData: '{ command: "CAD_REROUTE_DISPATCH", unit: "team-4", route: "R3", priority: "URGENT" }',
      outputData: '{ ack: "CAD_ACK_R3", unitStatus: "DISPATCHED", convoyDeparted: true, eta: "19 min" }',
      rationale: 'Dispatched Team 4 via high-ground bypass Route R3 with automated transponder monitoring and digital corridor priority.'
    }
  },
  // 10. VERIFY (Check: correct team, route available, team capacity, shelter capacity, mission objective)
  {
    step: 'VERIFY',
    stage: 'VERIFY',
    label: '10. VERIFY',
    sublabel: '5-Point Autonomous Verification Audit',
    description: 'Auditing: Correct team, route available, team capacity, shelter capacity, and mission objective.',
    routeR1Blocked: true,
    selectedRoute: 'r3',
    activeTeamId: 'team-4',
    team2Status: 'HALTED',
    team4Status: 'EN_ROUTE',
    verificationChecks: {
      correctTeam: true,
      routeAvailable: true,
      teamCapacity: true,
      shelterCapacity: true,
      missionObjective: true
    },
    event: {
      stage: 'VERIFY',
      title: 'Plan verification complete: All 5 validation checks pass.',
      description: 'Deterministic audit confirmed: [1] Correct Team (Team 4), [2] Route Available (Route R3 Passable), [3] Team Capacity (12 Specialists), [4] Shelter Capacity (560 Beds at Shelter B), [5] Mission Objective (Flood Zone A).',
      detail: 'Checks: 5/5 PASSED | Route R3 Transponder: ACTIVE | ETA: 18 min',
      confidence: 1.0,
      status: 'completed',
      actionType: 'SAFETY_AUDIT',
      toolUsed: 'Verification Engine & All Databases',
      inputData: '{ checks: ["correctTeam", "routeAvailable", "teamCapacity", "shelterCapacity", "missionObjective"] }',
      outputData: '{ verified: true, passCount: 5, failCount: 0, complianceScore: 100 }',
      rationale: 'Autonomous safety policy requires multi-constraint verification before authorizing mass evacuation transit.'
    }
  },
  // 11. OUTCOME (Display: "MISSION COMPLETED")
  {
    step: 'OUTCOME',
    stage: 'OUTCOME',
    label: '11. OUTCOME',
    sublabel: 'Autonomous Mission Completion',
    description: 'MISSION COMPLETED: Protection and evacuation corridor successfully established.',
    routeR1Blocked: true,
    selectedRoute: 'r3',
    activeTeamId: 'team-4',
    team2Status: 'STANDBY',
    team4Status: 'ON_SCENE',
    isMissionCompleted: true,
    verificationChecks: {
      correctTeam: true,
      routeAvailable: true,
      teamCapacity: true,
      shelterCapacity: true,
      missionObjective: true
    },
    event: {
      stage: 'OUTCOME',
      title: 'MISSION COMPLETED: Rescue corridor secured.',
      description: 'Rescue Team 4 arrives on scene at Flood Zone A via Route R3. Evacuation convoy initiated toward Shelter B. Civilian protection objective achieved.',
      detail: 'OUTCOME: MISSION COMPLETED | Civilians in Transit: 320 | Safe Haven: Shelter B',
      confidence: 1.0,
      status: 'completed',
      actionType: 'MISSION_COMPLETION',
      toolUsed: 'Crisis Orchestrator',
      inputData: '{ missionId: "OBJ-FLOOD-A-01", destination: "Shelter B", extractionCount: 320 }',
      outputData: '{ missionStatus: "COMPLETED", evacuationActive: true, civilianCorridorSecured: true }',
      rationale: 'Protection directive successfully fulfilled through closed-loop failure detection, adaptive replanning, and verified execution.'
    }
  }
];

export const INITIAL_MISSION: MissionData = {
  title: "Protect residents in Flood Zone A",
  zone: "Flood Zone A",
  priority: "CRITICAL",
  populationAtRisk: 2450,
  activeIncidents: 1,
  rescueTeamsCount: 3,
  shelterCapacityAvailable: 560,
  waterLevelTrend: "+0.45m/hr (Rising)",
  weatherCondition: "Severe Gale & Heavy Precipitation",
};

export const INITIAL_EVENTS: ActivityEvent[] = [
  {
    id: 'evt-1',
    timestamp: '10:42:01',
    ...DEMO_STEPS[0].event
  }
];

export const RESCUE_TEAMS: RescueTeam[] = [
  {
    id: 'team-2',
    name: 'Rescue Team 2',
    callsign: 'RAPTOR-2 (Amphibious Swiftwater)',
    personnelCount: 8,
    equipment: ['Zodiac Inflatable Boats (x2)', 'Hydraulic Winch Rig', 'Advanced Triage Kit', 'FLIR Thermal Drones'],
    status: 'STANDBY',
    location: 'Forward Staging Base North (4.2 km away)',
    assignedRoute: 'Route R1',
    coordinates: { x: 26, y: 72 },
    vehicleType: 'Amphibious ARGO 8x8 & Zodiac Fast-Rescue',
    evacCapacityPerTrip: 35,
    waterDepthRating: 'Floating / Unlimited (Watercraft)',
    readinessPercentage: 100,
    telemetryPing: '18ms (Cellular + SATCOM)'
  },
  {
    id: 'team-4',
    name: 'Rescue Team 4',
    callsign: 'TITAN-4 (Heavy Logistics / Evac)',
    personnelCount: 12,
    equipment: ['High-Water 6x6 Heavy Transporters (x2)', '150kVA Mobile Generator', 'Field Hospital Tent', 'Emergency Food Rations'],
    status: 'STANDBY',
    location: 'District Depot South (8.7 km away)',
    assignedRoute: 'Route R3',
    coordinates: { x: 74, y: 80 },
    vehicleType: 'Tactical 6x6 High-Water Heavy Evac',
    evacCapacityPerTrip: 60,
    waterDepthRating: '1.4 meters (Wading Depth)',
    readinessPercentage: 100,
    telemetryPing: '24ms (Digital VHF + SATCOM)'
  },
  {
    id: 'team-1',
    name: 'Rescue Team 1',
    callsign: 'AERO-1 (Air Recon & Hoist)',
    personnelCount: 4,
    equipment: ['Bell 412 Search Helicopter', 'Night Sun 30M Candlepower FLIR', 'Dual Dynamic Hoist Basket'],
    status: 'STANDBY',
    location: 'County Helipad East (12.1 km away)',
    coordinates: { x: 88, y: 25 },
    vehicleType: 'Twin-Engine Medevac Utility Rotorcraft',
    evacCapacityPerTrip: 6,
    waterDepthRating: 'Airborne (Overflight Only)',
    readinessPercentage: 95,
    telemetryPing: '12ms (ADS-B Transponder)'
  }
];

export const SHELTERS: Shelter[] = [
  {
    id: 'shelter-b',
    name: 'Shelter B — North Civic Complex',
    location: 'North High School Civic Complex (High Ground)',
    capacityAvailable: 560,
    totalCapacity: 800,
    currentOccupancy: 240,
    medicalSupport: true,
    elevationMeters: 28,
    suppliesDays: 14,
    generatorBackup: true,
    statusTag: 'PRIMARY SAFE HAVEN',
    coordinates: { x: 78, y: 28 }
  },
  {
    id: 'shelter-a',
    name: 'Shelter A — Sports Arena',
    location: 'South Community Sports Arena (Main Hall)',
    capacityAvailable: 120,
    totalCapacity: 600,
    currentOccupancy: 480,
    medicalSupport: true,
    elevationMeters: 19,
    suppliesDays: 6,
    generatorBackup: true,
    statusTag: 'HIGH DENSITY (80% FULL)',
    coordinates: { x: 38, y: 84 }
  },
  {
    id: 'shelter-c',
    name: 'Shelter C — Regional College',
    location: 'East Regional College Hall (Hilltop Campus)',
    capacityAvailable: 450,
    totalCapacity: 500,
    currentOccupancy: 50,
    medicalSupport: true,
    elevationMeters: 34,
    suppliesDays: 21,
    generatorBackup: true,
    statusTag: 'STANDBY RESERVE',
    coordinates: { x: 86, y: 64 }
  }
];

export const ROUTES: RouteInfo[] = [
  {
    id: 'r1',
    name: 'Route R1 (North Expressway Arterial)',
    from: 'Forward Staging Base North',
    to: 'Flood Zone A Sector Gate',
    status: 'CLEAR',
    riskScore: 12,
    distanceKm: 4.8,
    etaMinutes: 11
  },
  {
    id: 'r3',
    name: 'Route R3 (Valley Ridge Bypass)',
    from: 'District Depot South',
    to: 'Flood Zone A Southern Ingress',
    status: 'CAUTION',
    riskScore: 38,
    distanceKm: 9.4,
    etaMinutes: 19
  }
];
