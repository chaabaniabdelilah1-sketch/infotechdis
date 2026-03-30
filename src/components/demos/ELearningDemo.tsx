import { useState, useEffect } from 'react';
import { Play, Pause, MonitorPlay, CheckCircle2, Lock } from 'lucide-react';

export function ELearningDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(33);
  const [activeChapter, setActiveChapter] = useState(2);

  useEffect(() => {
    let interval: any;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress(p => Math.min(p + 1, 100));
      }, 100);
    } else if (progress >= 100) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress]);

  const chapters = [
    { id: 1, title: "Chapitre 1: Introduction", duration: "10:00", status: "completed" },
    { id: 2, title: "Chapitre 2: React Basics", duration: "45:00", status: "current" },
    { id: 3, title: "Chapitre 3: Advanced Hooks", duration: "30:00", status: "locked" },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-inner border border-gray-100">
      <div className="flex justify-between items-center mb-4 border-b pb-3">
        <h3 className="font-bold text-lg text-primary-800">EduPortal Pro</h3>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">Espace Étudiant</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 bg-gray-900 rounded-lg aspect-video flex flex-col items-center justify-center text-white relative overflow-hidden group">
          {isPlaying ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <button onClick={() => setIsPlaying(false)} className="p-4 bg-white/20 rounded-full hover:bg-white/30 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100">
                <Pause className="h-8 w-8 text-white" />
              </button>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <button onClick={() => setIsPlaying(true)} className="p-4 bg-primary-600 rounded-full hover:bg-primary-500 transition-all shadow-lg shadow-primary-500/50">
                <Play className="h-8 w-8 text-white ml-1" />
              </button>
            </div>
          )}
          
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <MonitorPlay className="h-5 w-5 text-white/70" />
            <span className="text-sm font-medium text-white/90">{chapters.find(c => c.id === activeChapter)?.title}</span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-700 cursor-pointer" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            setProgress((x / rect.width) * 100);
          }}>
            <div className="h-full bg-primary-500 transition-all duration-100" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-gray-700">Progression du module</h4>
          {chapters.map((chap) => (
            <button 
              key={chap.id}
              onClick={() => {
                if (chap.status !== 'locked') {
                  setActiveChapter(chap.id);
                  setProgress(chap.id < activeChapter ? 100 : 0);
                  setIsPlaying(false);
                }
              }}
              disabled={chap.status === 'locked'}
              className={`w-full text-left p-3 rounded-lg border-l-4 shadow-sm transition-all ${
                activeChapter === chap.id 
                  ? 'bg-white border-primary-500 ring-1 ring-primary-100' 
                  : chap.status === 'completed' 
                    ? 'bg-gray-50 border-green-500 hover:bg-gray-100' 
                    : 'bg-gray-50 border-gray-300 opacity-70 cursor-not-allowed'
              }`}
            >
              <p className="text-xs font-bold text-gray-800">{chap.title}</p>
              <div className="flex items-center gap-1 mt-1">
                {chap.status === 'completed' || (activeChapter === chap.id && progress === 100) ? (
                  <><CheckCircle2 className="h-3 w-3 text-green-600" /><span className="text-[10px] text-green-600">Terminé</span></>
                ) : activeChapter === chap.id ? (
                  <><Play className="h-3 w-3 text-primary-600" /><span className="text-[10px] text-primary-600">En cours ({Math.round(progress)}%)</span></>
                ) : (
                  <><Lock className="h-3 w-3 text-gray-500" /><span className="text-[10px] text-gray-500">Verrouillé</span></>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
