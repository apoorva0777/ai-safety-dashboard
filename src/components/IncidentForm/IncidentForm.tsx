import React from 'react';
import { Incident } from '../../types/incident';
import './IncidentForm.css';

interface IncidentFormProps {
  newIncident: Omit<Incident, 'id' | 'reported_at'>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ 
  newIncident, 
  onInputChange, 
  onSubmit, 
  onCancel 
}) => {
  return (
    <form onSubmit={onSubmit} className="report-form">
      <h2>Report New Incident</h2>
      <div className="form-section">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={newIncident.title}
            onChange={onInputChange}
            required
            placeholder="Enter incident title"
          />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={newIncident.description}
            onChange={onInputChange}
            required
            placeholder="Describe the incident in detail"
          />
        </div>
        
        <div className="form-group">
          <label>Severity</label>
          <select
            name="severity"
            value={newIncident.severity}
            onChange={onInputChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>
      
      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-button">
          Cancel
        </button>
        <button type="submit" className="submit-button">
          Submit Report
        </button>
      </div>
    </form>
  );
};

export default IncidentForm;