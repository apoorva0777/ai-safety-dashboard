import React from 'react';
import { Severity, SortOrder } from '../../types';
import './Controls.css';

interface ControlsProps {
  filter: Severity | 'All';
  onFilterChange: (filter: Severity | 'All') => void;
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
  onToggleForm: () => void;
  showForm: boolean;
}

const Controls: React.FC<ControlsProps> = ({ 
  filter, 
  onFilterChange, 
  sortOrder, 
  onSortChange,
  onToggleForm,
  showForm
}) => {
  return (
    <div className="controls">
      <div className="filter-control">
        <label>Filter by Severity:</label>
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
      
      <div className="sort-control">
        <label>Sort by Date:</label>
        <select 
          value={sortOrder} 
          onChange={(e) => onSortChange(e.target.value as SortOrder)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
      
      <button 
        className="add-incident" 
        onClick={onToggleForm}
        type="button"
      >
        {showForm ? 'Cancel' : 'Report New Incident'}
      </button>
    </div>
  );
};

export default Controls;