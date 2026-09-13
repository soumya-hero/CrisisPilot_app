import { AlertCircle, Users, Flame, ShieldAlert, Home, Droplets } from 'lucide-react';
import { MissionData } from '../types';

interface MissionCardProps {
  mission: MissionData;
}

export function MissionCard({ mission }: MissionCardProps) {
  return (
    <div 
      id="mission-card"
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
    >
      {/* Top Banner / Mission Title */}
      <div className="bg-slate-900 text-white px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
            <AlertCircle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
              ACTIVE DIRECTIVE
            </span>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>MISSION: Protect residents in {mission.zone}</span>
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-600 text-white text-xs font-bold tracking-wider uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            Priority: {mission.priority}
          </div>
        </div>
      </div>

      {/* Metrics Row - 5 Required Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-100 bg-slate-50/70 p-2 md:p-0">
        
        {/* Metric 1: Priority */}
        <div className="p-4 md:p-5 flex items-start gap-3.5">
          <div className="p-2.5 rounded-lg bg-red-50 text-red-600 border border-red-100 shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500">Priority</div>
            <div className="text-lg font-bold text-red-600 tracking-tight">
              {mission.priority}
            </div>
            <span className="text-[11px] text-red-500/80 font-medium">Immediate Ingress</span>
          </div>
        </div>

        {/* Metric 2: Population at Risk */}
        <div className="p-4 md:p-5 flex items-start gap-3.5">
          <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-100 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500">Population at Risk</div>
            <div className="text-xl font-bold text-slate-900 tracking-tight">
              {mission.populationAtRisk.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Sectors 1 to 4</span>
          </div>
        </div>

        {/* Metric 3: Active Incidents */}
        <div className="p-4 md:p-5 flex items-start gap-3.5">
          <div className="p-2.5 rounded-lg bg-orange-50 text-orange-600 border border-orange-100 shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500">Active Incidents</div>
            <div className="text-xl font-bold text-slate-900 tracking-tight">
              {mission.activeIncidents}
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Flash Inundation</span>
          </div>
        </div>

        {/* Metric 4: Rescue Teams */}
        <div className="p-4 md:p-5 flex items-start gap-3.5">
          <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500">Rescue Teams</div>
            <div className="text-xl font-bold text-blue-700 tracking-tight">
              {mission.rescueTeamsCount}
            </div>
            <span className="text-[11px] text-blue-600 font-medium">1 Dispatched, 2 Standby</span>
          </div>
        </div>

        {/* Metric 5: Shelter Capacity Available */}
        <div className="p-4 md:p-5 flex items-start gap-3.5 col-span-2 md:col-span-1">
          <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
            <Home className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500">Shelter Capacity Available</div>
            <div className="text-xl font-bold text-emerald-700 tracking-tight">
              {mission.shelterCapacityAvailable}
            </div>
            <span className="text-[11px] text-emerald-600 font-medium">Shelter B Ready</span>
          </div>
        </div>

      </div>

      {/* Real-time Environmental Context Sub-bar */}
      <div className="px-6 py-2.5 bg-slate-100/80 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-blue-500" />
          <span className="font-semibold text-slate-700">Hydrological Status:</span>
          <span>{mission.waterLevelTrend}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          <span className="font-semibold text-slate-700">Atmospheric:</span>
          <span>{mission.weatherCondition}</span>
        </div>
        <div className="text-slate-500 font-mono text-[11px]">
          GEO: 37°46'22"N • 122°25'06"W
        </div>
      </div>
    </div>
  );
}
