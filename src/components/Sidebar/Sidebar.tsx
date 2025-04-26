import React from 'react';
import IncidentFilters from '../IncidentFilters/IncidentFilters';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Sidebar.css';

interface SidebarProps {
  filter: 'All' | 'Low' | 'Medium' | 'High';
  sortOrder: 'newest' | 'oldest';
  onFilterChange: (filter: 'All' | 'Low' | 'Medium' | 'High') => void;
  onSortChange: (sortOrder: 'newest' | 'oldest') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  filter, 
  sortOrder, 
  onFilterChange, 
  onSortChange 
}) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>AI Safety Dashboard</h2>
        <ThemeToggle />
      </div>
      
      <div className="sidebar-content">
        <IncidentFilters 
          filter={filter} 
          sortOrder={sortOrder} 
          onFilterChange={onFilterChange} 
          onSortChange={onSortChange} 
        />
      </div>
    </div>
  );
};

export default Sidebar;