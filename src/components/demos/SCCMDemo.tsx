import { useState } from 'react';
import { Search, RefreshCw, Server, ShieldCheck, AlertTriangle, WifiOff } from 'lucide-react';

export function SCCMDemo() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [search, setSearch] = useState('');
  const [lastSync, setLastSync] = useState('2 min ago');

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSync('Just now');
    }, 1500);
  };

  const servers = [
    { id: 'SRV-DB-01', ip: '192.168.1.10', status: 'online', os: 'Win Server 2022' },
    { id: 'SRV-WEB-02', ip: '192.168.1.11', status: 'online', os: 'Ubuntu 22.04 LTS' },
    { id: 'WS-DEV-404', ip: '192.168.2.55', status: 'offline', os: 'Windows 11 Pro' },
    { id: 'SW-CORE-01', ip: '10.0.0.1', status: 'warning', os: 'Cisco IOS XE' },
    { id: 'SRV-MAIL-01', ip: '192.168.1.15', status: 'online', os: 'Win Server 2019' },
  ];

  const filtered = servers.filter(s => s.id.toLowerCase().includes(search.toLowerCase()) || s.ip.includes(search));

  return (
    <div className="bg-[#0f172a] text-gray-300 p-5 rounded-xl font-mono text-sm shadow-inner overflow-hidden border border-gray-800">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-800 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <Server className="text-blue-400 h-6 w-6" />
          <h3 className="font-bold text-lg text-blue-400 tracking-tight">SCCM Admin Console</h3>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-48">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Filter hosts..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-md py-1.5 pl-8 pr-3 text-xs focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-3 w-3 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Syncing...' : 'Sync All'}
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400 bg-gray-900/50">
              <th className="pb-3 pt-2 px-4 font-medium rounded-tl-md">Hostname</th>
              <th className="pb-3 pt-2 px-4 font-medium">IP Address</th>
              <th className="pb-3 pt-2 px-4 font-medium">Status</th>
              <th className="pb-3 pt-2 px-4 font-medium">OS Version</th>
              <th className="pb-3 pt-2 px-4 font-medium rounded-tr-md">Last Sync</th>
            </tr>
          </thead>
          <tbody className="text-xs sm:text-sm">
            {filtered.length > 0 ? filtered.map((srv) => (
              <tr key={srv.id} className="border-b border-gray-800/50 hover:bg-gray-800/50 transition-colors group">
                <td className="py-3 px-4 text-white font-medium group-hover:text-blue-400 transition-colors">{srv.id}</td>
                <td className="px-4 text-gray-400">{srv.ip}</td>
                <td className="px-4">
                  {srv.status === 'online' && <span className="text-green-400 flex items-center gap-1.5 bg-green-400/10 w-fit px-2 py-1 rounded-full text-xs"><ShieldCheck className="h-3 w-3" /> Online</span>}
                  {srv.status === 'offline' && <span className="text-red-400 flex items-center gap-1.5 bg-red-400/10 w-fit px-2 py-1 rounded-full text-xs"><WifiOff className="h-3 w-3" /> Offline</span>}
                  {srv.status === 'warning' && <span className="text-yellow-400 flex items-center gap-1.5 bg-yellow-400/10 w-fit px-2 py-1 rounded-full text-xs"><AlertTriangle className="h-3 w-3" /> Warning</span>}
                </td>
                <td className="px-4 text-gray-400">{srv.os}</td>
                <td className="px-4 text-gray-500">{isSyncing ? 'Syncing...' : lastSync}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">No hosts found matching "{search}"</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
