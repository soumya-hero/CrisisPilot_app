import { useState } from 'react';
import { 
  Navigation, 
  Layers, 
  Compass, 
  MapPin, 
  Shield, 
  Truck, 
  AlertTriangle, 
  Eye, 
  Crosshair,
  Maximize2,
  XCircle,
  CheckCircle2
} from 'lucide-react';
import { RescueTeam, Shelter, RouteInfo } from '../types';

interface SimulatedMapProps {
  rescueTeams: RescueTeam[];
  shelters: Shelter[];
  routes: RouteInfo[];
  selectedRoute?: 'r1' | 'r3';
  routeR1Blocked?: boolean;
  activeStage: string;
  activeTeamId?: 'team-2' | 'team-4';
  isMissionCompleted?: boolean;
}

export function SimulatedMap({ 
  rescueTeams, 
  shelters, 
  routes, 
  selectedRoute = 'r1', 
  routeR1Blocked = false,
  activeStage,
  activeTeamId = 'team-2',
  isMissionCompleted = false
}: SimulatedMapProps) {
  const [showFloodZone, setShowFloodZone] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);
  const [showUnits, setShowUnits] = useState(true);

  const team2 = rescueTeams.find(t => t.id === 'team-2') || rescueTeams[0];
  const team4 = rescueTeams.find(t => t.id === 'team-4') || rescueTeams[1];
  const shelterB = shelters.find(s => s.id === 'shelter-b') || shelters[0];

  return (
    <div 
      id="tactical-incident-map" 
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
    >
      {/* Map Header Bar */}
      <div className="bg-slate-900 text-slate-100 px-5 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">
              TACTICAL INCIDENT MAP
            </span>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>Geospatial Sector Grid: Flood Zone A</span>
              <span className={`inline-block w-2 h-2 rounded-full ${
                routeR1Blocked ? 'bg-red-500 animate-ping' : 'bg-emerald-400 animate-pulse'
              }`}></span>
            </div>
          </div>
        </div>

        {/* Dynamic Route Status Pill in Header */}
        <div className="flex items-center gap-2 text-xs">
          {routeR1Blocked ? (
            <div className="flex items-center gap-1.5 bg-red-950/80 border border-red-500/80 px-2.5 py-1 rounded text-red-300 font-mono text-[11px] animate-pulse">
              <XCircle className="w-3.5 h-3.5 text-red-400" />
              <span>ROUTE R1: BLOCKED (SUBMERGED)</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-cyan-950/80 border border-cyan-500/60 px-2.5 py-1 rounded text-cyan-300 font-mono text-[11px]">
              <Navigation className="w-3.5 h-3.5 text-cyan-400" />
              <span>ROUTE R1: PRIMARY ARTERIAL</span>
            </div>
          )}

          {selectedRoute === 'r3' && (
            <div className="flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/80 px-2.5 py-1 rounded text-emerald-300 font-mono text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>ROUTE R3: ACTIVE BYPASS</span>
            </div>
          )}
        </div>
      </div>

      {/* Map Graphic Canvas - HTML / CSS / SVG Tactical Visualizer */}
      <div 
        className="relative w-full h-[380px] md:h-[430px] bg-[#090f1d] overflow-hidden select-none"
      >
        {/* Synthetic Map Background Grid & Topography Lines */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #1e293b 1px, transparent 1px),
              linear-gradient(to bottom, #1e293b 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Tactical Radial Distance Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
          <div className="w-[200px] h-[200px] rounded-full border border-blue-400/40"></div>
          <div className="w-[400px] h-[400px] rounded-full border border-blue-400/30 absolute"></div>
          <div className="w-[600px] h-[600px] rounded-full border border-blue-400/20 absolute"></div>
        </div>

        {/* Compass Rose Top-Right */}
        <div className="absolute top-4 right-4 z-20 pointer-events-none bg-slate-900/85 backdrop-blur-sm border border-slate-800 rounded-lg p-2 flex flex-col items-center">
          <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-slate-300 text-[10px] font-mono relative">
            <span className="absolute -top-1 font-bold text-red-400">N</span>
            <span className="absolute -right-0.5 text-slate-400">E</span>
            <span className="absolute -bottom-1 text-slate-400">S</span>
            <span className="absolute -left-0.5 text-slate-400">W</span>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
          </div>
          <span className="text-[9px] font-mono text-slate-400 mt-1">SCALE 1:25k</span>
        </div>

        {/* SVG Tactical Vector Overlays */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="none" viewBox="0 0 1000 600">
          <defs>
            <pattern id="hazard-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 0,10 Q 5,5 10,10 T 20,10" fill="none" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="1" />
            </pattern>
            <linearGradient id="route1-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#06b6d4" stopOpacity="1" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="route3-active-grad" x1="100%" y1="100%" x2="40%" y2="40%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
            </linearGradient>
            <filter id="glow-r3" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* FLOOD ZONE A SHAPE */}
          {showFloodZone && (
            <g>
              <polygon
                points="340,160 560,140 680,240 650,390 520,440 370,400 310,270"
                fill="rgba(220, 38, 38, 0.15)"
                stroke="rgba(239, 68, 68, 0.7)"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                className="animate-pulse"
              />
              <polygon
                points="340,160 560,140 680,240 650,390 520,440 370,400 310,270"
                fill="url(#hazard-pattern)"
                opacity="0.3"
              />
              <polygon
                points="400,210 540,190 610,260 580,350 470,370 380,300"
                fill="rgba(59, 130, 246, 0.25)"
                stroke="rgba(96, 165, 250, 0.6)"
                strokeWidth="1.5"
              />
            </g>
          )}

          {/* ROUTE R1 VECTOR */}
          {showRoutes && (
            <g>
              {routeR1Blocked ? (
                // BLOCKED ROUTE R1 (Red, severed, warning)
                <>
                  <path
                    d="M 180,450 C 230,420 270,390 330,360"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="4"
                    strokeDasharray="6 4"
                  />
                  <path
                    d="M 330,360 S 410,320 480,280"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                    strokeDasharray="3 3"
                    strokeOpacity="0.4"
                  />
                  {/* Big Red 'X' Obstruction Marker on Route R1 */}
                  <circle cx="330" cy="360" r="14" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeWidth="2" className="animate-ping" />
                  <circle cx="330" cy="360" r="10" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2" />
                  <line x1="324" y1="354" x2="336" y2="366" stroke="#ffffff" strokeWidth="2.5" />
                  <line x1="336" y1="354" x2="324" y2="366" stroke="#ffffff" strokeWidth="2.5" />
                </>
              ) : (
                // NORMAL ROUTE R1
                <>
                  <path
                    d="M 180,450 C 230,420 270,390 330,360 S 410,320 480,280"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="6"
                    strokeOpacity="0.25"
                  />
                  <path
                    d="M 180,450 C 230,420 270,390 330,360 S 410,320 480,280"
                    fill="none"
                    stroke="url(#route1-grad)"
                    strokeWidth="3.5"
                    strokeDasharray="10 5"
                    className="animate-pulse"
                  />
                  <circle cx="330" cy="360" r="4" fill="#06b6d4" stroke="#ffffff" strokeWidth="1.5" />
                </>
              )}

              {/* ROUTE R3 VECTOR */}
              {selectedRoute === 'r3' ? (
                // ROUTE R3 AS PRIMARY ACTIVE (Glows vibrant emerald/cyan)
                <>
                  <path
                    d="M 780,480 C 720,480 670,460 620,440 S 550,400 510,370"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeOpacity="0.35"
                    filter="url(#glow-r3)"
                  />
                  <path
                    d="M 780,480 C 720,480 670,460 620,440 S 550,400 510,370"
                    fill="none"
                    stroke="url(#route3-active-grad)"
                    strokeWidth="4"
                    strokeDasharray="10 4"
                    className="animate-pulse"
                  />
                  <circle cx="620" cy="440" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                </>
              ) : (
                // ROUTE R3 AS STANDBY (Muted Amber)
                <>
                  <path
                    d="M 780,480 C 720,480 670,460 620,440 S 550,400 510,370"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                    strokeDasharray="6 6"
                    strokeOpacity="0.75"
                  />
                  <circle cx="620" cy="440" r="3.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                </>
              )}

              {/* Safe Evac Corridor to Shelter B */}
              <path
                d="M 520,220 C 580,180 660,150 760,135"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                strokeOpacity="0.8"
              />
            </g>
          )}
        </svg>

        {/* 1. FLOOD ZONE A HTML BADGE */}
        {showFloodZone && (
          <div 
            id="map-flood-zone-a"
            className="absolute top-[35%] left-[38%] md:left-[42%] z-20 pointer-events-auto transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="bg-red-950/90 border-2 border-red-500/90 text-white px-3 py-1.5 rounded-lg shadow-xl shadow-red-950/70 backdrop-blur-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
              <div>
                <div className="text-xs font-bold font-mono tracking-wide text-red-200">
                  FLOOD ZONE A
                </div>
                <div className="text-[10px] text-red-300 font-medium">
                  Depth: +1.8m • 2,450 at risk
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. RESCUE TEAM 2 MARKER */}
        {showUnits && (
          <div 
            id="map-rescue-team-2"
            className="absolute top-[72%] left-[16%] md:left-[17%] z-25 pointer-events-auto transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="group relative">
              {team2.status === 'DISPATCHED' && !routeR1Blocked && (
                <span className="absolute -inset-2 rounded-full bg-blue-500/30 animate-ping"></span>
              )}
              
              <div className={`relative p-2 rounded-full shadow-lg ring-2 ring-white flex items-center justify-center ${
                team2.status === 'HALTED' 
                  ? 'bg-amber-600 text-white shadow-amber-600/50' 
                  : team2.status === 'DISPATCHED'
                  ? 'bg-blue-600 text-white shadow-blue-500/50'
                  : 'bg-slate-700 text-slate-200'
              }`}>
                <Truck className="w-4 h-4" />
              </div>

              {/* Marker Label */}
              <div className="absolute left-1/2 -translate-x-1/2 top-9 whitespace-nowrap bg-slate-900/95 border border-slate-700 px-2.5 py-1 rounded shadow-lg text-[11px] font-mono text-white flex flex-col items-center">
                <span className="font-bold text-slate-200">Rescue Team 2</span>
                <span className={`text-[9px] font-semibold tracking-wider ${
                  team2.status === 'HALTED' 
                    ? 'text-amber-400 animate-pulse' 
                    : team2.status === 'DISPATCHED'
                    ? 'text-cyan-400'
                    : 'text-slate-400'
                }`}>
                  {team2.status === 'HALTED' ? 'HALTED / HOLDING' : team2.status}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 3. RESCUE TEAM 4 MARKER */}
        {showUnits && (
          <div 
            id="map-rescue-team-4"
            className="absolute top-[78%] left-[76%] md:left-[78%] z-25 pointer-events-auto transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="group relative">
              {(team4.status === 'DISPATCHED' || team4.status === 'EN_ROUTE') && (
                <>
                  <span className="absolute -inset-2 rounded-full bg-emerald-500/40 animate-ping"></span>
                  <span className="absolute -inset-1 rounded-full bg-emerald-400/50"></span>
                </>
              )}

              <div className={`relative p-2 rounded-full shadow-lg ring-2 ring-white flex items-center justify-center ${
                team4.status === 'ON_SCENE'
                  ? 'bg-emerald-600 text-white shadow-emerald-500/50'
                  : team4.status === 'DISPATCHED' || team4.status === 'EN_ROUTE'
                  ? 'bg-emerald-600 text-white shadow-emerald-500/50'
                  : 'bg-slate-700 text-slate-200'
              }`}>
                <Truck className="w-4 h-4" />
              </div>

              {/* Marker Label */}
              <div className="absolute left-1/2 -translate-x-1/2 top-9 whitespace-nowrap bg-slate-900/95 border border-slate-700 px-2.5 py-1 rounded shadow-lg text-[11px] font-mono text-white flex flex-col items-center">
                <span className="font-bold text-slate-200">Rescue Team 4</span>
                <span className={`text-[9px] font-semibold ${
                  team4.status === 'ON_SCENE'
                    ? 'text-emerald-300 font-bold'
                    : team4.status === 'DISPATCHED' || team4.status === 'EN_ROUTE'
                    ? 'text-emerald-400 font-bold'
                    : 'text-amber-400'
                }`}>
                  {team4.status === 'DISPATCHED' ? 'DISPATCHED (VIA R3)' : team4.status}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 4. SHELTER B MARKER */}
        {showUnits && (
          <div 
            id="map-shelter-b"
            className="absolute top-[20%] left-[74%] md:left-[76%] z-25 pointer-events-auto transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="group relative">
              <span className="absolute -inset-1.5 rounded-full bg-emerald-500/30 animate-pulse"></span>
              
              <div className="relative bg-emerald-600 text-white p-2 rounded-full shadow-lg shadow-emerald-500/40 ring-2 ring-white flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>

              {/* Marker Label */}
              <div className="absolute left-1/2 -translate-x-1/2 top-9 whitespace-nowrap bg-slate-900/95 border border-emerald-500/60 px-2.5 py-1 rounded shadow-lg text-[11px] font-mono text-white flex flex-col items-center">
                <span className="font-bold text-emerald-300">Shelter B</span>
                <span className="text-[9px] text-emerald-400 font-semibold">
                  560 CAP AVAILABLE
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 5. ROUTE R1 ON-CANVAS PILL */}
        {showRoutes && (
          <div 
            id="map-route-r1-label"
            className="absolute top-[58%] left-[27%] z-20 pointer-events-none"
          >
            {routeR1Blocked ? (
              <div className="bg-red-950/95 border-2 border-red-500 text-red-200 px-2.5 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-lg animate-pulse">
                <XCircle className="w-3.5 h-3.5 text-red-400" />
                <span>Route R1 [BLOCKED: SUBMERGED]</span>
              </div>
            ) : (
              <div className="bg-cyan-950/90 border border-cyan-400/70 text-cyan-200 px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 shadow-md">
                <Navigation className="w-3 h-3 text-cyan-300 rotate-45" />
                <span>Route R1 (Primary Ingress)</span>
              </div>
            )}
          </div>
        )}

        {/* 6. ROUTE R3 ON-CANVAS PILL */}
        {showRoutes && (
          <div 
            id="map-route-r3-label"
            className="absolute top-[70%] left-[60%] z-20 pointer-events-none"
          >
            {selectedRoute === 'r3' ? (
              <div className="bg-emerald-950/95 border-2 border-emerald-400 text-emerald-200 px-2.5 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-lg">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Route R3 [ACTIVE REPLAN CORRIDOR]</span>
              </div>
            ) : (
              <div className="bg-amber-950/90 border border-amber-500/70 text-amber-200 px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 shadow-md">
                <Navigation className="w-3 h-3 text-amber-300 rotate-45" />
                <span>Route R3 (Valley Bypass)</span>
              </div>
            )}
          </div>
        )}

        {/* Tactical Info Overlay Bar at Bottom */}
        <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="bg-slate-900/90 backdrop-blur-sm border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${routeR1Blocked ? 'bg-red-500' : 'bg-cyan-400'}`}></span>
              <span className="font-mono text-[11px]">
                {routeR1Blocked ? 'R1: BLOCKED' : 'R1: Team 2 Corridor'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${selectedRoute === 'r3' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              <span className="font-mono text-[11px]">
                {selectedRoute === 'r3' ? 'R3: ACTIVE REPLAN DISPATCH' : 'R3: Standby Corridor'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="font-mono text-[11px]">Shelter B: 560 Ready</span>
            </div>
          </div>

          <div className="bg-slate-900/90 backdrop-blur-sm border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] font-mono flex items-center gap-2">
            <span className="text-slate-400">TACTICAL DISPATCH:</span>
            {selectedRoute === 'r3' ? (
              <span className="text-emerald-400 font-bold">TEAM 4 EN ROUTE VIA R3 (ETA: 19 MIN)</span>
            ) : routeR1Blocked ? (
              <span className="text-red-400 font-bold">R1 BLOCKED • HALTING DISPATCH</span>
            ) : (
              <span className="text-cyan-400 font-bold">TEAM 2 DISPATCHED VIA R1 (ETA: 11 MIN)</span>
            )}
          </div>
        </div>
      </div>

      {/* Map Legend / Operational Data Strip Below Canvas */}
      <div className="bg-slate-50 p-3.5 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-slate-200">
          <div className="w-3 h-3 rounded bg-red-500 shrink-0"></div>
          <div>
            <div className="font-semibold text-slate-800">Flood Zone A</div>
            <div className="text-[11px] text-slate-500">Critical Breach / Priority 1</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-slate-200">
          <div className={`w-3 h-3 rounded shrink-0 ${team2.status === 'HALTED' ? 'bg-amber-600' : 'bg-blue-600'}`}></div>
          <div>
            <div className="font-semibold text-slate-800">Rescue Team 2</div>
            <div className="text-[11px] text-slate-500">
              {team2.status === 'HALTED' ? 'Halted (R1 Impassable)' : '8 Specialists (Amphibious)'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-slate-200">
          <div className={`w-3 h-3 rounded shrink-0 ${selectedRoute === 'r3' ? 'bg-emerald-500' : 'bg-slate-600'}`}></div>
          <div>
            <div className="font-semibold text-slate-800">Rescue Team 4</div>
            <div className="text-[11px] text-slate-500">
              {selectedRoute === 'r3' ? 'Active Dispatch (Route R3)' : '12 Specialists (Heavy 6x6)'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-slate-200">
          <div className="w-3 h-3 rounded bg-emerald-500 shrink-0"></div>
          <div>
            <div className="font-semibold text-slate-800">Shelter B</div>
            <div className="text-[11px] text-slate-500">560 Available Beds (Safe Elevation)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
