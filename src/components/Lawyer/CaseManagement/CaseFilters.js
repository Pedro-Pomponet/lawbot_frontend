import React from 'react';
import { FilterList } from '@mui/icons-material';
import './CaseFilters.css';

const CaseFilters = ({ filters, availableFilters, onFilterChange }) => {
    const handleFilterChange = (filterType, value) => {
        onFilterChange({
            ...filters,
            [filterType]: value
        });
    };

    return (
        <div className="case-filters">
            <div className="filters-header">
                <FilterList />
                <h3>Filtros</h3>
            </div>

            <div className="filter-group">
                <label>Tipo de Processo</label>
                <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                >
                    {availableFilters.types.map(type => (
                        <option key={type.id} value={type.id}>
                            {type.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>Status</label>
                <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                    {availableFilters.status.map(status => (
                        <option key={status.id} value={status.id}>
                            {status.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>Prioridade</label>
                <select
                    value={filters.priority}
                    onChange={(e) => handleFilterChange('priority', e.target.value)}
                >
                    {availableFilters.priorities.map(priority => (
                        <option key={priority.id} value={priority.id}>
                            {priority.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default CaseFilters; 