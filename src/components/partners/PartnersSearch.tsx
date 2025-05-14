
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PartnersSearchProps {
  searchQuery: string;
  categoryFilter: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

const PartnersSearch: React.FC<PartnersSearchProps> = ({
  searchQuery,
  categoryFilter,
  onSearchChange,
  onCategoryChange
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-grow">
        <Input
          placeholder="Rechercher un partenaire..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="w-full md:w-64">
        <Select value={categoryFilter} onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrer par catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            <SelectItem value="emploi">Recherche d'emploi</SelectItem>
            <SelectItem value="formation">Formation</SelectItem>
            <SelectItem value="insertion">Insertion professionnelle</SelectItem>
            <SelectItem value="accompagnement">Accompagnement social</SelectItem>
            <SelectItem value="aide">Aide aux démarches</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PartnersSearch;
