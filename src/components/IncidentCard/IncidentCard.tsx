// src/components/IncidentCard/IncidentCard.tsx
import React from 'react';
import { Incident } from '../../types/incident';
import './IncidentCard.css';

interface IncidentCardProps {
  incident: Incident;
  isExpanded: boolean;
  onToggleExpand: (id: number) => void;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ 
  incident, 
  isExpanded, 
  onToggleExpand 
}) => {
  return (
    <div className={`incident-card severity-${incident.severity.toLowerCase()}`}>
      <div className="incident-header">
        <div className="incident-title">
          <h3>{incident.title}</h3>
          <span className={`severity-badge ${incident.severity.toLowerCase()}`}>
            {incident.severity}
          </span>
        </div>
        <div className="incident-meta">
          <span className="date">
            {new Date(incident.reported_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
          <button 
            onClick={() => onToggleExpand(incident.id)}
            className="view-details"
          >
            {isExpanded ? 'Hide Details' : 'View Details'}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="incident-description">
          <p>{incident.description}</p>
        </div>
      )}
    </div>
  );
};

export default IncidentCard;