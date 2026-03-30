import { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle2 } from 'lucide-react';

export function MobileAppDemo() {
  const [booked, setBooked] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  const handleBook = (id: string) => {
    setIsBooking(true);
    setTimeout(() => {
      setBooked(id);
      setIsBooking(false);
    }, 800);
  };

  return (
    <div className="flex justify-center py-4">
      <div className="w-[300px] h-[600px] bg-gray-50 border-[14px] border-gray-900 rounded-[3rem] overflow-hidden relative shadow-2xl flex flex-col">
        {/* Mobile Status Bar */}
        <div className="bg-primary-600 text-white px-5 py-2 flex justify-between items-center text-[11px] font-medium">
          <span>09:41</span>
          <div className="flex gap-1.5 items-center">
            <span className="text-[10px]">📶</span>
            <span className="text-[10px]">5G</span>
            <span className="text-[10px]">🔋</span>
          </div>
        </div>
        
        {/* App Header */}
        <div className="bg-primary-600 text-white p-5 shadow-md z-10">
          <h2 className="text-xl font-bold text-center">CampusBook</h2>
          <div className="flex gap-2 mt-4 bg-white/20 p-1 rounded-lg">
            <button className="flex-1 bg-white text-primary-700 py-1.5 rounded-md text-xs font-bold shadow-sm">Salles</button>
            <button className="flex-1 text-white py-1.5 rounded-md text-xs font-medium">Matériel</button>
          </div>
        </div>
        
        {/* App Content */}
        <div className="p-4 flex-1 overflow-y-auto bg-gray-50">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-xs text-gray-500 font-medium">Aujourd'hui, 14 Oct</p>
              <p className="text-lg font-bold text-gray-800">Disponibilités</p>
            </div>
            <button className="p-2 bg-white rounded-full shadow-sm border border-gray-100">
              <Calendar className="h-4 w-4 text-primary-600" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Room 1 */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500"></div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-bold text-gray-900 text-base block">Salle A-101</span>
                  <span className="text-xs text-gray-500 flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" /> Bâtiment A • 4 places</span>
                </div>
                <span className="bg-green-100 text-green-700 text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider">Libre</span>
              </div>
              
              {booked === 'A101' ? (
                <div className="mt-3 bg-green-50 border border-green-100 rounded-xl p-3 flex items-center gap-2 text-green-700 text-sm font-medium">
                  <CheckCircle2 className="h-5 w-5" />
                  Réservée (14h-16h)
                </div>
              ) : (
                <button 
                  onClick={() => handleBook('A101')}
                  disabled={isBooking}
                  className="mt-3 w-full bg-primary-600 hover:bg-primary-700 text-white text-sm py-2.5 rounded-xl font-bold transition-all active:scale-[0.98] flex justify-center items-center gap-2"
                >
                  {isBooking ? <span className="animate-pulse">Traitement...</span> : <><Clock className="h-4 w-4" /> Réserver (14h-16h)</>}
                </button>
              )}
            </div>
            
            {/* Room 2 */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm relative overflow-hidden opacity-75">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500"></div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-bold text-gray-900 text-base block">Salle B-204</span>
                  <span className="text-xs text-gray-500 flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" /> Bâtiment B • 8 places</span>
                </div>
                <span className="bg-red-100 text-red-700 text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider">Occupée</span>
              </div>
              <button disabled className="mt-3 w-full bg-gray-100 text-gray-400 text-sm py-2.5 rounded-xl font-bold cursor-not-allowed flex justify-center items-center gap-2">
                <Clock className="h-4 w-4" /> Indisponible jusqu'à 16h
              </button>
            </div>

            {/* Room 3 */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500"></div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-bold text-gray-900 text-base block">Labo Info 3</span>
                  <span className="text-xs text-gray-500 flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" /> Bâtiment C • 20 PC</span>
                </div>
                <span className="bg-green-100 text-green-700 text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider">Libre</span>
              </div>
              
              {booked === 'Lab3' ? (
                <div className="mt-3 bg-green-50 border border-green-100 rounded-xl p-3 flex items-center gap-2 text-green-700 text-sm font-medium">
                  <CheckCircle2 className="h-5 w-5" />
                  Poste réservé
                </div>
              ) : (
                <button 
                  onClick={() => handleBook('Lab3')}
                  disabled={isBooking}
                  className="mt-3 w-full bg-primary-600 hover:bg-primary-700 text-white text-sm py-2.5 rounded-xl font-bold transition-all active:scale-[0.98] flex justify-center items-center gap-2"
                >
                  {isBooking ? <span className="animate-pulse">Traitement...</span> : <><Clock className="h-4 w-4" /> Réserver un poste</>}
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Mobile Home Indicator */}
        <div className="bg-white pt-3 pb-2 border-t border-gray-100">
          <div className="w-1/3 h-1.5 bg-gray-300 rounded-full mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
