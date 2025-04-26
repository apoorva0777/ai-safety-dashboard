import React from 'react';
import { Severity, SortOrder } from '../../types/incident';
import './IncidentFilters.css';

interface IncidentFiltersProps {
  filter: Severity | 'All';
  sortOrder: SortOrder;
  onFilterChange: (filter: Severity | 'All') => void;
  onSortChange: (sortOrder: SortOrder) => void;
}

const IncidentFilters: React.FC<IncidentFiltersProps> = ({ 
  filter, 
  sortOrder, 
  onFilterChange, 
  onSortChange 
}) => {
  return (
    <div className="filters">
      <h3>Filters</h3>
      <div className="filter-group">
        <label>Severity:</label>
        <select 
          value={filter} 
          onChange={(e) => onFilterChange(e.target.value as Severity | 'All')}
        >
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label>Sort by:</label>
        <select 
          value={sortOrder} 
          onChange={(e) => onSortChange(e.target.value as SortOrder)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>
  );
};

export default IncidentFilters;