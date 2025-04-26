// src/components/IncidentList/IncidentList.tsx
import React from 'react';
import { Incident } from '../../types/incident';
import IncidentCard from '../IncidentCard/IncidentCard';
import './IncidentList.css';

interface IncidentListProps {
  incidents: Incident[];
  expandedIncident: number | null;
  onToggleExpand: (id: number) => void;
}

const IncidentList: React.FC<IncidentListProps> = ({ 
  incidents, 
  expandedIncident, 
  onToggleExpand 
}) => {
  if (incidents.length === 0) {
    return (
      <div className="no-incidents">
        No incidents match the current filters.
      </div>
    );
  }

  return (
    <div className="incidents-list">
      {incidents.map(incident => (
        <IncidentCard
          key={incident.id}
          incident={incident}
          isExpanded={expandedIncident === incident.id}
          onToggleExpand={onToggleExpand}
        />
      ))}
    </div>
  );
};

export default IncidentList;