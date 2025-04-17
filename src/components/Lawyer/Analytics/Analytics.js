import React, { useState } from 'react';
import { 
    Dashboard,
    TrendingUp,
    People,
    Gavel,
    Assessment
} from '@mui/icons-material';
import AnalyticsDashboard from './AnalyticsDashboard';
import CaseMetrics from './CaseMetrics';
import ClientAnalysis from './ClientAnalysis';
import ProductivityMetrics from './ProductivityMetrics';
import PredictiveAnalysis from './PredictiveAnalysis';
import './Analytics.css';

const Analytics = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const tabs = [
        {
            id: 'dashboard',
            label: 'Dashboard Geral',
            icon: <Dashboard />,
            component: <AnalyticsDashboard />
        },
        {
            id: 'cases',
            label: 'Métricas de Casos',
            icon: <Gavel />,
            component: <CaseMetrics />
        },
        {
            id: 'clients',
            label: 'Análise de Clientes',
            icon: <People />,
            component: <ClientAnalysis />
        },
        {
            id: 'productivity',
            label: 'Produtividade',
            icon: <TrendingUp />,
            component: <ProductivityMetrics />
        },
        {
            id: 'predictive',
            label: 'Análise Preditiva',
            icon: <Assessment />,
            component: <PredictiveAnalysis />
        }
    ];

    return (
        <div className="analytics-container">
            <div className="analytics-tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.icon}
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            <div className="analytics-content">
                {tabs.find(tab => tab.id === activeTab)?.component}
            </div>
        </div>
    );
};

export default Analytics; 