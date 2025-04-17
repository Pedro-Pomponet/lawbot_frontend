import React, { useState } from 'react';
import { api } from '../../../utils/api';

const ProfessionalDirectory = ({ professionals, onConnect }) => {
    const [filters, setFilters] = useState({
        specialty: 'all',
        location: '',
        experience: 'all'
    });
    const [searchTerm, setSearchTerm] = useState('');

    const handleConnect = async (professionalId) => {
        try {
            await api.sendConnectionRequest(professionalId);
            onConnect();
        } catch (error) {
            console.error('Erro ao enviar solicitação:', error);
        }
    };

    const filteredProfessionals = professionals.filter(prof => {
        if (filters.specialty !== 'all' && prof.specialty !== filters.specialty) return false;
        if (filters.location && !prof.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
        if (filters.experience !== 'all') {
            const years = parseInt(prof.yearsOfExperience);
            if (filters.experience === 'junior' && years >= 5) return false;
            if (filters.experience === 'senior' && years < 5) return false;
        }
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            return prof.name.toLowerCase().includes(searchLower) ||
                   prof.specialty.toLowerCase().includes(searchLower) ||
                   prof.location.toLowerCase().includes(searchLower);
        }
        return true;
    });

    return (
        <div className="professional-directory">
            <header className="section-header">
                <h2>Diretório de Profissionais</h2>
                <div className="search-filters">
                    <input
                        type="text"
                        placeholder="Buscar profissionais..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <select
                        value={filters.specialty}
                        onChange={e => setFilters({...filters, specialty: e.target.value})}
                    >
                        <option value="all">Todas as Especialidades</option>
                        <option value="civil">Direito Civil</option>
                        <option value="criminal">Direito Criminal</option>
                        <option value="labor">Direito Trabalhista</option>
                        <option value="tax">Direito Tributário</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Localização"
                        value={filters.location}
                        onChange={e => setFilters({...filters, location: e.target.value})}
                    />
                    <select
                        value={filters.experience}
                        onChange={e => setFilters({...filters, experience: e.target.value})}
                    >
                        <option value="all">Qualquer Experiência</option>
                        <option value="junior">Júnior (0-5 anos)</option>
                        <option value="senior">Sênior (5+ anos)</option>
                    </select>
                </div>
            </header>

            <div className="professionals-grid">
                {filteredProfessionals.map(prof => (
                    <div key={prof.id} className="professional-card">
                        <div className="professional-header">
                            <img src={prof.avatar} alt="" className="professional-avatar" />
                            <div className="professional-info">
                                <h3>{prof.name}</h3>
                                <span className="specialty">{prof.specialty}</span>
                            </div>
                        </div>

                        <div className="professional-details">
                            <p><strong>Localização:</strong> {prof.location}</p>
                            <p><strong>Experiência:</strong> {prof.yearsOfExperience} anos</p>
                            <p><strong>OAB:</strong> {prof.oabNumber}</p>
                        </div>

                        <div className="professional-stats">
                            <span>{prof.connections} conexões</span>
                            <span>{prof.cases} casos</span>
                            <span>{prof.rating}⭐</span>
                        </div>

                        <div className="professional-actions">
                            <button 
                                onClick={() => handleConnect(prof.id)}
                                disabled={prof.isConnected}
                            >
                                {prof.isConnected ? 'Conectado' : 'Conectar'}
                            </button>
                            <button className="view-profile">Ver Perfil</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfessionalDirectory; 