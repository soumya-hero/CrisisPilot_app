import { 
  Truck, 
  ShieldCheck, 
  Navigation, 
  HeartPulse, 
  Radio, 
  AlertTriangle, 
  Users, 
  Compass, 
  Zap, 
  Clock, 
  CheckCircle2, 
  Activity,
  Waves,
  Building2,
  Boxes
} from 'lucide-react';
import { RescueTeam, Shelter, RouteInfo } from '../types';

interface ResourcesViewProps {
  rescueTeams: RescueTeam[];
  shelters: Shelter[];
  routes: RouteInfo[];
}

export function ResourcesView({ rescueTeams, shelters, routes }: ResourcesViewProps) {
  // Aggregate stats
  const totalSpecialists = rescueTeams.reduce((acc, t) => acc + t.personnelCount, 0);
  const totalBeds = shelters.reduce((acc, s) => acc + s.totalCapacity, 0);
  const availableBeds = shelters.reduce((acc, s) => acc + s.capacityAvailable, 0);
  const occupiedBeds = shelters.reduce((acc, s) => acc + (s.currentOccupancy ?? (s.totalCapacity - s.capacityAvailable)), 0);
  const networkOccupancyRate = Math.round((occupiedBeds / totalBeds) * 100);

  return (
    <div id="resources-view" className="space-y-6">
      {/* Top Banner with High-Level Telemetry */}
      <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[11px] font-mono font-bold bg-blue-900/80 text-blue-300 border border-blue-700/60 rounded">
              SIMULATED ASSET DIRECTORY
            </span>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              ALL TELEMETRY SYNCHRONIZED
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white mt-1.5">
            Emergency Resources, Fleet &amp; Shelters
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Simulated operational inventory for autonomous dispatch: live rescue team availability, multi-tier capacity metrics, transit corridors, and real-time shelter occupancy tracking.
          </p>
        </div>

        {/* Global Stats Counter */}
        <div className="grid grid-cols-3 gap-2 shrink-0">
          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 text-center min-w-[100px]">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Rescue Teams</span>
            <span className="text-base font-bold text-blue-400">{rescueTeams.length} Active</span>
            <span className="text-[10px] text-slate-500 block">{totalSpecialists} Specialists</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 text-center min-w-[100px]">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Shelter Beds</span>
            <span className="text-base font-bold text-emerald-400">{availableBeds} Avail</span>
            <span className="text-[10px] text-slate-500 block">of {totalBeds} total</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 text-center min-w-[100px]">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Network Occupancy</span>
            <span className="text-base font-bold text-amber-400">{networkOccupancyRate}%</span>
            <span className="text-[10px] text-slate-500 block">{occupiedBeds} occupied</span>
          </div>
        </div>
      </div>

      {/* 1. RESCUE TEAMS (Location, Capacity, Availability) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Truck className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="font-bold text-base">Rescue Teams</h3>
              <p className="text-[11px] text-slate-400">Team deployment location, crew &amp; evac capacity, and dynamic availability</p>
            </div>
          </div>
          <span className="px-2.5 py-1 text-xs font-mono font-bold bg-blue-950 text-blue-300 border border-blue-800 rounded">
            {rescueTeams.length} UNITS MONITORED
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {rescueTeams.map((team) => {
            const isDispatched = team.status === 'DISPATCHED' || team.status === 'EN_ROUTE';
            const isHalted = team.status === 'HALTED';
            const isOnScene = team.status === 'ON_SCENE';

            // Badge styling based on availability
            let statusBadgeClass = 'bg-slate-100 text-slate-700 border-slate-300';
            let availabilityText = 'AVAILABLE / 100% READY';
            if (isDispatched) {
              statusBadgeClass = 'bg-blue-100 text-blue-800 border-blue-300 animate-pulse';
              availabilityText = team.assignedRoute ? `COMMITTED TO ${team.assignedRoute}` : 'DISPATCHED';
            } else if (isHalted) {
              statusBadgeClass = 'bg-red-100 text-red-800 border-red-300';
              availabilityText = 'HALTED (AWAITING REROUTE)';
            } else if (isOnScene) {
              statusBadgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-300';
              availabilityText = 'ON SCENE (RESCUE ACTIVE)';
            }

            return (
              <div key={team.id} className="p-6 hover:bg-slate-50/50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  {/* Team Identity & Location */}
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className={`p-2.5 rounded-lg shrink-0 ${
                        isDispatched ? 'bg-blue-600 text-white' : 
                        isHalted ? 'bg-red-600 text-white' : 
                        isOnScene ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-white'
                      }`}>
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-base font-bold text-slate-900">{team.name}</h4>
                          <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                            {team.callsign}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">
                          ID: {team.id.toUpperCase()} • Telemetry: {team.telemetryPing || '20ms (SATCOM)'}
                        </div>
                      </div>
                    </div>

                    {/* Team Location Box */}
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-blue-600" />
                          <strong>Team Location:</strong>
                        </span>
                        <span className="font-mono text-slate-600 text-[11px]">
                          GRID COORDS: [{team.coordinates.x}.0°N, {team.coordinates.y}.0°W]
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-800 mt-1">
                        {team.location}
                      </p>
                      {team.assignedRoute && (
                        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-blue-700 font-medium">
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Assigned Vector: <strong>{team.assignedRoute}</strong></span>
                        </div>
                      )}
                    </div>

                    {/* Equipment Inventory */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">
                        EQUIPMENT &amp; TOOLS:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {team.equipment.map((eq) => (
                          <span key={eq} className="px-2 py-0.5 rounded bg-white text-slate-700 text-xs border border-slate-200 shadow-xs">
                            {eq}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Team Capacity & Availability Metrics */}
                  <div className="lg:w-80 shrink-0 space-y-3 bg-slate-50/70 p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-xs font-mono text-slate-500 uppercase font-bold">AVAILABILITY</span>
                      <span className={`px-2.5 py-0.5 text-xs font-mono font-bold rounded-full border ${statusBadgeClass}`}>
                        {team.status}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-slate-800">
                      Status: <span className="text-blue-700">{availabilityText}</span>
                    </div>

                    {/* Capacity Grid */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] font-mono text-slate-400 block uppercase">Crew Size</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span className="text-base font-bold text-slate-900">{team.personnelCount}</span>
                          <span className="text-[11px] text-slate-500">crew</span>
                        </div>
                      </div>

                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] font-mono text-slate-400 block uppercase">Evac Capacity</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Boxes className="w-4 h-4 text-emerald-600" />
                          <span className="text-base font-bold text-slate-900">
                            {team.evacCapacityPerTrip || 35}
                          </span>
                          <span className="text-[11px] text-slate-500">/trip</span>
                        </div>
                      </div>
                    </div>

                    {/* Water Rating & Vehicle Specs */}
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-[11px]">Water Capability:</span>
                        <span className="font-mono font-semibold text-slate-800 text-[11px]">
                          {team.waterDepthRating || 'Amphibious'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-[11px]">Vehicle Spec:</span>
                        <span className="text-slate-800 text-[11px] truncate max-w-[150px]" title={team.vehicleType}>
                          {team.vehicleType || 'Standard Rapid Response'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. SHELTERS & SHELTER OCCUPANCY */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-bold text-base">Shelters &amp; Shelter Occupancy</h3>
              <p className="text-[11px] text-slate-400">Designated evacuation safe havens, current occupant census, and available bed capacity</p>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            TOTAL NETWORK CAPACITY: {totalBeds} BEDS
          </span>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {shelters.map((shelter) => {
            const currentOccupants = shelter.currentOccupancy ?? (shelter.totalCapacity - shelter.capacityAvailable);
            const occupancyPercentage = Math.round((currentOccupants / shelter.totalCapacity) * 100);
            const isHighGround = shelter.id === 'shelter-b';
            const isNearCapacity = occupancyPercentage >= 75;

            // Bar color
            let progressColor = 'bg-emerald-500';
            if (occupancyPercentage >= 80) progressColor = 'bg-red-500';
            else if (occupancyPercentage >= 50) progressColor = 'bg-amber-500';

            return (
              <div 
                key={shelter.id} 
                className={`rounded-xl border p-5 flex flex-col justify-between space-y-4 transition-all ${
                  isHighGround 
                    ? 'border-emerald-300 bg-emerald-50/20 ring-2 ring-emerald-500/20' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                {/* Header */}
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded ${
                      isHighGround 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                        : isNearCapacity
                        ? 'bg-red-100 text-red-800 border border-red-200'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      {shelter.statusTag || 'EMERGENCY SHELTER'}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      +{shelter.elevationMeters || 25}m Elev.
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-slate-900">{shelter.name}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{shelter.location}</p>
                </div>

                {/* Shelter Occupancy Meter */}
                <div className="space-y-2 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-500 uppercase font-semibold text-[11px]">
                      Shelter Occupancy
                    </span>
                    <span className="font-mono font-bold text-slate-900">
                      {occupancyPercentage}% full
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${progressColor} transition-all duration-500`}
                      style={{ width: `${occupancyPercentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <div>
                      <span className="text-slate-400 text-[10px] block">CURRENT OCCUPANCY</span>
                      <span className="font-bold text-slate-800">{currentOccupants}</span>
                      <span className="text-slate-400 text-[11px]"> people</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 text-[10px] block">AVAILABLE BEDS</span>
                      <span className="font-bold text-emerald-600">{shelter.capacityAvailable}</span>
                      <span className="text-slate-400 text-[11px]"> / {shelter.totalCapacity}</span>
                    </div>
                  </div>
                </div>

                {/* Facilities & Resilience */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2 rounded border border-slate-200 flex items-center gap-2">
                    <HeartPulse className="w-4 h-4 text-red-500 shrink-0" />
                    <div>
                      <span className="text-slate-400 text-[9px] block">MEDICAL</span>
                      <span className="font-bold text-slate-800 text-[11px]">
                        {shelter.medicalSupport ? 'Level 2 Clinic' : 'First Aid Kit'}
                      </span>
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                    <div>
                      <span className="text-slate-400 text-[9px] block">POWER / RATIONS</span>
                      <span className="font-bold text-slate-800 text-[11px]">
                        {shelter.suppliesDays || 14}d Supplies
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. TRANSIT CORRIDORS */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Navigation className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="font-bold text-base">Evacuation Corridors &amp; Route Telemetry</h3>
              <p className="text-[11px] text-slate-400">Surface risk index, bridge condition, and autonomous corridor selection</p>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400">SURFACE TELEMETRY</span>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {routes.map((route) => {
            const isBlocked = route.status === 'BLOCKED' || route.status === 'IMPASSABLE';
            return (
              <div 
                key={route.id} 
                className={`p-4 rounded-xl border transition-all ${
                  isBlocked 
                    ? 'border-red-300 bg-red-50/40' 
                    : 'border-slate-200 bg-slate-50/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    {isBlocked ? (
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    )}
                    {route.name}
                  </h4>
                  <span className={`px-2 py-0.5 text-xs font-mono font-bold rounded ${
                    isBlocked 
                      ? 'bg-red-100 text-red-800 border border-red-300' 
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}>
                    {route.status}
                  </span>
                </div>

                <div className="text-xs text-slate-600 flex items-center justify-between mt-2">
                  <span>From: <strong className="text-slate-800">{route.from}</strong></span>
                  <span className="font-mono font-bold text-slate-900">{route.distanceKm} km ({route.etaMinutes} min)</span>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Hazard Index: {route.riskScore} / 100</span>
                  <span>{isBlocked ? 'Submerged (+1.2m)' : 'Clear Passage'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
