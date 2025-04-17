import React, { useState, useEffect } from 'react';
import { 
    FileCopy, 
    Add, 
    Edit,
    Delete,
    Folder,
    FolderOpen,
    Star,
    StarBorder,
    FilterList,
    Sort,
    Search,
    MoreVert,
    GetApp,
    Share,
    ContentCopy,
    Visibility,
    Category,
    Description
} from '@mui/icons-material';
import './TemplateSystem.css';

const mockTemplates = [
    {
        id: 1,
        name: 'Petição Inicial Trabalhista',
        description: 'Modelo completo de petição inicial para reclamação trabalhista',
        category: 'Trabalhista',
        lastModified: '2024-02-20',
        author: 'Dr. Silva',
        version: '2.1',
        tags: ['inicial', 'trabalhista', 'reclamação'],
        stats: {
            uses: 89,
            rating: 4.8,
            reviews: 15
        },
        variables: [
            { name: 'NOME_RECLAMANTE', type: 'text', required: true },
            { name: 'NOME_RECLAMADA', type: 'text', required: true },
            { name: 'VALOR_CAUSA', type: 'currency', required: true },
            { name: 'DATA_ADMISSAO', type: 'date', required: true },
            { name: 'DATA_DEMISSAO', type: 'date', required: true }
        ]
    },
    {
        id: 2,
        name: 'Contrato de Prestação de Serviços',
        description: 'Modelo padrão de contrato para prestação de serviços advocatícios',
        category: 'Contratos',
        lastModified: '2024-02-18',
        author: 'Dra. Santos',
        version: '1.3',
        tags: ['contrato', 'serviços', 'advocacia'],
        stats: {
            uses: 67,
            rating: 4.5,
            reviews: 12
        },
        variables: [
            { name: 'NOME_CONTRATANTE', type: 'text', required: true },
            { name: 'NOME_CONTRATADO', type: 'text', required: true },
            { name: 'VALOR_HONORARIOS', type: 'currency', required: true },
            { name: 'DATA_INICIO', type: 'date', required: true }
        ]
    },
    {
        id: 3,
        name: 'Recurso Ordinário',
        description: 'Modelo de recurso ordinário com fundamentação customizável',
        category: 'Recursos',
        lastModified: '2024-02-15',
        author: 'Dr. Oliveira',
        version: '1.8',
        tags: ['recurso', 'trabalhista', 'ordinário'],
        stats: {
            uses: 45,
            rating: 4.7,
            reviews: 9
        },
        variables: [
            { name: 'NUMERO_PROCESSO', type: 'text', required: true },
            { name: 'NOME_RECORRENTE', type: 'text', required: true },
            { name: 'NOME_RECORRIDO', type: 'text', required: true },
            { name: 'DATA_SENTENCA', type: 'date', required: true }
        ]
    }
];

const mockCategories = [
    { id: 'trabalhista', name: 'Trabalhista', count: 45 },
    { id: 'civil', name: 'Civil', count: 38 },
    { id: 'contratos', name: 'Contratos', count: 27 },
    { id: 'recursos', name: 'Recursos', count: 34 },
    { id: 'peticoes', name: 'Petições', count: 56 },
    { id: 'pareceres', name: 'Pareceres', count: 23 }
];

const mockTags = [
    'inicial', 'recurso', 'contrato', 'trabalhista', 'civil',
    'parecer', 'criminal', 'administrativo', 'tributário',
    'previdenciário', 'consumidor', 'família'
];

