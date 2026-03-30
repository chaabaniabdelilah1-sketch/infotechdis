import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const faqs = [
    {
      question: "Comment vous assurer de la qualité du code ?",
      answer: "J'utilise les meilleures pratiques de l'industrie (Clean Code, SOLID), des linters, et j'effectue des tests rigoureux avant chaque livraison. Mon expérience de 4 ans en entreprise garantit un standard professionnel."
    },
    {
      question: "Puis-je avoir accès au code source ?",
      answer: "Absolument. Vous êtes le propriétaire final du projet. Le code source complet, non obfusqué et bien commenté vous est livré à la fin de la prestation."
    },
    {
      question: "Que se passe-t-il si je ne suis pas satisfait ?",
      answer: "La satisfaction est ma priorité. Chaque forfait inclut des révisions (généralement 2 à 3 selon le projet) pour ajuster le livrable selon vos retours exacts."
    },
    {
      question: "Pouvez-vous garder le projet confidentiel ?",
      answer: "Oui, un accord de confidentialité (NDA) peut être signé avant le début du projet. Vos idées et données restent strictement privées."
    },
    {
      question: "Comment communiquer pendant le projet ?",
      answer: "Nous utiliserons WhatsApp, Email ou Slack pour les échanges quotidiens, et Google Meet/Zoom pour les points d'étape importants et les démonstrations."
    },
    {
      question: "Livrez-vous la documentation ?",
      answer: "Oui, une documentation technique claire (architecture, installation, utilisation) est fournie pour vous aider à comprendre et présenter votre projet lors de la soutenance."
    },
    {
      question: "Est-ce vraiment 'votre' travail ?",
      answer: "Tout le code est écrit par moi-même ou généré sous mon contrôle strict. Je n'externalise pas à des tiers pour garantir la qualité et la sécurité."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold heading-font text-gray-900 mb-4">
            Questions Fréquentes
          </h2>
          <p className="text-lg text-gray-600">
            Tout ce que vous devez savoir avant de démarrer notre collaboration.
          </p>
          <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
              >
                <span className="text-lg font-bold text-gray-900">{faq.question}</span>
                <ChevronDown 
                  className={`h-5 w-5 text-primary-600 transition-transform duration-300 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
