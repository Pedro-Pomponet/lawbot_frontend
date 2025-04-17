import React, { useState, useEffect, useRef } from 'react';
import { 
    FormatQuote, 
    Link, 
    Check, 
    Error,
    Search,
    BookmarkBorder,
    ContentCopy,
    Add,
    Edit,
    Delete,
    MenuBook,
    FormatListNumbered
} from '@mui/icons-material';
import './CitationSystem.css';

const CitationSystem = ({ documentId }) => {
    const [citations, setCitations] = useState([]);
    const [documentText, setDocumentText] = useState('');
    const [selectedText, setSelectedText] = useState('');
    const [citationSource, setCitationSource] = useState('');
    const [citationPage, setCitationPage] = useState('');
    const [citationYear, setCitationYear] = useState('');
    const [citationAuthor, setCitationAuthor] = useState('');
    const [citationTitle, setCitationTitle] = useState('');
    const [citationFormat, setCitationFormat] = useState('ABNT');
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingCitation, setEditingCitation] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    
    const editorRef = useRef(null);
    
    const citationFormats = [
        { id: 'ABNT', name: 'ABNT (Brasil)' },
        { id: 'APA', name: 'APA (EUA)' },
        { id: 'VANCOUVER', name: 'Vancouver' },
        { id: 'HARVARD', name: 'Harvard' }
    ];
    
    useEffect(() => {
        if (documentId) {
            loadDocument();
            loadCitations();
        }
    }, [documentId]);
    
    const loadDocument = async () => {
        try {
            const response = await fetch(`/api/documents/${documentId}`);
            const data = await response.json();
            setDocumentText(data.content);
        } catch (error) {
            console.error('Erro ao carregar documento:', error);
        }
    };
    
    const loadCitations = async () => {
        try {
            const response = await fetch(`/api/documents/${documentId}/citations`);
            const data = await response.json();
            setCitations(data.citations);
        } catch (error) {
            console.error('Erro ao carregar citações:', error);
        }
    };
    
    const handleTextSelection = () => {
        if (editorRef.current) {
            const selection = window.getSelection();
            if (selection.toString().trim()) {
                setSelectedText(selection.toString());
            }
        }
    };
    
    const searchSources = async () => {
        if (!searchTerm.trim()) return;
        
        setLoading(true);
        try {
            const response = await fetch(`/api/citations/search?q=${encodeURIComponent(searchTerm)}`);
            const data = await response.json();
            setSearchResults(data.results);
        } catch (error) {
            console.error('Erro na busca de fontes:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const selectSource = (source) => {
        setCitationSource(source.source);
        setCitationAuthor(source.author);
        setCitationTitle(source.title);
        setCitationYear(source.year);
        setSearchResults([]);
        setSearchTerm('');
    };
    
    const validateCitation = () => {
        const errors = {};
        
        if (!selectedText.trim()) {
            errors.selectedText = 'Selecione um texto para citar';
        }
        
        if (!citationSource.trim()) {
            errors.citationSource = 'A fonte é obrigatória';
        }
        
        if (!citationAuthor.trim()) {
            errors.citationAuthor = 'O autor é obrigatório';
        }
        
        if (!citationYear.trim()) {
            errors.citationYear = 'O ano é obrigatório';
        }
        
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
    const addCitation = async () => {
        if (!validateCitation()) return;
        
        try {
            const response = await fetch(`/api/documents/${documentId}/citations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: selectedText,
                    source: citationSource,
                    author: citationAuthor,
                    title: citationTitle,
                    year: citationYear,
                    page: citationPage,
                    format: citationFormat
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                setCitations([...citations, data.citation]);
                resetForm();
            }
        } catch (error) {
            console.error('Erro ao adicionar citação:', error);
        }
    };
    
    const updateCitation = async () => {
        if (!validateCitation() || !editingCitation) return;
        
        try {
            const response = await fetch(`/api/documents/${documentId}/citations/${editingCitation.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: selectedText,
                    source: citationSource,
                    author: citationAuthor,
                    title: citationTitle,
                    year: citationYear,
                    page: citationPage,
                    format: citationFormat
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                setCitations(citations.map(c => 
                    c.id === editingCitation.id ? data.citation : c
                ));
                resetForm();
            }
        } catch (error) {
            console.error('Erro ao atualizar citação:', error);
        }
    };
    
    const deleteCitation = async (citationId) => {
        try {
            const response = await fetch(`/api/documents/${documentId}/citations/${citationId}`, {
                method: 'DELETE'
            });
            
            const data = await response.json();
            
            if (data.success) {
                setCitations(citations.filter(c => c.id !== citationId));
            }
        } catch (error) {
            console.error('Erro ao excluir citação:', error);
        }
    };
    
    const editCitation = (citation) => {
        setSelectedText(citation.text);
        setCitationSource(citation.source);
        setCitationAuthor(citation.author);
        setCitationTitle(citation.title);
        setCitationYear(citation.year);
        setCitationPage(citation.page);
        setCitationFormat(citation.format);
        setEditingCitation(citation);
        setShowAddForm(true);
    };
    
    const resetForm = () => {
        setSelectedText('');
        setCitationSource('');
        setCitationAuthor('');
        setCitationTitle('');
        setCitationYear('');
        setCitationPage('');
        setEditingCitation(null);
        setShowAddForm(false);
        setValidationErrors({});
    };
    
    const generateFormattedCitation = (citation) => {
        switch (citation.format) {
            case 'ABNT':
                return `${citation.author.toUpperCase()}. ${citation.title}. ${citation.source}, ${citation.year}${citation.page ? `, p. ${citation.page}` : ''}.`;
            case 'APA':
                return `${citation.author} (${citation.year}). ${citation.title}. ${citation.source}${citation.page ? `, p. ${citation.page}` : ''}.`;
            case 'VANCOUVER':
                return `${citation.author}. ${citation.title}. ${citation.source}. ${citation.year}${citation.page ? `;${citation.page}` : ''}.`;
            case 'HARVARD':
                return `${citation.author}, ${citation.year}. ${citation.title}. ${citation.source}${citation.page ? `, p. ${citation.page}` : ''}.`;
            default:
                return `${citation.author}. ${citation.title}. ${citation.source}, ${citation.year}.`;
        }
    };
    
    const copyCitation = (citation) => {
        const formattedCitation = generateFormattedCitation(citation);
        navigator.clipboard.writeText(formattedCitation);
    };
    
    const generateReferencesList = () => {
        const sortedCitations = [...citations].sort((a, b) => 
            a.author.localeCompare(b.author)
        );
        
        return sortedCitations.map(citation => 
            generateFormattedCitation(citation)
        );
    };
    
    const exportReferences = () => {
        const references = generateReferencesList();
        const referencesText = references.join('\n\n');
        
        const blob = new Blob([referencesText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'referencias.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="citation-system-container">
            <div className="citation-header">
                <h3>
                    <FormatQuote />
                    Sistema de Citações
                </h3>
                <div className="citation-actions">
                    <button 
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="add-citation-button"
                    >
                        {showAddForm ? 'Cancelar' : 'Nova Citação'}
                    </button>
                    <button 
                        onClick={exportReferences}
                        className="export-references-button"
                    >
                        <FormatListNumbered />
                        Exportar Referências
                    </button>
                </div>
            </div>

            <div className="citation-content">
                {showAddForm && (
                    <div className="citation-form">
                        <h4>{editingCitation ? 'Editar Citação' : 'Adicionar Nova Citação'}</h4>
                        
                        <div className="form-group">
                            <label>Texto Selecionado</label>
                            <textarea
                                value={selectedText}
                                onChange={(e) => setSelectedText(e.target.value)}
                                placeholder="Selecione um texto no documento ou digite aqui..."
                                className={validationErrors.selectedText ? 'error' : ''}
                            />
                            {validationErrors.selectedText && (
                                <span className="error-message">{validationErrors.selectedText}</span>
                            )}
                        </div>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label>Autor</label>
                                <input
                                    type="text"
                                    value={citationAuthor}
                                    onChange={(e) => setCitationAuthor(e.target.value)}
                                    placeholder="Nome do autor"
                                    className={validationErrors.citationAuthor ? 'error' : ''}
                                />
                                {validationErrors.citationAuthor && (
                                    <span className="error-message">{validationErrors.citationAuthor}</span>
                                )}
                            </div>
                            
                            <div className="form-group">
                                <label>Ano</label>
                                <input
                                    type="text"
                                    value={citationYear}
                                    onChange={(e) => setCitationYear(e.target.value)}
                                    placeholder="Ano de publicação"
                                    className={validationErrors.citationYear ? 'error' : ''}
                                />
                                {validationErrors.citationYear && (
                                    <span className="error-message">{validationErrors.citationYear}</span>
                                )}
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label>Título</label>
                            <input
                                type="text"
                                value={citationTitle}
                                onChange={(e) => setCitationTitle(e.target.value)}
                                placeholder="Título da obra"
                            />
                        </div>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label>Fonte</label>
                                <input
                                    type="text"
                                    value={citationSource}
                                    onChange={(e) => setCitationSource(e.target.value)}
                                    placeholder="Fonte (livro, revista, etc.)"
                                    className={validationErrors.citationSource ? 'error' : ''}
                                />
                                {validationErrors.citationSource && (
                                    <span className="error-message">{validationErrors.citationSource}</span>
                                )}
                            </div>
                            
                            <div className="form-group">
                                <label>Página</label>
                                <input
                                    type="text"
                                    value={citationPage}
                                    onChange={(e) => setCitationPage(e.target.value)}
                                    placeholder="Número da página (opcional)"
                                />
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label>Formato de Citação</label>
                            <select
                                value={citationFormat}
                                onChange={(e) => setCitationFormat(e.target.value)}
                            >
                                {citationFormats.map(format => (
                                    <option key={format.id} value={format.id}>
                                        {format.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="source-search">
                            <h5>Buscar Fonte</h5>
                            <div className="search-input-container">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Buscar por título, autor ou fonte..."
                                    className="search-input"
                                />
                                <button 
                                    onClick={searchSources}
                                    disabled={loading || !searchTerm.trim()}
                                    className="search-button"
                                >
                                    <Search />
                                </button>
                            </div>
                            
                            {searchResults.length > 0 && (
                                <div className="search-results">
                                    {searchResults.map(result => (
                                        <div 
                                            key={result.id} 
                                            className="search-result-item"
                                            onClick={() => selectSource(result)}
                                        >
                                            <div className="result-info">
                                                <h6>{result.title}</h6>
                                                <p>{result.author}, {result.year}</p>
                                                <p className="result-source">{result.source}</p>
                                            </div>
                                            <button className="select-source-button">
                                                <Add />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        <div className="form-actions">
                            <button 
                                onClick={resetForm}
                                className="cancel-button"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={editingCitation ? updateCitation : addCitation}
                                className="save-button"
                            >
                                {editingCitation ? 'Atualizar Citação' : 'Adicionar Citação'}
                            </button>
                        </div>
                    </div>
                )}
                
                <div className="citations-list">
                    <h4>Citações no Documento</h4>
                    
                    {citations.length === 0 ? (
                        <div className="empty-citations">
                            <MenuBook />
                            <p>Nenhuma citação adicionada ainda.</p>
                            <button 
                                onClick={() => setShowAddForm(true)}
                                className="add-first-citation"
                            >
                                <Add />
                                Adicionar Primeira Citação
                            </button>
                        </div>
                    ) : (
                        <div className="citations-grid">
                            {citations.map(citation => (
                                <div key={citation.id} className="citation-item">
                                    <div className="citation-text">
                                        <FormatQuote className="quote-icon" />
                                        <p>{citation.text}</p>
                                    </div>
                                    <div className="citation-details">
                                        <p className="citation-formatted">
                                            {generateFormattedCitation(citation)}
                                        </p>
                                        <div className="citation-item-actions">
                                            <button onClick={() => editCitation(citation)}>
                                                <Edit />
                                            </button>
                                            <button onClick={() => copyCitation(citation)}>
                                                <ContentCopy />
                                            </button>
                                            <button onClick={() => deleteCitation(citation.id)}>
                                                <Delete />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                {citations.length > 0 && (
                    <div className="references-section">
                        <h4>Lista de Referências</h4>
                        <div className="references-list">
                            {generateReferencesList().map((reference, index) => (
                                <div key={index} className="reference-item">
                                    <span className="reference-number">{index + 1}.</span>
                                    <p>{reference}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CitationSystem; 