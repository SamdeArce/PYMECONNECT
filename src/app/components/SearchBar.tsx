import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  location: string;
  onLocationChange: (value: string) => void;
}

export function SearchBar({ searchQuery, onSearchChange, location, onLocationChange }: SearchBarProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2D5F6D] transition-colors">
            <Search size={22} />
          </div>
          <input
            type="text"
            placeholder="Buscar clínicas, farmacias, servicios..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#A8DAD4]/40 focus:border-[#2D5F6D] outline-none transition-all bg-gray-50 focus:bg-white"
          />
        </div>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2D5F6D] transition-colors">
            <MapPin size={22} />
          </div>
          <input
            type="text"
            placeholder="Ubicación"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#A8DAD4]/40 focus:border-[#2D5F6D] outline-none transition-all bg-gray-50 focus:bg-white"
          />
        </div>
      </div>
    </div>
  );
}