'use client';

import { useState } from 'react';
import { Executive } from '@/types/executive';

interface OrgChartProps {
  executives: Executive[];
  selectedExecutive: string | null;
  onExecutiveSelect: (executiveId: string | null) => void;
}

export default function OrgChart({ executives, selectedExecutive, onExecutiveSelect }: OrgChartProps) {
  const getExecutiveById = (id: string) => executives.find(exec => exec.id === id);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-400';
      case 'busy': return 'bg-yellow-400';
      case 'offline': return 'bg-slate-400';
      default: return 'bg-slate-400';
    }
  };

  const ceo = executives.find(exec => !exec.reportsTo);
  const directReports = executives.filter(exec => exec.reportsTo === ceo?.id);
  const secondLevel = executives.filter(exec => 
    directReports.some(dr => dr.directReports?.includes(exec.id))
  );

  const ExecutiveCard = ({ executive, isSelected }: { executive: Executive; isSelected: boolean }) => (
    <div 
      className={`executive-card cursor-pointer transition-all duration-300 ${
        isSelected ? 'ring-2 ring-blue-400 bg-blue-500/20' : 'hover:bg-slate-700/50'
      }`}
      onClick={() => onExecutiveSelect(isSelected ? null : executive.id)}
    >
      <div className="flex flex-col items-center p-4">
        <div className="relative mb-3">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold shadow-lg">
            {executive.avatar}
          </div>
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(executive.status)} rounded-full border-2 border-slate-800`} />
        </div>
        <h3 className="font-semibold text-white text-center text-sm mb-1">{executive.name}</h3>
        <p className="text-slate-400 text-xs text-center">{executive.title}</p>
      </div>
    </div>
  );

  return (
    <div className="org-chart-container">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Executive Team</h2>
          <p className="text-slate-400">Click any executive to filter their tasks below</p>
        </div>
        {selectedExecutive && (
          <button
            onClick={() => onExecutiveSelect(null)}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm"
          >
            Show All Tasks
          </button>
        )}
      </div>

      <div className="org-chart">
        {/* CEO Level */}
        {ceo && (
          <div className="flex justify-center mb-12">
            <ExecutiveCard 
              executive={ceo} 
              isSelected={selectedExecutive === ceo.id}
            />
          </div>
        )}

        {/* Connection Lines */}
        <div className="flex justify-center mb-8">
          <div className="org-line-vertical" />
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="org-line-horizontal" />
        </div>

        {/* C-Suite Level */}
        <div className="flex justify-center gap-16 mb-12">
          {directReports.map((exec, index) => (
            <div key={exec.id} className="relative">
              <div className="org-connector-up" />
              <ExecutiveCard 
                executive={exec} 
                isSelected={selectedExecutive === exec.id}
              />
              {/* Connection down to reports */}
              {exec.directReports && exec.directReports.length > 0 && (
                <div className="org-connector-down" />
              )}
            </div>
          ))}
        </div>

        {/* Second Level */}
        {secondLevel.length > 0 && (
          <div className="flex justify-center gap-16">
            {secondLevel.map((exec) => (
              <ExecutiveCard 
                key={exec.id}
                executive={exec} 
                isSelected={selectedExecutive === exec.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}