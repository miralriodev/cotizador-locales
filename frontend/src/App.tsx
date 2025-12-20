import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CreateQuote from "@/pages/CreateQuote";
import Dashboard from "@/pages/Dashboard";
import LocalDetail from "@/pages/LocalDetail";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
  <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900 w-full">
        <Navbar/>
        <main className="container mx-auto px-4 min-h-screen py-4 md:py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/local/:codigo" element={<LocalDetail />} />
            <Route path="/cotizar" element={<CreateQuote />} />
          </Routes>
        </main>
        <Footer />
      </div>
      </BrowserRouter>
  )
}

export default App