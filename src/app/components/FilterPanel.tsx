import { Filter, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import type { EstablishmentType } from '../data/establishments';

interface FilterPanelProps {
  selectedType: EstablishmentType | 'todos';
  onTypeChange: (type: EstablishmentType | 'todos') => void;
  openNow: boolean;
  onOpenNowChange: (value: boolean) => void;
  selectedServices: string[];
  onServicesChange: (services: string[]) => void;
}

const availableServices = [
  'Medicina General',
  'Pediatría',
  'Urgencias',
  'Traumatología',
  'Cardiología',
  'Odontología',
  'Análisis clínicos',
  'Vacunación',
  'Dermocosmética',
  'Homeopatía'
];

export function FilterPanel({
  selectedType,
  onTypeChange,
  openNow,
  onOpenNowChange,
  selectedServices,
  onServicesChange
}: FilterPanelProps) {
  const [showFilters, setShowFilters] = useState(true);

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      onServicesChange(selectedServices.filter(s => s !== service));
    } else {
      onServicesChange([...selectedServices, service]);
    }
  };

  const hasActiveFilters = selectedType !== 'todos' || openNow || selectedServices.length > 0;

  const clearFilters = () => {
    onTypeChange('todos');
    onOpenNowChange(false);
    onServicesChange([]);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-5 bg-gradient-to-br from-[#A8DAD4]/20 to-[#6B8D9C]/10 border-b border-[#A8DAD4]/30">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-3 text-[#3A3A3A] hover:text-[#2D5F6D] transition-colors w-full"
        >
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <Filter size={20} className="text-[#2D5F6D]" />
          </div>
          <span className="font-semibold">Filtros de búsqueda</span>
          {hasActiveFilters && (
            <span className="ml-auto bg-gradient-to-r from-[#2D5F6D] to-[#6B8D9C] text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-sm">
              {(selectedType !== 'todos' ? 1 : 0) + (openNow ? 1 : 0) + selectedServices.length}
            </span>
          )}
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="mt-3 flex items-center gap-2 text-sm text-gray-600 hover:text-[#E36161] transition-colors ml-auto bg-white px-3 py-1.5 rounded-lg hover:shadow-md"
          >
            <X size={16} />
            Limpiar filtros
          </button>
        )}
      </div>

      {showFilters && (
        <div className="p-5 space-y-6">
          {/* Tipo */}
          <div>
            <h3 className="mb-3 text-[#3A3A3A] font-semibold flex items-center gap-2">
              <Sparkles size={18} className="text-[#2D5F6D]" />
              Tipo de establecimiento
            </h3>
            <div className="flex flex-col gap-2">
              {(['todos', 'clinica', 'farmacia'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => onTypeChange(type)}
                  className={`px-4 py-3 rounded-xl border-2 transition-all font-medium ${
                    selectedType === type
                      ? 'bg-gradient-to-r from-[#2D5F6D] to-[#6B8D9C] text-white border-transparent shadow-lg scale-105'
                      : 'bg-white text-[#3A3A3A] border-gray-200 hover:border-[#6B8D9C] hover:shadow-md'
                  }`}
                >
                  {type === 'todos' ? '🏥 Todos' : type === 'clinica' ? '🏥 Clínicas' : '💊 Farmacias'}
                </button>
              ))}
            </div>
          </div>

          {/* Abierto ahora */}
          <div className="p-4 bg-gradient-to-br from-[#A8DAD4]/20 to-[#A8DAD4]/10 rounded-xl border border-[#A8DAD4]/40">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={openNow}
                onChange={(e) => onOpenNowChange(e.target.checked)}
                className="w-5 h-5 text-[#A8DAD4] rounded-lg focus:ring-2 focus:ring-[#A8DAD4] cursor-pointer accent-[#A8DAD4]"
              />
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${openNow ? 'bg-[#A8DAD4] animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-[#3A3A3A] font-medium">Abierto ahora</span>
              </div>
            </label>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="mb-3 text-[#3A3A3A] font-semibold flex items-center gap-2">
              <Sparkles size={18} className="text-[#2D5F6D]" />
              Servicios
            </h3>
            <div className="flex flex-wrap gap-2">
              {availableServices.map((service) => (
                <button
                  key={service}
                  onClick={() => toggleService(service)}
                  className={`px-4 py-2 rounded-full text-sm border-2 transition-all font-medium ${
                    selectedServices.includes(service)
                      ? 'bg-gradient-to-r from-[#2D5F6D] to-[#6B8D9C] text-white border-transparent shadow-md'
                      : 'bg-white text-[#3A3A3A] border-gray-200 hover:border-[#6B8D9C] hover:shadow-sm'
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}