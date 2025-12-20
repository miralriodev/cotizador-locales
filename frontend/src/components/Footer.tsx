import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import logo from "../assets/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-gray-300 py-12 mt-auto border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              🏢 Cotizador de Locales
            </h3>
            <img
              src={logo}
              alt="Logo Empresa"
              className="h-12 w-auto object-contain bg-white rounded-lg p-1"
              // Nota: El 'bg-white' y 'p-1' ayudan si tu logo es oscuro o tiene fondo transparente
            />
            <p className="text-sm text-gray-400 max-w-xs">
              Plataforma de gestión y cotización de locales. Prueba técnica.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">
              Tecnologías Usadas
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span> React
                + Vite + Tailwind
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>{" "}
                Node.js + Express
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-sky-600 rounded-full"></span> Docker
                + Render
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full"></span> Vercel
                (Frontend)
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Desarrollado por</h4>
            <p className="font-medium text-white mb-4">Hugo Miralrio</p>

            <div className="flex gap-4">
              <a
                href="https://github.com/miralriodev/cotizador-locales" // <--- PON TU LINK DEL REPO
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 hover:text-white transition-colors"
                aria-label="Ver código en GitHub"
              >
                <GitHubLogoIcon className="w-5 h-5" />
              </a>

              <a
                href="https://linkedin.com/in/tu-usuario"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-900 p-2 rounded-full hover:bg-blue-800 text-white transition-colors"
                aria-label="Perfil de LinkedIn"
              >
                <LinkedInLogoIcon className="w-5 h-5" />
              </a>
            </div>

            <p className="mt-6 text-xs text-gray-500">
              Ver código fuente del proyecto &rarr;
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {currentYear} Todos los derechos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-gray-300 cursor-pointer">
              Aviso de Privacidad
            </span>
            <span className="hover:text-gray-300 cursor-pointer">
              Términos y Condiciones
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
