import { Link } from 'react-router';
import { Hospital, Home } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#A8DAD4]/10 to-[#FFCDB2]/10 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-[#A8DAD4]/40 to-[#6B8D9C]/30 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <Hospital className="text-[#2D5F6D]" size={64} />
          </div>
          <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-[#FFCDB2]/80 to-[#E36161]/60 rounded-full flex items-center justify-center shadow-md">
            <span className="text-3xl">😕</span>
          </div>
        </div>
        
        <h1 className="text-8xl font-bold bg-gradient-to-r from-[#2D5F6D] to-[#6B8D9C] bg-clip-text text-transparent mb-4">404</h1>
        <h2 className="text-3xl text-[#3A3A3A] mb-4 font-semibold">Página no encontrada</h2>
        <p className="text-gray-600 mb-8 text-lg">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-[#2D5F6D] to-[#6B8D9C] text-white px-8 py-4 rounded-xl hover:from-[#244951] hover:to-[#597684] transition-all font-semibold shadow-lg hover:shadow-xl hover:scale-105 text-lg"
        >
          <Home size={22} />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}