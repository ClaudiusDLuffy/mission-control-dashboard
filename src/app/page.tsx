'use client';

import { useState, useEffect } from 'react';
import { executives, tasks } from '@/data/executiveData';
import ProgressSummary from '@/components/ProgressSummary';
import OrgChart from '@/components/OrgChart';
import TaskBoard from '@/components/TaskBoard';
import { Command, Users, CheckSquare } from 'lucide-react';

export default function ExecutiveCommandCenter() {
  const [selectedExecutive, setSelectedExecutive] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleExecutiveSelect = (executiveId: string | null) => {
    setSelectedExecutive(executiveId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Executive Command Center</h2>
          <p className="text-slate-400">Initializing dashboard systems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Command className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Executive Command Center</h1>
                <p className="text-slate-400">Team Operations & Task Management</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-400 text-sm font-medium">Live</span>
              </div>
              <div className="text-slate-400 text-sm">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Progress Summary */}
        <section className="mb-12">
          <ProgressSummary 
            tasks={tasks} 
            executives={executives} 
            selectedExecutive={selectedExecutive}
          />
        </section>

        {/* Organization Chart */}
        <section className="mb-12">
          <div className="glass-panel">
            <OrgChart 
              executives={executives} 
              selectedExecutive={selectedExecutive}
              onExecutiveSelect={handleExecutiveSelect}
            />
          </div>
        </section>

        {/* Task Board */}
        <section>
          <div className="glass-panel">
            <TaskBoard 
              tasks={tasks} 
              executives={executives} 
              selectedExecutive={selectedExecutive}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400 text-sm">{executives.length} Executives</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400 text-sm">{tasks.length} Total Tasks</span>
              </div>
            </div>
            <div className="text-slate-500 text-sm">
              Mission Control Dashboard v3.0 • Built with precision
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}