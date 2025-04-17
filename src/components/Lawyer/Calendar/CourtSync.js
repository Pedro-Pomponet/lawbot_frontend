import React, { useState } from 'react';
import { api } from '../../../utils/api';
import { formatters } from '../../../utils/helpers';

const CourtSync = ({ onSync }) => {
    const [syncing, setSyncing] = useState(false);
    const [lastSync, setLastSync] = useState(null);
    const [courts, setCourts] = useState([]);
    const [selectedCourts, setSelectedCourts] = useState([]);

    const handleSync = async () => {
        setSyncing(true);
        try {
            const result = await api.syncWithCourts(selectedCourts);
            setLastSync(new Date());
            onSync();
        } catch (error) {
            console.error('Erro na sincronização:', error);
        } finally {
            setSyncing(false);
        }
    };

    const handleCourtSelect = (courtId) => {
        setSelectedCourts(prev => 
            prev.includes(courtId)
                ? prev.filter(id => id !== courtId)
                : [...prev, courtId]
        );
    };

    return (
        <div className="court-sync">
            <header className="sync-header">
                <h2>Sincronização com Tribunais</h2>
                <button 
                    onClick={handleSync}
                    disabled={syncing || selectedCourts.length === 0}
                    className="sync-btn"
                >
                    {syncing ? 'Sincronizando...' : 'Sincronizar'}
                </button>
            </header>

            {lastSync && (
                <p className="last-sync">
                    Última sincronização: {formatters.formatDateTime(lastSync)}
                </p>
            )}

            <div className="courts-list">
                {courts.map(court => (
                    <div key={court.id} className="court-item">
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedCourts.includes(court.id)}
                                onChange={() => handleCourtSelect(court.id)}
                            />
                            {court.name}
                        </label>
                        <span className="court-status">
                            {court.status === 'online' ? '🟢' : '🔴'}
                        </span>
                    </div>
                ))}
            </div>

            <div className="sync-status">
                {syncing && (
                    <div className="sync-progress">
                        <div className="progress-bar">
                            <div className="progress-fill"></div>
                        </div>
                        <p>Sincronizando dados dos tribunais...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourtSync; 