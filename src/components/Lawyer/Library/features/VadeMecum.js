import React, { useState } from 'react';
import { 
    Search, 
    MenuBook, 
    Bookmark, 
    History,
    ExpandMore,
    ExpandLess,
    Star,
    StarBorder
} from '@mui/icons-material';
import './VadeMecum.css';

const VadeMecum = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedLaws, setExpandedLaws] = useState({});
    const [favorites, setFavorites] = useState([]);

    const legislacao = {
        constituicao: {
            titulo: 'Constituição Federal',
            ano: 1988,
            artigos: [
                {
                    numero: 1,
                    texto: 'A República Federativa do Brasil, formada pela união indissolúvel dos Estados e Municípios e do Distrito Federal, constitui-se em Estado Democrático de Direito e tem como fundamentos:'
                },
                {
                    numero: 2,
                    texto: 'São Poderes da União, independentes e harmônicos entre si, o Legislativo, o Executivo e o Judiciário.'
                }
            ]
        },
        codigoCivil: {
            titulo: 'Código Civil',
            ano: 2002,
            artigos: [
                {
                    numero: 1,
                    texto: 'Toda pessoa é capaz de direitos e deveres na ordem civil.'
                }
            ]
        },
        codigoProcessoCivil: {
            titulo: 'Código de Processo Civil',
            ano: 2015,
            artigos: [
                {
                    numero: 1,
                    texto: 'O processo civil será ordenado, disciplinado e interpretado conforme os valores e as normas fundamentais estabelecidos na Constituição da República Federativa do Brasil.'
                }
            ]
        }
    };

    const toggleLaw = (lawId) => {
        setExpandedLaws(prev => ({
            ...prev,
            [lawId]: !prev[lawId]
        }));
    };

    const toggleFavorite = (lawId) => {
        setFavorites(prev => 
            prev.includes(lawId) 
                ? prev.filter(id => id !== lawId)
                : [...prev, lawId]
        );
    };

    return (
        <div className="vademecum-container">
            <div className="vademecum-search">
                <Search />
                <input
                    type="text"
                    placeholder="Pesquisar na legislação..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="laws-grid">
                {Object.entries(legislacao).map(([id, lei]) => (
                    <div key={id} className="law-card">
                        <div className="law-header">
                            <div className="law-title">
                                <MenuBook />
                                <h3>{lei.titulo}</h3>
                                <span className="law-year">{lei.ano}</span>
                            </div>
                            <button 
                                className="favorite-button"
                                onClick={() => toggleFavorite(id)}
                            >
                                {favorites.includes(id) ? <Star /> : <StarBorder />}
                            </button>
                        </div>

                        <button 
                            className="expand-button"
                            onClick={() => toggleLaw(id)}
                        >
                            {expandedLaws[id] ? <ExpandLess /> : <ExpandMore />}
                            {expandedLaws[id] ? 'Recolher' : 'Expandir'}
                        </button>

                        {expandedLaws[id] && (
                            <div className="articles-list">
                                {lei.artigos.map(artigo => (
                                    <div key={artigo.numero} className="article-item">
                                        <h4>Art. {artigo.numero}</h4>
                                        <p>{artigo.texto}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VadeMecum; 