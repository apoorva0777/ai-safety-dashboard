import React from 'react';
import { Severity } from '../../types';
import './IncidentForm.css';

interface IncidentFormProps {
  onSubmit: (e: React.FormEvent) => void;
  incident: {
    title: string;
    description: string;
    severity: Severity;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onCancel: () => void;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ 
  onSubmit, 
  incident, 
  onInputChange,
  onCancel
}) => {
  return (
    <form className="incident-form" onSubmit={onSubmit}>
      <h2>Report New Incident</h2>
      <div className="form-group">
        <label>Title:</label>
        <input 
          type="text" 
          name="title"
          value={incident.title} 
          onChange={onInputChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Description:</label>
        <textarea 
          name="description"
          value={incident.description} 
          onChange={onInputChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Severity:</label>
        <select 
          name="severity"
          value={incident.severity} 
          onChange={onInputChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      
      <div className="form-actions">
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default IncidentForm;