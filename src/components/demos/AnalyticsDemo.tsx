import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Activity, Database } from 'lucide-react';

const dataQ3 = [
  { name: 'Jan', actual: 4000, predicted: 4100 },
  { name: 'Fév', actual: 3000, predicted: 3200 },
  { name: 'Mar', actual: 2000, predicted: 2100 },
  { name: 'Avr', actual: 2780, predicted: 2900 },
  { name: 'Mai', actual: 1890, predicted: 2000 },
  { name: 'Juin', actual: 2390, predicted: 2500 },
  { name: 'Juil', actual: null, predicted: 3490 },
  { name: 'Août', actual: null, predicted: 4000 },
];

const dataQ2 = [
  { name: 'Jan', actual: 2000, predicted: 2200 },
  { name: 'Fév', actual: 1500, predicted: 1600 },
  { name: 'Mar', actual: 2800, predicted: 2700 },
  { name: 'Avr', actual: 3100, predicted: 3000 },
  { name: 'Mai', actual: 2500, predicted: 2600 },
  { name: 'Juin', actual: 3200, predicted: 3100 },
];

export function AnalyticsDemo() {
  const [period, setPeriod] = useState('Q3');
  
  const data = period === 'Q3' ? dataQ3 : dataQ2;
  const metrics = period === 'Q3' 
    ? { sales: '+24.5%', acc: '94.2%', data: '1.2 TB' }
    : { sales: '+12.1%', acc: '91.8%', data: '850 GB' };

  return (
    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-inner">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Sales Prediction Analytics
          </h3>
          <p className="text-xs text-gray-500 mt-1">Modèle Random Forest v2.1</p>
        </div>
        <select 
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 text-sm bg-white shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Q3">Trimestre Actuel (Q3 2025)</option>
          <option value="Q2">Trimestre Précédent (Q2 2025)</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Prédiction Ventes</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{metrics.sales}</p>
          <p className="text-[10px] text-green-500 mt-1 font-medium">↑ vs mois précédent</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-green-500" />
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Précision Modèle</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{metrics.acc}</p>
          <p className="text-[10px] text-gray-400 mt-1 font-medium">RMSE: 0.042</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <Database className="h-4 w-4 text-purple-500" />
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Données Traitées</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{metrics.data}</p>
          <p className="text-[10px] text-gray-400 mt-1 font-medium">Pipeline Spark ETL</p>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 h-64">
        <h4 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider">Prévisions vs Réel</h4>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              labelStyle={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' }}
            />
            <Area type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" name="Ventes Réelles" />
            <Area type="monotone" dataKey="predicted" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorPredicted)" name="Prédictions" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
