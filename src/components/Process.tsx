import { motion } from 'motion/react';
import { MessageSquare, FileText, Code2, Rocket } from 'lucide-react';

export function Process() {
  const steps = [
    {
      icon: <MessageSquare className="h-8 w-8 text-white" />,
      title: "1. CONSULTATION",
      time: "24h max",
      details: [
        "Décrivez votre projet",
        "Appel de clarification si nécessaire",
        "Analyse de faisabilité"
      ],
      color: "bg-blue-500"
    },
    {
      icon: <FileText className="h-8 w-8 text-white" />,
      title: "2. PROPOSITION",
      time: "48h max",
      details: [
        "Devis détaillé",
        "Timeline estimée",
        "Technologies recommandées"
      ],
      color: "bg-indigo-500"
    },
    {
      icon: <Code2 className="h-8 w-8 text-white" />,
      title: "3. DÉVELOPPEMENT",
      time: "Selon le projet",
      details: [
        "Livraisons itératives",
        "Meetings réguliers",
        "Transparence totale"
      ],
      color: "bg-purple-500"
    },
    {
      icon: <Rocket className="h-8 w-8 text-white" />,
      title: "4. LIVRAISON & SUPPORT",
      time: "Garantie qualité",
      details: [
        "Code livré + Documentation",
        "Training/Explication",
        "Support gratuit 30 jours"
      ],
      color: "bg-green-500"
    }
  ];

  return (
    <section id="process" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold heading-font text-gray-900 mb-4">
            Comment Ça Marche ?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Un processus simple, transparent et professionnel pour garantir la réussite de votre projet.
          </p>
          <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gray-100 -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative"
              >
                <div className={`w-24 h-24 mx-auto rounded-2xl ${step.color} flex items-center justify-center shadow-lg mb-6 transform rotate-3 hover:rotate-0 transition-transform`}>
                  {step.icon}
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center h-full">
                  <h3 className="text-lg font-bold heading-font text-gray-900 mb-2">{step.title}</h3>
                  <div className="inline-block px-3 py-1 bg-white rounded-full text-xs font-bold text-gray-500 mb-4 shadow-sm">
                    ⏱️ {step.time}
                  </div>
                  
                  <ul className="space-y-2 text-left">
                    {step.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start text-sm text-gray-600">
                        <span className="text-primary-500 mr-2">→</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex justify-center items-center px-8 py-4 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Démarrer la Consultation Gratuite
          </a>
        </div>
      </div>
    </section>
  );
}
