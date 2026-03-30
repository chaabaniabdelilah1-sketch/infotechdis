import { motion } from 'motion/react';
import { Code, Server, Database, Video, Check } from 'lucide-react';

export function Services() {
  const services = [
    {
      icon: <Code className="h-8 w-8 text-primary-600" />,
      title: "Développement d'Applications Web & Mobile",
      delay: "2-4 semaines",
      features: [
        "Analyse du cahier des charges",
        "Architecture et conception",
        "Développement complet",
        "Tests et débogage",
        "Documentation technique",
        "Formation/explication au client",
        "30 jours de support gratuit"
      ],
      techs: "React, Vue.js, Node.js, Django, Flask, Laravel",
      examples: "E-commerce, Plateforme d'apprentissage, Système de gestion"
    },
    {
      icon: <Server className="h-8 w-8 text-secondary-600" />,
      title: "Infrastructure IT & Administration Systèmes",
      delay: "1-3 semaines",
      features: [
        "Architecture système",
        "Configuration serveurs (Linux/Windows)",
        "Sécurité et cybersécurité",
        "Cloud (Azure, AWS, Google Cloud)",
        "Virtualisation",
        "Documentation complète"
      ],
      techs: "Linux, Windows Server, Docker, Kubernetes, AWS",
      examples: "Architectures réseau, solutions cloud, security audits"
    },
    {
      icon: <Database className="h-8 w-8 text-accent-500" />,
      title: "Solutions Big Data & Data Science",
      delay: "3-5 semaines",
      features: [
        "Analyse de données",
        "Pipelines ETL",
        "Visualisations dashboards",
        "Machine Learning",
        "Rapports d'analyse",
        "Documentation technique"
      ],
      techs: "Python, Spark, Hadoop, Tableau, Power BI, TensorFlow",
      examples: "Prédiction de ventes, Analyse de sentiments, Recommandation"
    },
    {
      icon: <Video className="h-8 w-8 text-green-600" />,
      title: "Mentorat & Support Technique",
      delay: "Flexible",
      features: [
        "Appels vidéo avec l'expert",
        "Revue de code",
        "Débuggage collaboratif",
        "Conseil technique",
        "Explication détaillée",
        "Préparation soutenance"
      ],
      techs: "Toutes technologies",
      examples: "Aide au débuggage, explication d'architecture, préparation aux questions du jury"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold heading-font text-gray-900 mb-4">
            Mes Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Des solutions sur mesure pour répondre aux exigences académiques de votre PFE, avec un accompagnement complet de A à Z.
          </p>
          <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow flex flex-col h-full"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mr-4">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold heading-font text-gray-900">{service.title}</h3>
                </div>
              </div>

              <div className="flex-grow">
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Ce qui est inclus :</h4>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100">
                <div className="mb-3">
                  <span className="text-xs font-bold text-gray-500 uppercase">Technologies :</span>
                  <p className="text-sm text-gray-700 mt-1">{service.techs}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase">Exemples :</span>
                  <p className="text-sm text-gray-700 mt-1 italic">{service.examples}</p>
                </div>
                <div className="mt-6">
                  <a
                    href="#contact"
                    className="block w-full text-center bg-gray-50 hover:bg-primary-50 text-primary-700 font-medium py-3 rounded-xl transition-colors border border-gray-200 hover:border-primary-200"
                  >
                    Demander ce service
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
