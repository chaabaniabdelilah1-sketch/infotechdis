import { motion } from 'motion/react';
import { Check, Info } from 'lucide-react';

export function Pricing() {
  const plans = [
    {
      name: "PETIT PROJET",
      description: "Site web simple, App mobile basic",
      price: "1,000 DH",
      time: "1-2 semaines",
      features: [
        "Code source complet",
        "Documentation basique",
        "Déploiement initial",
        "Support 15 jours"
      ],
      highlighted: false
    },
    {
      name: "PROJET MOYEN",
      description: "E-commerce, API complexe, Dashboard",
      price: "2,500 DH",
      time: "2-3 semaines",
      features: [
        "Code source complet",
        "Documentation technique",
        "Hosting inclus (3 mois)",
        "Formation (2h)",
        "Support 30 jours"
      ],
      highlighted: true
    },
    {
      name: "PROJET COMPLET",
      description: "Infrastructure, Big Data, Full Stack",
      price: "3,000 DH",
      time: "3-4 semaines",
      features: [
        "Architecture sur mesure",
        "Code + Déploiement CI/CD",
        "Documentation exhaustive",
        "Formation complète",
        "Support prioritaire 60 jours"
      ],
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold heading-font text-gray-900 mb-4">
            Tarifs & Forfaits
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Des prix transparents, adaptés à la complexité de votre projet universitaire.
          </p>
          <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative bg-white rounded-3xl p-8 border ${
                plan.highlighted 
                  ? 'border-primary-500 shadow-2xl shadow-primary-500/20 transform md:-translate-y-4' 
                  : 'border-gray-200 shadow-lg'
              } flex flex-col`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-primary-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                    Le plus demandé
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold heading-font text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-500 mb-6 h-10">{plan.description}</p>
                <div className="flex justify-center items-baseline">
                  <span className="text-sm font-semibold text-gray-500 mr-1">À partir de</span>
                  <span className="text-4xl font-extrabold heading-font text-gray-900">{plan.price}</span>
                </div>
                <div className="mt-4 inline-flex items-center bg-gray-50 px-3 py-1 rounded-full text-sm font-medium text-gray-600">
                  ⏱️ {plan.time}
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start">
                    <Check className={`h-5 w-5 mr-3 flex-shrink-0 ${plan.highlighted ? 'text-primary-500' : 'text-green-500'}`} />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block w-full text-center py-4 rounded-xl font-bold transition-all ${
                  plan.highlighted
                    ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                Demander un Devis
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto bg-blue-50 rounded-2xl p-6 border border-blue-100 flex items-start">
          <Info className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-lg font-bold text-blue-900 mb-2">Projet Sur Mesure ?</h4>
            <p className="text-blue-800">
              Les délais et tarifs sont négociables selon la complexité exacte de votre cahier des charges. 
              Contactez-moi pour une estimation personnalisée et gratuite.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
