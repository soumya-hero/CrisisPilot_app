import { useState, useEffect } from 'react';
import { Shield, Clock, Wifi, Sparkles } from 'lucide-react';

export function Header() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toTimeString().split(' ')[0] + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header id="main-header" className="bg-slate-900 border-b border-slate-800 px-6 py-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Title Group */}
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
                  CrisisPilot
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/15 text-red-300 border border-red-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                  DEFCON 2 • ACTIVE EMERGENCY
                </span>
              </div>
              <p className="text-sm text-slate-400 font-medium">
                Autonomous Emergency Response &amp; Resource Coordination
              </p>
            </div>
          </div>
        </div>

        {/* Tactical Telemetry & Mode */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-md border border-slate-800 text-xs font-mono text-slate-300">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-400">SYS_TIME:</span>
            <span className="font-semibold text-white">{time || '10:43:00 UTC'}</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-md border border-slate-800 text-xs font-mono text-slate-300">
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">NET:</span>
            <span className="text-emerald-400 font-semibold">LOCAL MOCK (ONLINE)</span>
          </div>

          <div className="flex items-center gap-1.5 bg-blue-950/60 border border-blue-800/80 px-3 py-1.5 rounded-md text-xs font-medium text-blue-300">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>AUTONOMOUS ENGINE ENGAGED</span>
          </div>
        </div>
      </div>
    </header>
  );
}
