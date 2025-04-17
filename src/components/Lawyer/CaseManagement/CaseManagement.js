import React, { useState, useEffect } from 'react';
import { 
    Search,
    FilterList,
    Add,
    CloudDownload,
    Gavel,
    Timeline,
    Assessment,
    AutoGraph
} from '@mui/icons-material';
import CaseList from './CaseList';
import CaseFilters from './CaseFilters';
import CaseAnalytics from './CaseAnalytics';
import CaseTimeline from './CaseTimeline';
import { mockCases, mockFilters } from '../../../mocks/caseManagementData';
import './CaseManagement.css';

const CaseManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        type: 'all',
        status: 'all',
        priority: 'all'
    });
    
    const [activeTab, setActiveTab] = useState('list');
    const [selectedCase, setSelectedCase] = useState(null);
    const [filteredCases, setFilteredCases] = useState(mockCases);

    useEffect(() => {
        const filtered = mockCases.filter(caseItem => {
            const matchesSearch = 
                caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                caseItem.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                caseItem.id.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesType = filters.type === 'all' || caseItem.type.toLowerCase() === filters.type;
            const matchesStatus = filters.status === 'all' || caseItem.status.toLowerCase() === filters.status;
            const matchesPriority = filters.priority === 'all' || caseItem.priority === filters.priority;

            return matchesSearch && matchesType && matchesStatus && matchesPriority;
        });

        setFilteredCases(filtered);
    }, [searchTerm, filters]);

    return (
        <div className="case-management">
            <div className="case-management-header">
                <h1>Gestão de Casos</h1>
                <div className="header-actions">
                    <div className="search-bar">
                        <Search />
                        <input
                            type="text"
                            placeholder="Pesquisar casos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="new-case-btn">
                        <Add /> Novo Caso
                    </button>
                    <button className="export-btn">
                        <CloudDownload /> Exportar
                    </button>
                </div>
            </div>

            <div className="case-management-content">
                <aside className="filters-sidebar">
                    <CaseFilters 
                        filters={filters} 
                        availableFilters={mockFilters}
                        onFilterChange={setFilters} 
                    />
                </aside>

                <main className="main-content">
                    <CaseList 
                        cases={filteredCases}
                        onCaseSelect={setSelectedCase}
                    />
                </main>
            </div>
        </div>
    );
};

export default CaseManagement; 