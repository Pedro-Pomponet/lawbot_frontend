import React, { useState } from 'react';
import { api } from '../../../utils/api';

const DocumentTemplates = ({ onFavorite, favorites }) => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(false);

    const categories = [
        { id: 'all', name: 'Todos' },
        { id: 'petitions', name: 'Petições' },
        { id: 'contracts', name: 'Contratos' },
        { id: 'appeals', name: 'Recursos' },
        { id: 'defenses', name: 'Defesas' }
    ];

    const loadTemplates = async (category) => {
        setLoading(true);
        try {
            const data = await api.getDocumentTemplates(category);
            setTemplates(data);
        } catch (error) {
            console.error('Erro ao carregar modelos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUseTemplate = async (templateId) => {
        try {
            const template = await api.getTemplateContent(templateId);
            // Abrir editor com o template
        } catch (error) {
            console.error('Erro ao carregar template:', error);
        }
    };

    return (
        <div className="document-templates">
            <div className="templates-header">
                <h2>Modelos de Documentos</h2>
                <button className="new-template-btn">
                    Criar Novo Modelo
                </button>
            </div>

            <div className="categories-nav">
                {categories.map(category => (
                    <button
                        key={category.id}
                        className={selectedCategory === category.id ? 'active' : ''}
                        onClick={() => {
                            setSelectedCategory(category.id);
                            loadTemplates(category.id);
                        }}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            <div className="templates-grid">
                {templates.map(template => (
                    <div key={template.id} className="template-card">
                        <div className="template-header">
                            <h3>{template.title}</h3>
                            <button 
                                onClick={() => onFavorite(template.id, 'template')}
                                className={`favorite-btn ${
                                    favorites.some(f => f.id === template.id) ? 'active' : ''
                                }`}
                            >
                                ★
                            </button>
                        </div>
                        
                        <p className="template-description">
                            {template.description}
                        </p>
                        
                        <div className="template-meta">
                            <span>Última atualização: {template.lastUpdated}</span>
                            <span>Usado: {template.usageCount} vezes</span>
                        </div>
                        
                        <div className="template-actions">
                            <button 
                                onClick={() => handleUseTemplate(template.id)}
                                className="use-template-btn"
                            >
                                Usar Modelo
                            </button>
                            <button className="preview-btn">
                                Visualizar
                            </button>
                            <button className="edit-btn">
                                Editar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DocumentTemplates; 