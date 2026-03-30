import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: "Ahmed M.",
      context: "Étudiant ENSA",
      text: "Abdelilah a réalisé mon projet PFE en temps et en heure. Le code était propre, bien documenté et performant. Fortement recommandé !",
      domain: "Développement Web",
      rating: 5,
      avatar: "https://picsum.photos/seed/ahmed/100/100"
    },
    {
      name: "Layla B.",
      context: "Université Mohammed V",
      text: "Support excellent, explications claires, modifications rapidement intégrées. Professionnalisme au top.",
      domain: "Infrastructure & Cloud",
      rating: 5,
      avatar: "https://picsum.photos/seed/layla/100/100"
    },
    {
      name: "Youssef K.",
      context: "FST Settat",
      text: "Mon projet Big Data était bloqué. Abdelilah a repris le pipeline ETL et optimisé les modèles ML. J'ai eu une excellente note à ma soutenance.",
      domain: "Big Data & ML",
      rating: 5,
      avatar: "https://picsum.photos/seed/youssef/100/100"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold heading-font text-gray-900 mb-4">
            Avis Clients
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ce que disent les étudiants qui ont fait appel à mes services pour leur PFE.
          </p>
          <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full mt-6 mb-8"></div>
          
          <div className="inline-flex items-center justify-center bg-white px-6 py-3 rounded-full shadow-md border border-gray-100">
            <div className="flex text-yellow-400 mr-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="currentColor" />
              ))}
            </div>
            <span className="text-xl font-bold text-gray-900 mr-2">4.9/5</span>
            <span className="text-sm font-medium text-gray-500">Basé sur 20+ avis vérifiés</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative"
            >
              <Quote className="absolute top-6 right-6 text-primary-100 h-12 w-12" />
              
              <div className="flex text-yellow-400 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-8 relative z-10 italic">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center mt-auto">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-primary-100"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-xs text-gray-500">{testimonial.context}</p>
                  <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                    {testimonial.domain}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
