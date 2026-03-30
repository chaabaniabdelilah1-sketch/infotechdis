import { motion } from 'motion/react';
import { CheckCircle2, GraduationCap, Briefcase, Award } from 'lucide-react';

export function About() {
  const values = [
    "Expertise technique réelle (pas amateur)",
    "Compréhension des cahiers des charges universitaires",
    "Respect des délais et des normes académiques",
    "Suivi post-livraison et révisions",
    "Explications détaillées du code/solution"
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold heading-font text-gray-900 mb-4">
            À Propos de Moi
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
                src="/profile.jpg" 
                alt="Abdelilah Chaabani" 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-2xl font-bold heading-font mb-2">Abdelilah Chaabani</h3>
                  <p className="text-gray-200">Expert Informatique & Big Data</p>
                </div>
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
                Votre partenaire pour la réussite de votre PFE
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Fort d'une solide formation académique et d'une expérience professionnelle concrète, je vous accompagne dans la conception, le développement et le déploiement de vos projets universitaires. Mon objectif est de vous fournir un travail de qualité professionnelle qui répondra aux exigences de vos jurys.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <GraduationCap className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Parcours Académique</h4>
                  <p className="text-gray-600">Master Ingénierie Informatique & Big Data (ENSA Berrechid)</p>
                  <p className="text-gray-600">Licence Systèmes, Réseaux & Sécurité (OFPPT ISTA)</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Briefcase className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Expérience Professionnelle</h4>
                  <p className="text-gray-600">4 ans d'expérience IT Support Specialist</p>
                  <p className="text-gray-600">Expertise en infrastructure et systèmes</p>
                </div>
              </div>
            </div>

            <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="h-5 w-5 text-primary-600 mr-2" />
                Pourquoi me choisir ?
              </h4>
              <ul className="space-y-3">
                {values.map((value, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
