import { Navigate } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="py-4 px-4 md:px-36 bg-zinc-950 shadow-sm mb-4 flex items-center justify-between">
          <h1 className="flex gap-2 font-semibold text-base md:text-lg text-zinc-50 truncate"><img className="w-auto h-4 md:h-7 bg-auto" src="/logo.png" alt="" /><p className=" hidden md:block">Cotizador de locales</p> </h1>
          <span onClick={() => Navigate({to: "/"})} className="cursor-pointer text-base md:text-lg font-semibold text-zinc-200 hover:text-white transition-colors">Dashboard</span>
        </nav>
  )
}
