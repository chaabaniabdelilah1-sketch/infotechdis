import { motion } from 'motion/react';
import { ArrowRight, Code2, Database, Server } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-100 via-white to-white"></div>
      <div className="absolute top-20 right-0 -z-10 w-[600px] h-[600px] bg-primary-50 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-10 -z-10 w-[400px] h-[400px] bg-secondary-500/10 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary-600 mr-2"></span>
              Disponible pour de nouveaux projets
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold heading-font text-gray-900 leading-tight mb-6">
              Obtenez une PFE de 18/20 – <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">Livrée À Temps</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              500+ étudiants ont déjà réussi leur PFE avec nous. Code professionnel + Documentation impeccable + Support jusqu'à votre soutenance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex justify-center items-center px-8 py-4 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium text-lg transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-1"
              >
                Réserver Consultation Gratuite
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#pricing"
                className="inline-flex justify-center items-center px-8 py-4 rounded-full bg-white border border-gray-200 hover:border-primary-200 hover:bg-primary-50 text-gray-700 font-medium text-lg transition-all"
              >
                Voir les Tarifs
              </a>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-gray-100 pt-8">
              <div className="flex flex-col">
                <p className="text-xl sm:text-2xl font-bold text-gray-900 heading-font">⭐ 4.9/5</p>
                <p className="text-sm text-gray-500 mt-1">(187 avis)</p>
              </div>
              <div className="flex flex-col">
                <p className="text-xl sm:text-2xl font-bold text-gray-900 heading-font">📚 500+</p>
                <p className="text-sm text-gray-500 mt-1">PFE réussies</p>
              </div>
              <div className="flex flex-col">
                <p className="text-xl sm:text-2xl font-bold text-gray-900 heading-font">✅ 98%</p>
                <p className="text-sm text-gray-500 mt-1">Taux de réussite</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Decorative elements around image */}
              <div className="absolute top-0 -left-4 w-24 h-24 bg-accent-500/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-10 -right-4 w-32 h-32 bg-primary-500/20 rounded-full blur-xl"></div>
              
              {/* Main Image Container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-8 border-white shadow-2xl bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200" 
                  alt="Abdelilah Chaabani - Expert IT" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Code2 size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase">Expertise</p>
                  <p className="text-sm font-semibold text-gray-900">Full-Stack Web</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -left-12 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <Database size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase">Spécialité</p>
                  <p className="text-sm font-semibold text-gray-900">Big Data</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-6 right-10 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                  <Server size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase">Domaine</p>
                  <p className="text-sm font-semibold text-gray-900">Infrastructure</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
