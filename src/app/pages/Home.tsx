import { useState, useMemo } from 'react';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { EstablishmentCard } from '../components/EstablishmentCard';
import { establishments } from '../data/establishments';
import type { EstablishmentType } from '../data/establishments';
import { Hospital, MapPinned, Sparkles } from 'lucide-react';

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Madrid');
  const [selectedType, setSelectedType] = useState<EstablishmentType | 'todos'>('todos');
  const [openNow, setOpenNow] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const filteredEstablishments = useMemo(() => {
    return establishments.filter((est) => {
      // Filtro de búsqueda
      const matchesSearch = searchQuery === '' || 
        est.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        est.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        est.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

      // Filtro de tipo
      const matchesType = selectedType === 'todos' || est.type === selectedType;

      // Filtro de abierto ahora
      const matchesOpenNow = !openNow || est.openNow;

      // Filtro de servicios
      const matchesServices = selectedServices.length === 0 ||
        selectedServices.some(service => est.services.includes(service));

      return matchesSearch && matchesType && matchesOpenNow && matchesServices;
    });
  }, [searchQuery, selectedType, openNow, selectedServices]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#A8DAD4]/10 to-[#FFCDB2]/10">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#2D5F6D] via-[#6B8D9C] to-[#2D5F6D] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2D5F6D]/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
              <Hospital size={36} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">MediFind</h1>
              <div className="flex items-center gap-2 mt-1">
                <Sparkles size={16} className="text-[#FFCDB2]" />
                <p className="text-[#A8DAD4]">Tu salud, siempre cerca</p>
              </div>
            </div>
          </div>
          <p className="text-lg text-white/90 max-w-2xl">
            Encuentra las mejores clínicas y farmacias en tu zona. Rápido, fácil y confiable.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Búsqueda */}
        <div className="mb-8 -mt-12 relative z-10">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            location={location}
            onLocationChange={setLocation}
          />
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filtros */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <FilterPanel
                selectedType={selectedType}
                onTypeChange={setSelectedType}
                openNow={openNow}
                onOpenNowChange={setOpenNow}
                selectedServices={selectedServices}
                onServicesChange={setSelectedServices}
              />
            </div>
          </div>

          {/* Resultados */}
          <div className="lg:col-span-3">
            <div className="mb-6 bg-white rounded-2xl shadow-md p-5 border border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-[#3A3A3A]">
                  {filteredEstablishments.length} resultado{filteredEstablishments.length !== 1 ? 's' : ''}
                </h2>
                <p className="text-gray-600 text-sm mt-1">Ordenados por distancia</p>
              </div>
              <div className="flex items-center gap-2 text-[#3A3A3A] bg-gradient-to-br from-[#A8DAD4]/20 to-[#6B8D9C]/10 px-4 py-2 rounded-xl border border-[#A8DAD4]/40">
                <MapPinned size={20} className="text-[#2D5F6D]" />
                <span className="font-medium">{location}</span>
              </div>
            </div>

            {filteredEstablishments.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-16 text-center border border-gray-100">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#A8DAD4]/30 to-[#6B8D9C]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Hospital className="text-[#2D5F6D]" size={48} />
                  </div>
                  <h3 className="text-2xl text-[#3A3A3A] mb-3 font-semibold">No se encontraron resultados</h3>
                  <p className="text-gray-600">
                    Intenta ajustar los filtros o cambiar los términos de búsqueda para encontrar lo que necesitas
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredEstablishments.map((establishment) => (
                  <EstablishmentCard key={establishment.id} establishment={establishment} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 bg-gradient-to-r from-[#3A3A3A] via-[#2D5F6D] to-[#3A3A3A] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Hospital size={28} />
            <span className="text-2xl font-semibold">MediFind</span>
          </div>
          <p className="text-gray-300 mb-2">
            Tu plataforma de confianza para encontrar servicios de salud
          </p>
          <p className="text-gray-400 text-sm">
            © 2026 MediFind. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}