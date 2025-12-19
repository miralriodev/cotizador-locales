import Navbar from "@/components/Navbar";
import CreateQuote from "@/pages/CreateQuote";
import Dashboard from "@/pages/Dashboard";
import LocalDetail from "@/pages/LocalDetail";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
  <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900 min-w-screen">
        <Navbar/>
        <main className="container mx-auto px-4 min-h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/local/:id" element={<LocalDetail />} />
            <Route path="/cotizar/:id" element={<CreateQuote />} />
          </Routes>
        </main>
        <section className="py-8 px-12 bg-zinc-950 min-h-20 text-zinc-50">
          <p>Cotizador de Locales para Constructora del Bajio Esscala.</p>
        </section>
      </div>
      </BrowserRouter>
  )
}

export default App