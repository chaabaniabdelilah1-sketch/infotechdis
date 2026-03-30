import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, MonitorPlay, X } from 'lucide-react';
import { ELearningDemo } from './demos/ELearningDemo';
import { SCCMDemo } from './demos/SCCMDemo';
import { AnalyticsDemo } from './demos/AnalyticsDemo';
import { MobileAppDemo } from './demos/MobileAppDemo';

export function Portfolio() {
  const [filter, setFilter] = useState('Tous');
  const [selectedDemo, setSelectedDemo] = useState<number | null>(null);

  const categories = ['Tous', 'Web', 'Infrastructure', 'Data'];

  const projects = [
    {
      id: 1,
      title: "Plateforme e-learning pour université",
      category: "Web",
      description: "Système complet de gestion d'apprentissage avec streaming vidéo, quiz interactifs et suivi de progression en temps réel.",
      techs: ["React", "Node.js", "MongoDB", "AWS"],
      challenge: "Gérer 5000+ utilisateurs simultanés et assurer un streaming vidéo en haute qualité sans latence.",
      result: "Plate-forme déployée avec succès, 99.9% uptime, note de 4.9/5 du client.",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
      demo: <ELearningDemo />
    },
    {
      id: 2,
      title: "Système de gestion de stocks IT",
      category: "Infrastructure",
      description: "Architecture et configuration SCCM pour le déploiement automatisé et la gestion du parc informatique.",
      techs: ["Windows Server", "SCCM", "PowerShell", "SQL Server"],
      challenge: "Automatiser le déploiement d'OS et d'applications sur 500+ postes répartis sur plusieurs sites.",
      result: "Réduction du temps de déploiement de 80%, inventaire centralisé et automatisé.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
      demo: <SCCMDemo />
    },
    {
      id: 3,
      title: "Dashboard d'Analyse Prédictive",
      category: "Data",
      description: "Pipeline ETL et dashboard interactif pour la prédiction des ventes basées sur l'historique et la météo.",
      techs: ["Python", "Spark", "Tableau", "Scikit-learn"],
      challenge: "Traiter des téraoctets de données hétérogènes et entraîner un modèle ML performant.",
      result: "Précision des prédictions améliorée de 25%, rapports automatisés quotidiens.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      demo: <AnalyticsDemo />
    },
    {
      id: 4,
      title: "Application Mobile de Réservation",
      category: "Web",
      description: "Application cross-platform pour la réservation de salles d'étude et de matériel au sein du campus.",
      techs: ["React Native", "Firebase", "Express", "PostgreSQL"],
      challenge: "Gestion des conflits de réservation en temps réel et notifications push fiables.",
      result: "Adoption par 80% des étudiants, réduction des conflits de salles à zéro.",
      image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&q=80&w=800",
      demo: <MobileAppDemo />
    }
  ];

  const filteredProjects = filter === 'Tous' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const activeProject = projects.find(p => p.id === selectedDemo);

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold heading-font text-gray-900 mb-4">
            Projets Réalisés
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez une sélection de PFE et projets universitaires que j'ai accompagnés vers le succès.
          </p>
          <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full mt-6 mb-8"></div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat 
                    ? 'bg-primary-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-90"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider shadow-sm">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold heading-font text-white leading-tight">{project.title}</h3>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-gray-600 mb-6 flex-grow">{project.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techs.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-primary-50 text-primary-700 border border-primary-100 text-xs font-medium rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div>
                      <h4 className="text-xs font-bold text-accent-600 uppercase tracking-wider mb-1">Défi</h4>
                      <p className="text-sm text-gray-700">{project.challenge}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">Résultat</h4>
                      <p className="text-sm text-gray-700">{project.result}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-auto">
                    <button 
                      onClick={() => setSelectedDemo(project.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl text-sm font-medium transition-colors shadow-md hover:shadow-lg"
                    >
                      <MonitorPlay size={18} />
                      Voir Démo Interactive
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-3 rounded-xl text-sm font-medium transition-colors border border-gray-200">
                      <Github size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-primary-700 bg-primary-50 hover:bg-primary-100 transition-colors shadow-sm"
          >
            Discuter de votre projet
            <ExternalLink className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Demo Modal */}
      <AnimatePresence>
        {selectedDemo !== null && activeProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDemo(null)}
              className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
                <div>
                  <h3 className="text-2xl font-bold heading-font text-gray-900">{activeProject.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">Aperçu interactif (Simulation)</p>
                </div>
                <button 
                  onClick={() => setSelectedDemo(null)}
                  className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto bg-gray-50/30">
                {activeProject.demo}
              </div>
              
              <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                <p className="text-sm text-gray-500 italic">
                  *Ceci est une maquette interactive simplifiée à but démonstratif.
                </p>
                <button 
                  onClick={() => setSelectedDemo(null)}
                  className="px-6 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

