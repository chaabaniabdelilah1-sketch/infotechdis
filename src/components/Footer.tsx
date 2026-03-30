import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-950 text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <a href="#home" className="text-2xl font-bold heading-font text-white mb-4 inline-block tracking-tight">
              INFO <span className="text-accent-500">TECHDIS</span>
            </a>
            <p className="text-sm text-gray-500 max-w-md mb-6 leading-relaxed">
              Expert en développement web, infrastructure IT et Big Data. J'accompagne les étudiants dans la réalisation de leurs projets de fin d'études avec professionnalisme et rigueur.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </a>
              <a href="mailto:chaabani.abdelilah1@gmail.com" className="text-gray-500 hover:text-white transition-colors">
                <span className="sr-only">Email</span>
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-sm hover:text-primary-400 transition-colors">Accueil</a></li>
              <li><a href="#about" className="text-sm hover:text-primary-400 transition-colors">À Propos</a></li>
              <li><a href="#services" className="text-sm hover:text-primary-400 transition-colors">Services</a></li>
              <li><a href="#portfolio" className="text-sm hover:text-primary-400 transition-colors">Portfolio</a></li>
              <li><a href="#pricing" className="text-sm hover:text-primary-400 transition-colors">Tarifs</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Légal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-primary-400 transition-colors">Mentions Légales</a></li>
              <li><a href="#" className="text-sm hover:text-primary-400 transition-colors">Politique de Confidentialité</a></li>
              <li><a href="#" className="text-sm hover:text-primary-400 transition-colors">CGV</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Abdelilah Chaabani. Tous droits réservés.
          </p>
          <button 
            onClick={scrollToTop}
            className="p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-colors focus:outline-none"
            aria-label="Retour en haut"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
