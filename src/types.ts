export type AgentStage = 
  | 'GOAL' 
  | 'OBSERVE' 
  | 'DECIDE' 
  | 'PLAN' 
  | 'ACT' 
  | 'VERIFY' 
  | 'ADAPT' 
  | 'REPLAN' 
  | 'OUTCOME';

export type SimulationStep =
  | 'GOAL'
  | 'OBSERVE'
  | 'DECIDE'
  | 'PLAN'
  | 'ACT_TEAM_2'
  | 'FAILURE'
  | 'ADAPT'
  | 'REPLAN'
  | 'ACT_TEAM_4'
  | 'VERIFY'
  | 'OUTCOME';

export interface VerificationChecks {
  correctTeam: boolean;
  routeAvailable: boolean;
  teamCapacity: boolean;
  shelterCapacity: boolean;
  missionObjective: boolean;
}

export interface ActivityEvent {
  id: string;
  stage: AgentStage;
  timestamp: string;
  title: string;
  description: string;
  detail?: string;
  confidence?: number;
  status: 'completed' | 'in-progress' | 'pending' | 'alert' | 'failed';
  actionType?: string;
  toolUsed?: string;
  inputData?: string;
  outputData?: string;
  rationale?: string;
}

export interface RescueTeam {
  id: string;
  name: string;
  callsign: string;
  personnelCount: number;
  equipment: string[];
  status: 'DISPATCHED' | 'STANDBY' | 'EN_ROUTE' | 'ON_SCENE' | 'HALTED';
  location: string;
  assignedRoute?: string;
  coordinates: { x: number; y: number };
  vehicleType?: string;
  evacCapacityPerTrip?: number;
  waterDepthRating?: string;
  readinessPercentage?: number;
  telemetryPing?: string;
}

export interface Shelter {
  id: string;
  name: string;
  location: string;
  capacityAvailable: number;
  totalCapacity: number;
  medicalSupport: boolean;
  coordinates: { x: number; y: number };
  elevationMeters?: number;
  currentOccupancy?: number;
  suppliesDays?: number;
  generatorBackup?: boolean;
  statusTag?: string;
}

export interface RouteInfo {
  id: string;
  name: string;
  from: string;
  to: string;
  status: 'CLEAR' | 'CAUTION' | 'ELEVATED_RISK' | 'IMPASSABLE' | 'BLOCKED';
  riskScore: number;
  distanceKm: number;
  etaMinutes: number;
}

export interface MissionData {
  title: string;
  zone: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  populationAtRisk: number;
  activeIncidents: number;
  rescueTeamsCount: number;
  shelterCapacityAvailable: number;
  waterLevelTrend: string;
  weatherCondition: string;
}

export type NavSection = 'command-center' | 'agent-activity' | 'resources' | 'architecture';
