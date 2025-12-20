import { Navigate } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="py-4 px-4 md:px-16 bg-zinc-950 shadow-sm mb-4 flex items-center justify-between">
          <h1 className="font-semibold text-base md:text-lg text-zinc-50 truncate">Cotizador de locales <span className="text-xl md:text-2xl">🏪</span></h1>
          <span onClick={() => Navigate({to: "/"})} className="cursor-pointer text-base md:text-lg font-semibold text-zinc-200 hover:text-white transition-colors">Dashboard</span>
        </nav>
  )
}
