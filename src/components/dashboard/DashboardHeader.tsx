import { Calendar, Clock, User, Settings } from 'lucide-react'

export function DashboardHeader() {
  const currentTime = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  })

  return (
    <header className="border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Mission Control
            </h1>
            <p className="text-slate-400 font-medium">
              Gustavo Quintero • Director & Ironman
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">{currentTime}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 mt-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">EST • Productivity Mode</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors">
                <User className="w-5 h-5 text-slate-400" />
              </button>
              <button className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors">
                <Settings className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="mt-6 flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-slate-300">MYAMZTEAM Scaling</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span className="text-slate-300">Ironman Training</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-slate-300">Content Creation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <span className="text-slate-300">Faith & Growth</span>
          </div>
        </div>
      </div>
    </header>
  )
}