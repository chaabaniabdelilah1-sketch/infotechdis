import { motion } from 'motion/react';
import { CheckCircle2, Database, ShieldCheck, Code, Server, ArrowRight, Award } from 'lucide-react';

export function About() {
  const values = [
    { title: "Expertise réelle", desc: "Nos consultants sont des professionnels IT en activité" },
    { title: "Accompagnement complet", desc: "Du concept jusqu'à la soutenance" },
    { title: "Délais respectés", desc: "Pas de surprise, vous restez maître de votre projet" },
    { title: "Support post-livraison", desc: "Présent le jour de votre soutenance" },
    { title: "Confidentialité garantie", desc: "Votre projet reste votre création" }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold heading-font text-gray-900 mb-4">
            À Propos
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
                alt="Notre Équipe" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-2xl font-bold heading-font mb-2">L'Équipe</h3>
                  <p className="text-gray-200">Experts IT, Réseaux & Cybersécurité</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-primary-50 rounded-xl p-6 text-center border border-primary-100">
                <div className="text-3xl font-bold text-primary-600 mb-1">200+</div>
                <div className="text-sm text-gray-600 font-medium">Projets Réussis</div>
              </div>
              <div className="bg-green-50 rounded-xl p-6 text-center border border-green-100">
                <div className="text-3xl font-bold text-green-600 mb-1">98%</div>
                <div className="text-sm text-gray-600 font-medium">Satisfaction</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold heading-font text-gray-900 mb-4">
                Votre PFE réussi, c'est notre priorité
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Vous stressez à l'idée de votre Projet de Fin d'Études ? Vous manquez de temps ou d'expertise technique ? Vous êtes au bon endroit.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Depuis plus de 5 ans, nous accompagnons des centaines d'étudiants dans la conception et la réalisation de leurs PFE. Notre mission : transformer vos idées en projets professionnels qui impressionnent les jurys et vous font gagner un temps précieux.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary-500"></div>
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Award className="h-5 w-5 text-primary-600 mr-2" />
                Pourquoi nous choisir ?
              </h4>
              <ul className="space-y-3">
                {values.map((value, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      <strong className="text-gray-900">{value.title}</strong> - {value.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-4">Nos domaines d'expertise</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary-200 transition-colors">
                  <Database className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-800 font-medium">Ingénierie Informatique & Big Data</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary-200 transition-colors">
                  <ShieldCheck className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-800 font-medium">Cybersécurité & Réseaux</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary-200 transition-colors">
                  <Code className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-800 font-medium">Développement Web, Mobile & Cloud</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary-200 transition-colors">
                  <Server className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-800 font-medium">Systèmes & Infrastructure IT</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/30 hover:shadow-primary-600/50 hover:-translate-y-0.5"
              >
                Envie de discuter de votre projet ?
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
