import React from 'react';
import { Link } from 'react-router-dom';
import { 
    MenuBook, 
    Psychology, 
    Search, 
    Star 
} from '@mui/icons-material';
import './LegalLibraryCard.css';

const LegalLibraryCard = ({ data }) => {
    const mockLibraryData = {
        recentLaws: [
            {
                id: 1,
                title: "Lei 14.946/2024",
                description: "Trabalho análogo à escravidão",
                date: "2024-03-15"
            },
            {
                id: 2,
                title: "Lei 14.944/2024",
                description: "Proteção de dados pessoais",
                date: "2024-03-10"
            }
        ],
        favorites: [
            {
                id: 1,
                title: "Constituição Federal",
                articles: "250 artigos"
            },
            {
                id: 2,
                title: "Código Civil",
                articles: "2046 artigos"
            }
        ],
        aiInteractions: 15,
        searchCount: 45
    };

    return (
        <div className="legal-library-card dashboard-card">
            <div className="card-header">
                <h3>Biblioteca Jurídica</h3>
                <Link to="/advogado/biblioteca" className="view-all">Ver tudo</Link>
            </div>

            <div className="library-stats">
                <div className="stat-item">
                    <MenuBook />
                    <div className="stat-info">
                        <span className="stat-value">2</span>
                        <span className="stat-label">Leis Recentes</span>
                    </div>
                </div>

                <div className="stat-item">
                    <Psychology />
                    <div className="stat-info">
                        <span className="stat-value">{mockLibraryData.aiInteractions}</span>
                        <span className="stat-label">Consultas IA</span>
                    </div>
                </div>

                <div className="stat-item">
                    <Star />
                    <div className="stat-info">
                        <span className="stat-value">{mockLibraryData.favorites.length}</span>
                        <span className="stat-label">Favoritos</span>
                    </div>
                </div>

                <div className="stat-item">
                    <Search />
                    <div className="stat-info">
                        <span className="stat-value">{mockLibraryData.searchCount}</span>
                        <span className="stat-label">Pesquisas</span>
                    </div>
                </div>
            </div>

            <div className="recent-laws">
                <h4>Legislação Recente</h4>
                {mockLibraryData.recentLaws.map(law => (
                    <div key={law.id} className="law-item">
                        <div className="law-icon">
                            <MenuBook />
                        </div>
                        <div className="law-info">
                            <p><strong>{law.title}</strong></p>
                            <span className="law-meta">{law.description}</span>
                            <span className="law-date">{law.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LegalLibraryCard; 