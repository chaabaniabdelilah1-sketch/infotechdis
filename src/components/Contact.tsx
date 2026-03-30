import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';

type FormData = {
  name: string;
  email: string;
  university: string;
  domain: string;
  description: string;
  budget: string;
  deadline: string;
};

export function Contact() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>();
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit = async (data: FormData) => {
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey || templateId === "YOUR_TEMPLATE_ID" || publicKey === "YOUR_PUBLIC_KEY") {
        console.error("EmailJS configuration is missing");
        setSubmitStatus('error');
        return;
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: data.name,
          from_email: data.email,
          university: data.university,
          domain: data.domain,
          description: data.description,
          budget: data.budget,
          deadline: data.deadline,
          to_name: "Abdelilah",
        },
        {
          publicKey: publicKey,
        }
      );

      setSubmitStatus('success');
      reset();
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error: any) {
      console.error("Failed to send email:", error);
      setSubmitStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold heading-font mb-4">
            Discutons de Votre Projet
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Remplissez le formulaire ci-dessous pour obtenir un devis gratuit et détaillé sous 24h.
          </p>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold heading-font mb-6 text-primary-400">Coordonnées</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <Phone className="h-5 w-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Téléphone / WhatsApp</p>
                    <a href="tel:+212625302274" className="text-lg font-medium hover:text-primary-400 transition-colors">
                      +212 625 302 274
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <Mail className="h-5 w-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Email</p>
                    <a href="mailto:chaabani.abdelilah1@gmail.com" className="text-lg font-medium hover:text-primary-400 transition-colors break-all">
                      chaabani.abdelilah1@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <MapPin className="h-5 w-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Localisation</p>
                    <p className="text-lg font-medium">
                      Casablanca, Maroc<br/>
                      <span className="text-sm text-gray-400">(Disponible à distance)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nom Complet *</label>
                  <input
                    id="name"
                    type="text"
                    {...register("name", { required: "Ce champ est requis" })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Votre nom"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                  <input
                    id="email"
                    type="email"
                    {...register("email", { 
                      required: "Ce champ est requis",
                      pattern: { value: /^\S+@\S+$/i, message: "Email invalide" }
                    })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="votre@email.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="university" className="block text-sm font-medium text-gray-300 mb-2">Université / École</label>
                  <input
                    id="university"
                    type="text"
                    {...register("university")}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Ex: ENSA, FST, OFPPT..."
                  />
                </div>
                
                <div>
                  <label htmlFor="domain" className="block text-sm font-medium text-gray-300 mb-2">Domaine du Projet *</label>
                  <select
                    id="domain"
                    {...register("domain", { required: "Veuillez sélectionner un domaine" })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none"
                  >
                    <option value="">Sélectionnez un domaine</option>
                    <option value="web">Développement Web</option>
                    <option value="mobile">Application Mobile</option>
                    <option value="infra">Infrastructure / Réseaux</option>
                    <option value="data">Big Data / Data Science</option>
                    <option value="other">Autre</option>
                  </select>
                  {errors.domain && <p className="mt-1 text-sm text-red-400">{errors.domain.message}</p>}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Description du Projet *</label>
                <textarea
                  id="description"
                  rows={5}
                  {...register("description", { required: "Veuillez décrire votre projet" })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                  placeholder="Décrivez brièvement votre cahier des charges, les fonctionnalités clés, et les technologies souhaitées..."
                ></textarea>
                {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">Budget Estimé (DH)</label>
                  <input
                    id="budget"
                    type="text"
                    {...register("budget")}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Ex: 5000 - 10000"
                  />
                </div>
                
                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-300 mb-2">Délai Souhaité</label>
                  <input
                    id="deadline"
                    type="text"
                    {...register("deadline")}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Ex: Fin Juin 2025"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center py-4 px-8 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:ring-offset-gray-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="-ml-1 mr-3 h-5 w-5 text-white" />
                    Demander un Devis Gratuit
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-900/50 border border-green-500/50 rounded-xl text-green-400 text-center"
                >
                  Votre demande a été envoyée avec succès ! Je vous répondrai sous 24h.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-900/50 border border-red-500/50 rounded-xl text-red-400 text-center"
                >
                  Une erreur est survenue lors de l'envoi. Veuillez réessayer ou me contacter par téléphone.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
