import { useParams, Link } from 'react-router';
import { establishments } from '../data/establishments';
import { ArrowLeft, Star, MapPin, Clock, Phone, Navigation, Share2, Heart, CheckCircle, Award } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Details() {
  const { id } = useParams();
  const establishment = establishments.find(e => e.id === id);

  if (!establishment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-900 mb-4">Establecimiento no encontrado</h2>
          <Link to="/" className="text-[#2D5F6D] hover:underline">
            Volver a la búsqueda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#A8DAD4]/10 to-[#FFCDB2]/5">
      {/* Header con imagen */}
      <div className="relative h-96 bg-gray-900">
        <ImageWithFallback
          src={establishment.image}
          alt={establishment.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20"></div>
        
        {/* Botón volver */}
        <Link
          to="/"
          className="absolute top-6 left-6 bg-white/95 backdrop-blur-md p-3 rounded-xl hover:bg-white transition-all shadow-lg hover:shadow-xl hover:scale-105"
        >
          <ArrowLeft size={24} className="text-[#3A3A3A]" />
        </Link>

        {/* Acciones */}
        <div className="absolute top-6 right-6 flex gap-3">
          <button className="bg-white/95 backdrop-blur-md p-3 rounded-xl hover:bg-white transition-all shadow-lg hover:shadow-xl hover:scale-105">
            <Share2 size={20} className="text-[#3A3A3A]" />
          </button>
          <button className="bg-white/95 backdrop-blur-md p-3 rounded-xl hover:bg-white transition-all shadow-lg hover:shadow-xl hover:scale-105 group">
            <Heart size={20} className="text-[#3A3A3A] group-hover:text-[#E36161] group-hover:fill-[#E36161] transition-all" />
          </button>
        </div>

        {/* Info básica */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span
                className={`px-4 py-2 rounded-full font-semibold shadow-lg backdrop-blur-md ${
                  establishment.type === 'clinica'
                    ? 'bg-[#2D5F6D]/90'
                    : 'bg-[#A8DAD4]/90 text-[#3A3A3A]'
                }`}
              >
                {establishment.type === 'clinica' ? '🏥 Clínica' : '💊 Farmacia'}
              </span>
              {establishment.openNow && (
                <span className="bg-[#A8DAD4]/90 backdrop-blur-md px-4 py-2 rounded-full font-medium flex items-center gap-2 shadow-lg text-[#3A3A3A]">
                  <div className="w-2.5 h-2.5 bg-[#3A3A3A] rounded-full animate-pulse"></div>
                  Abierto ahora
                </span>
              )}
              {establishment.rating >= 4.7 && (
                <span className="bg-[#FFCDB2]/90 backdrop-blur-md px-4 py-2 rounded-full font-medium flex items-center gap-2 shadow-lg text-[#3A3A3A]">
                  <Award size={18} />
                  Destacado
                </span>
              )}
            </div>
            <h1 className="text-5xl font-bold mb-3 drop-shadow-lg">{establishment.name}</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-[#FFCDB2]/30 backdrop-blur-md px-4 py-2 rounded-xl border border-[#FFCDB2]/50">
                <Star className="text-[#E36161] fill-[#E36161]" size={24} />
                <span className="text-2xl font-bold">{establishment.rating}</span>
                <span className="text-white/90">({establishment.reviewCount} reseñas)</span>
              </div>
              <span className="text-white/90 text-lg">• {establishment.distance} km de distancia</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Descripción */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-3xl text-[#3A3A3A] mb-4 font-semibold">Descripción</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{establishment.description}</p>
            </div>

            {/* Servicios */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-3xl text-[#3A3A3A] mb-6 font-semibold">Servicios disponibles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {establishment.services.map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#A8DAD4]/20 to-[#6B8D9C]/10 rounded-xl border border-[#A8DAD4]/40 hover:shadow-md transition-shadow"
                  >
                    <CheckCircle className="text-[#2D5F6D] shrink-0" size={22} />
                    <span className="text-[#3A3A3A] font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ubicación */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-3xl text-[#3A3A3A] mb-6 font-semibold">Ubicación</h2>
              <div className="aspect-video bg-gradient-to-br from-[#A8DAD4]/30 to-[#6B8D9C]/20 rounded-2xl mb-6 flex items-center justify-center border-2 border-[#A8DAD4]/40 overflow-hidden">
                <div className="text-center text-[#3A3A3A]">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <MapPin size={40} className="text-[#2D5F6D]" />
                  </div>
                  <p className="font-semibold text-lg">Mapa interactivo</p>
                  <p className="text-sm text-gray-600 mt-2">Lat: {establishment.coordinates.lat}, Lng: {establishment.coordinates.lng}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <MapPin className="text-[#2D5F6D] shrink-0 mt-1" size={22} />
                <div>
                  <p className="text-[#3A3A3A] font-medium text-lg">{establishment.address}</p>
                  <p className="text-gray-600">{establishment.city}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Barra lateral */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-6 space-y-8 border border-gray-100">
              <h3 className="text-2xl font-semibold text-[#3A3A3A] pb-4 border-b border-gray-200">
                Información de contacto
              </h3>
              
              {/* Horario */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[#A8DAD4]/20 rounded-lg">
                    <Clock size={22} className="text-[#2D5F6D]" />
                  </div>
                  <h4 className="text-lg text-[#3A3A3A] font-semibold">Horario</h4>
                </div>
                <p className="text-gray-700 ml-11 font-medium">{establishment.hours}</p>
              </div>

              {/* Teléfono */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[#A8DAD4]/20 rounded-lg">
                    <Phone size={22} className="text-[#2D5F6D]" />
                  </div>
                  <h4 className="text-lg text-[#3A3A3A] font-semibold">Teléfono</h4>
                </div>
                <p className="text-gray-700 ml-11 font-medium">{establishment.phone}</p>
              </div>

              {/* Dirección */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[#A8DAD4]/20 rounded-lg">
                    <MapPin size={22} className="text-[#2D5F6D]" />
                  </div>
                  <h4 className="text-lg text-[#3A3A3A] font-semibold">Dirección</h4>
                </div>
                <p className="text-gray-700 ml-11 font-medium">{establishment.address}</p>
                <p className="text-gray-600 ml-11">{establishment.city}</p>
              </div>

              {/* Botones de acción */}
              <div className="pt-6 space-y-4 border-t border-gray-200">
                <button className="w-full bg-gradient-to-r from-[#2D5F6D] to-[#6B8D9C] text-white py-4 px-6 rounded-xl hover:from-[#244951] hover:to-[#597684] transition-all font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg">
                  <Phone size={22} />
                  Llamar ahora
                </button>
                <button className="w-full border-2 border-[#2D5F6D] text-[#2D5F6D] py-4 px-6 rounded-xl hover:bg-[#A8DAD4]/10 transition-all font-semibold flex items-center justify-center gap-3 text-lg hover:shadow-md">
                  <Navigation size={22} />
                  Cómo llegar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}