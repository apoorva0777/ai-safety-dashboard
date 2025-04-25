import React from 'react';
import { Incident } from '../../types';
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
    <div className={`incident-card ${incident.severity.toLowerCase()}`}>
      <div className="incident-header">
        <h3>{incident.title}</h3>
        <div className="incident-meta">
          <span className={`severity ${incident.severity.toLowerCase()}`}>
            {incident.severity}
          </span>
          <span className="date">
            {new Date(incident.reported_at).toLocaleDateString()}
          </span>
          <button 
            className="view-details"
            onClick={() => onToggleExpand(incident.id)}
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