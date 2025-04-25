import React, { useState } from 'react';
import './App.css';
import IncidentCard from './components/IncidentCard/IncidentCard';
import IncidentForm from './components/IncidentForm/IncidentForm';
import Controls from './components/Controls/Controls';
import { Incident, Severity, SortOrder } from './types';

const initialIncidents: Incident[] = [
  { 
    id: 1, 
    title: "Biased Recommendation Algorithm", 
    description: "Algorithm consistently favored certain demographics...", 
    severity: "Medium", 
    reported_at: "2025-03-15T10:00:00Z" 
  },
  { 
    id: 2, 
    title: "LLM Hallucination in Critical Info", 
    description: "LLM provided incorrect safety procedure information...", 
    severity: "High", 
    reported_at: "2025-04-01T14:30:00Z" 
  },
  { 
    id: 3, 
    title: "Minor Data Leak via Chatbot", 
    description: "Chatbot inadvertently exposed non-sensitive user metadata...", 
    severity: "Low", 
    reported_at: "2025-03-20T09:15:00Z" 
  }
];

const App: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [filter, setFilter] = useState<Severity | 'All'>('All');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [expandedIncident, setExpandedIncident] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newIncident, setNewIncident] = useState<Omit<Incident, 'id' | 'reported_at'>>({ 
    title: '', 
    description: '', 
    severity: 'Low' 
  });

  const filteredIncidents = incidents.filter(incident => 
    filter === 'All' || incident.severity === filter
  );

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime();
    const dateB = new Date(b.reported_at).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIncident.title || !newIncident.description) return;
    
    const incident: Incident = {
      id: incidents.length + 1,
      title: newIncident.title,
      description: newIncident.description,
      severity: newIncident.severity,
      reported_at: new Date().toISOString()
    };
    
    setIncidents([...incidents, incident]);
    setNewIncident({ title: '', description: '', severity: 'Low' });
    setShowForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewIncident({
      ...newIncident,
      [name]: value
    });
  };

  const toggleExpand = (id: number) => {
    setExpandedIncident(expandedIncident === id ? null : id);
  };

  return (
    <div className="dashboard">
      <h1>AI Safety Incident Dashboard</h1>
      
      <Controls
        filter={filter}
        onFilterChange={setFilter}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        onToggleForm={() => setShowForm(!showForm)}
        showForm={showForm}
      />
      
      {showForm && (
        <IncidentForm
          onSubmit={handleSubmit}
          incident={newIncident}
          onInputChange={handleInputChange}
          onCancel={() => setShowForm(false)}
        />
      )}
      
      <div className="incidents-list">
        {sortedIncidents.length === 0 ? (
          <p>No incidents found matching the current filter.</p>
        ) : (
          sortedIncidents.map(incident => (
            <IncidentCard
              key={incident.id}
              incident={incident}
              isExpanded={expandedIncident === incident.id}
              onToggleExpand={toggleExpand}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default App;