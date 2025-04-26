import React from 'react';
import { Incident } from '../../types/incident';
import IncidentList from '../IncidentList/IncidentList';
import IncidentForm from '../IncidentForm/IncidentForm';
import './MainContent.css';

interface MainContentProps {
  incidents: Incident[];
  expandedIncident: number | null;
  isReporting: boolean;
  newIncident: Omit<Incident, 'id' | 'reported_at'>;
  filteredCount: number;
  totalCount: number;
  onToggleExpand: (id: number) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  onStartReporting: () => void;
}

const MainContent: React.FC<MainContentProps> = ({
  incidents,
  expandedIncident,
  isReporting,
  newIncident,
  filteredCount,
  totalCount,
  onToggleExpand,
  onInputChange,
  onSubmit,
  onCancel,
  onStartReporting
}) => {
  return (
    <div className="main-content">
      <div className="main-header">
        <h1>AI Safety Incidents</h1>
        <div className="header-actions">
          <div className="incidents-count">
            Showing {filteredCount} of {totalCount} incidents
          </div>
          {!isReporting && (
            <button 
              className="report-button"
              onClick={onStartReporting}
            >
              Report New Incident
            </button>
          )}
        </div>
      </div>
      
      {isReporting ? (
        <div className="form-container">
          <IncidentForm 
            newIncident={newIncident}
            onInputChange={onInputChange}
            onSubmit={onSubmit}
            onCancel={onCancel}
          />
        </div>
      ) : (
        <IncidentList 
          incidents={incidents} 
          expandedIncident={expandedIncident}
          onToggleExpand={onToggleExpand}
        />
      )}
    </div>
  );
};

export default MainContent;