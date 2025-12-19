import { Navigate } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="py-4 px-16 bg-zinc-950 shadow-sm mb-4 flex">
          <h1 className="font-semibold text-lg text-zinc-50">Cotizador de locales <span className="text-2xl">🏪</span></h1>
          <span onClick={() => Navigate({to: "/"})} className="ml-auto cursor-pointer text-lg font-semibold text-zinc-200">Dashboard</span>
        </nav>
  )
}
