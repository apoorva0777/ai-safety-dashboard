import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Incident, Severity, SortOrder } from './types/incident';
import { initialIncidents } from './utils/constants';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import './App.css';

const App: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [filter, setFilter] = useState<Severity | 'All'>('All');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [expandedIncident, setExpandedIncident] = useState<number | null>(null);
  const [isReporting, setIsReporting] = useState(false);
  const [newIncident, setNewIncident] = useState<Omit<Incident, 'id' | 'reported_at'>>({ 
    title: '', 
    description: '', 
    severity: 'Medium' 
  });

  const filteredIncidents = incidents.filter(incident => 
    filter === 'All' || incident.severity === filter
  );

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime();
    const dateB = new Date(b.reported_at).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIncident.title.trim() || !newIncident.description.trim()) return;
    
    const incident: Incident = {
      id: incidents.length + 1,
      title: newIncident.title,
      description: newIncident.description,
      severity: newIncident.severity,
      reported_at: new Date().toISOString()
    };
    
    setIncidents([incident, ...incidents]);
    setNewIncident({ title: '', description: '', severity: 'Medium' });
    setIsReporting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewIncident(prev => ({ ...prev, [name]: value }));
  };

  const toggleExpand = (id: number) => {
    setExpandedIncident(expandedIncident === id ? null : id);
  };

  return (
    <ThemeProvider>
      <div className="dashboard">
        <Sidebar 
          filter={filter}
          sortOrder={sortOrder}
          onFilterChange={setFilter}
          onSortChange={setSortOrder}
        />
        
        <MainContent
          incidents={sortedIncidents}
          expandedIncident={expandedIncident}
          isReporting={isReporting}
          newIncident={newIncident}
          filteredCount={filteredIncidents.length}
          totalCount={incidents.length}
          onToggleExpand={toggleExpand}
          onInputChange={handleInputChange}
          onSubmit={handleReportSubmit}
          onCancel={() => setIsReporting(false)}
          onStartReporting={() => setIsReporting(true)}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;