import { MapPin, Star, Clock, Phone, Navigation, TrendingUp } from 'lucide-react';
import { Link } from 'react-router';
import type { Establishment } from '../data/establishments';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EstablishmentCardProps {
  establishment: Establishment;
}

export function EstablishmentCard({ establishment }: EstablishmentCardProps) {
  return (
    <Link
      to={`/establecimiento/${establishment.id}`}
      className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 block border border-gray-100 hover:scale-[1.02]"
    >
      <div className="relative h-56 overflow-hidden">
        <ImageWithFallback
          src={establishment.image}
          alt={establishment.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"></div>
        
        <div className="absolute top-4 right-4 flex gap-2">
          <span
            className={`px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm ${
              establishment.type === 'clinica'
                ? 'bg-[#2D5F6D]/90 text-white'
                : 'bg-[#A8DAD4]/90 text-[#3A3A3A]'
            }`}
          >
            {establishment.type === 'clinica' ? '🏥 Clínica' : '💊 Farmacia'}
          </span>
        </div>
        
        {establishment.openNow && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-[#A8DAD4]/95 backdrop-blur-sm text-[#3A3A3A] px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg">
              <div className="w-2 h-2 bg-[#3A3A3A] rounded-full animate-pulse"></div>
              Abierto ahora
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-2xl mb-3 text-[#3A3A3A] group-hover:text-[#2D5F6D] transition-colors">{establishment.name}</h3>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-[#FFCDB2]/30 to-[#FFCDB2]/20 px-3 py-1.5 rounded-full border border-[#FFCDB2]/60">
            <Star className="text-[#E36161] fill-[#E36161]" size={18} />
            <span className="font-semibold text-[#3A3A3A]">{establishment.rating}</span>
          </div>
          <span className="text-gray-500 text-sm">({establishment.reviewCount} reseñas)</span>
          {establishment.rating >= 4.7 && (
            <div className="ml-auto flex items-center gap-1 text-[#E36161] text-sm font-medium">
              <TrendingUp size={16} />
              Popular
            </div>
          )}
        </div>

        <div className="space-y-3 text-sm text-gray-600 mb-5">
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
            <MapPin className="shrink-0 mt-0.5 text-[#2D5F6D]" size={18} />
            <div className="flex-1">
              <p className="text-[#3A3A3A]">{establishment.address}</p>
              <p className="text-[#2D5F6D] font-semibold mt-1 flex items-center gap-1">
                <Navigation size={14} />
                {establishment.distance} km
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <Clock size={18} className="shrink-0 text-[#2D5F6D]" />
            <span className="text-[#3A3A3A]">{establishment.hours}</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <Phone size={18} className="shrink-0 text-[#2D5F6D]" />
            <span className="text-[#3A3A3A]">{establishment.phone}</span>
          </div>
        </div>

        <div className="mb-5 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide font-semibold">Servicios destacados</p>
          <div className="flex flex-wrap gap-2">
            {establishment.services.slice(0, 3).map((service) => (
              <span
                key={service}
                className="px-3 py-1.5 bg-gradient-to-r from-[#A8DAD4]/20 to-[#6B8D9C]/10 text-[#2D5F6D] rounded-lg text-xs font-medium border border-[#A8DAD4]/40"
              >
                {service}
              </span>
            ))}
            {establishment.services.length > 3 && (
              <span className="px-3 py-1.5 text-gray-600 text-xs font-medium bg-gray-100 rounded-lg">
                +{establishment.services.length - 3} más
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 bg-gradient-to-r from-[#2D5F6D] to-[#6B8D9C] text-white py-3 px-4 rounded-xl hover:from-[#244951] hover:to-[#597684] transition-all font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2">
            <Phone size={18} />
            Llamar
          </button>
          <button className="flex-1 border-2 border-[#2D5F6D] text-[#2D5F6D] py-3 px-4 rounded-xl hover:bg-[#A8DAD4]/10 transition-all font-medium flex items-center justify-center gap-2">
            <Navigation size={18} />
            Ruta
          </button>
        </div>
      </div>
    </Link>
  );
}