const TemplateSystem = ({ userId }) => {
    const [templates, setTemplates] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [sortBy, setSortBy] = useState('recent');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [showTemplateDetails, setShowTemplateDetails] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newTemplate, setNewTemplate] = useState({
        name: '',
        description: '',
        category: '',
        content: '',
        isPublic: false
    });
    
    useEffect(() => {
        loadTemplates();
        loadCategories();
    }, [userId, filterCategory, sortBy, searchTerm]);
    
    const loadTemplates = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/templates?userId=${userId}&category=${filterCategory}&sort=${sortBy}&search=${searchTerm}`);
            const data = await response.json();
            setTemplates(data.templates);
        } catch (error) {
            console.error('Erro ao carregar modelos:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const loadCategories = async () => {
        try {
            const response = await fetch('/api/templates/categories');
            const data = await response.json();
            setCategories(data.categories);
        } catch (error) {
            console.error('Erro ao carregar categorias:', error);
        }
    };
    
    const toggleFavorite = async (templateId, isFavorite) => {
        try {
            await fetch(`/api/templates/${templateId}/favorite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ isFavorite: !isFavorite })
            });
            
            // Atualizar estado local
            setTemplates(templates.map(template => 
                template.id === templateId ? { ...template, isFavorite: !isFavorite } : template
            ));
        } catch (error) {
            console.error('Erro ao atualizar favorito:', error);
        }
    };
    
    const deleteTemplate = async (templateId) => {
        if (!window.confirm('Tem certeza que deseja excluir este modelo?')) return;
        
        try {
            await fetch(`/api/templates/${templateId}`, {
                method: 'DELETE'
            });
            
            // Atualizar estado local
            setTemplates(templates.filter(template => template.id !== templateId));
            
            if (selectedTemplate?.id === templateId) {
                setSelectedTemplate(null);
                setShowTemplateDetails(false);
            }
        } catch (error) {
            console.error('Erro ao excluir modelo:', error);
        }
    };
    
    const viewTemplateDetails = (template) => {
        setSelectedTemplate(template);
        setShowTemplateDetails(true);
    };
    
    const createNewDocument = async (templateId) => {
        try {
            const response = await fetch('/api/documents/create-from-template', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ templateId, userId })
            });
            
            const data = await response.json();
            
            if (data.success) {
                window.location.href = `/document/${data.documentId}`;
            }
        } catch (error) {
            console.error('Erro ao criar documento a partir do modelo:', error);
        }
    };
    
    const handleCreateTemplate = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('/api/templates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...newTemplate,
                    userId
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                setTemplates([data.template, ...templates]);
                setShowCreateForm(false);
                setNewTemplate({
                    name: '',
                    description: '',
                    category: '',
                    content: '',
                    isPublic: false
                });
            }
        } catch (error) {
            console.error('Erro ao criar modelo:', error);
        }
    };
    
    const renderTemplateGrid = () => {
        if (loading) {
            return (
                <div className="loading-templates">
                    <p>Carregando modelos...</p>
                </div>
            );
        }
        
        if (templates.length === 0) {
            return (
                <div className="empty-templates">
                    <FileCopy />
                    <p>Nenhum modelo encontrado.</p>
                    <button 
                        className="create-first-template"
                        onClick={() => setShowCreateForm(true)}
                    >
                        <Add />
                        Criar Primeiro Modelo
                    </button>
                </div>
            );
        }
        
        return (
            <div className="templates-grid">
                {templates.map(template => (
                    <div key={template.id} className="template-card">
                        <div className="template-header">
                            <div className="template-icon">
                                <Description />
                            </div>
                            <button 
                                className="favorite-button"
                                onClick={() => toggleFavorite(template.id, template.isFavorite)}
                            >
                                {template.isFavorite ? <Star /> : <StarBorder />}
                            </button>
                        </div>
                        
                        <div className="template-content">
                            <h4 className="template-name">{template.name}</h4>
                            <p className="template-description">{template.description}</p>
                            
                            <div className="template-meta">
                                <span className="template-category">
                                    <Category />
                                    {template.category}
                                </span>
                                <span className="template-date">
                                    {new Date(template.createdAt).toLocaleDateString('pt-BR')}
                                </span>
                            </div>
                        </div>
                        
                        <div className="template-actions">
                            <button 
                                className="use-template"
                                onClick={() => createNewDocument(template.id)}
                            >
                                <ContentCopy />
                                Usar
                            </button>
                            
                            <div className="secondary-actions">
                                <button onClick={() => viewTemplateDetails(template)}>
                                    <Visibility />
                                </button>
                                <button onClick={() => window.location.href = `/templates/edit/${template.id}`}>
                                    <Edit />
                                </button>
                                <button onClick={() => deleteTemplate(template.id)}>
                                    <Delete />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    
    return (
        <div className="template-system-container">
            <div className="template-header">
                <h3>
                    <FileCopy />
                    Sistema de Modelos
                </h3>
                
                <div className="template-actions-header">
                    <button 
                        className="create-template-button"
                        onClick={() => setShowCreateForm(true)}
                    >
                        <Add />
                        Novo Modelo
                    </button>
                </div>
            </div>
            
            <div className="template-toolbar">
                <div className="search-templates">
                    <Search />
                    <input 
                        type="text"
                        placeholder="Buscar modelos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div className="filter-templates">
                    <button 
                        className="filter-toggle"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <FilterList />
                        Filtros
                    </button>
                    
                    {showFilters && (
                        <div className="filter-options">
                            <div className="filter-group">
                                <label>Categoria</label>
                                <select 
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                >
                                    <option value="all">Todas</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="filter-group">
                                <label>Ordenar por</label>
                                <select 
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="recent">Mais Recentes</option>
                                    <option value="name">Nome</option>
                                    <option value="popular">Mais Usados</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="template-content">
                {renderTemplateGrid()}
            </div>
            
            {showTemplateDetails && selectedTemplate && (
                <div className="template-details-overlay">
                    <div className="template-details-modal">
                        <div className="modal-header">
                            <h3>{selectedTemplate.name}</h3>
                            <button 
                                className="close-modal"
                                onClick={() => setShowTemplateDetails(false)}
                            >
                                &times;
                            </button>
                        </div>
                        
                        <div className="modal-content">
                            <div className="template-info">
                                <div className="info-group">
                                    <h4>Descrição</h4>
                                    <p>{selectedTemplate.description}</p>
                                </div>
                                
                                <div className="info-group">
                                    <h4>Categoria</h4>
                                    <p>{selectedTemplate.category}</p>
                                </div>
                                
                                <div className="info-group">
                                    <h4>Criado em</h4>
                                    <p>{new Date(selectedTemplate.createdAt).toLocaleDateString('pt-BR')}</p>
                                </div>
                                
                                <div className="info-group">
                                    <h4>Última atualização</h4>
                                    <p>{new Date(selectedTemplate.updatedAt).toLocaleDateString('pt-BR')}</p>
                                </div>
                                
                                <div className="info-group">
                                    <h4>Visibilidade</h4>
                                    <p>{selectedTemplate.isPublic ? 'Público' : 'Privado'}</p>
                                </div>
                                
                                <div className="info-group">
                                    <h4>Usado</h4>
                                    <p>{selectedTemplate.usageCount} vezes</p>
                                </div>
                            </div>
                            
                            <div className="template-preview">
                                <h4>Prévia do Conteúdo</h4>
                                <div className="preview-content">
                                    {selectedTemplate.content}
                                </div>
                            </div>
                        </div>
                        
                        <div className="modal-actions">
                            <button 
                                className="use-template-button"
                                onClick={() => createNewDocument(selectedTemplate.id)}
                            >
                                <ContentCopy />
                                Usar Modelo
                            </button>
                            
                            <button 
                                className="edit-template-button"
                                onClick={() => window.location.href = `/templates/edit/${selectedTemplate.id}`}
                            >
                                <Edit />
                                Editar
                            </button>
                            
                            <button 
                                className="download-template-button"
                            >
                                <GetApp />
                                Baixar
                            </button>
                            
                            <button 
                                className="share-template-button"
                            >
                                <Share />
                                Compartilhar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {showCreateForm && (
                <div className="template-form-overlay">
                    <div className="template-form-modal">
                        <div className="modal-header">
                            <h3>Criar Novo Modelo</h3>
                            <button 
                                className="close-modal"
                                onClick={() => setShowCreateForm(false)}
                            >
                                &times;
                            </button>
                        </div>
                        
                        <form onSubmit={handleCreateTemplate}>
                            <div className="form-group">
                                <label>Nome do Modelo</label>
                                <input 
                                    type="text"
                                    value={newTemplate.name}
                                    onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label>Descrição</label>
                                <textarea 
                                    value={newTemplate.description}
                                    onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label>Categoria</label>
                                <select 
                                    value={newTemplate.category}
                                    onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
                                    required
                                >
                                    <option value="">Selecione uma categoria</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label>Conteúdo do Modelo</label>
                                <textarea 
                                    className="template-content-editor"
                                    value={newTemplate.content}
                                    onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                                    required
                                />
                            </div>
                            
                            <div className="form-group checkbox-group">
                                <label>
                                    <input 
                                        type="checkbox"
                                        checked={newTemplate.isPublic}
                                        onChange={(e) => setNewTemplate({...newTemplate, isPublic: e.target.checked})}
                                    />
                                    Tornar este modelo público
                                </label>
                            </div>
                            
                            <div className="form-actions">
                                <button 
                                    type="button"
                                    className="cancel-button"
                                    onClick={() => setShowCreateForm(false)}
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit"
                                    className="save-button"
                                >
                                    Criar Modelo
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TemplateSystem; 