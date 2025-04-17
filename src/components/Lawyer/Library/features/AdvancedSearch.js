import React, { useState } from 'react';
import { 
    Search, 
    FilterList, 
    Clear, 
    ArrowDropDown, 
    ArrowDropUp 
} from '@mui/icons-material';
import './AdvancedSearch.css';

const AdvancedSearch = ({ onSearch }) => {
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [searchParams, setSearchParams] = useState({
        term: '',
        category: 'all',
        dateFrom: '',
        dateTo: '',
        author: '',
        tags: []
    });
    const [currentTag, setCurrentTag] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchParams);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams({
            ...searchParams,
            [name]: value
        });
    };

    const handleAddTag = () => {
        if (currentTag.trim() && !searchParams.tags.includes(currentTag.trim())) {
            setSearchParams({
                ...searchParams,
                tags: [...searchParams.tags, currentTag.trim()]
            });
            setCurrentTag('');
        }
    };

    const handleRemoveTag = (tag) => {
        setSearchParams({
            ...searchParams,
            tags: searchParams.tags.filter(t => t !== tag)
        });
    };

    const handleClear = () => {
        setSearchParams({
            term: '',
            category: 'all',
            dateFrom: '',
            dateTo: '',
            author: '',
            tags: []
        });
    };

    return (
        <div className="advanced-search-container">
            <div className="search-bar-container">
                <div className="search-bar">
                    <Search className="search-icon" />
                    <input
                        type="text"
                        name="term"
                        placeholder="Pesquisar na biblioteca jurídica..."
                        value={searchParams.term}
                        onChange={handleInputChange}
                    />
                    <button 
                        className="advanced-toggle"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                    >
                        <FilterList />
                        {showAdvanced ? <ArrowDropUp /> : <ArrowDropDown />}
                    </button>
                </div>
                <button 
                    className="search-button"
                    onClick={handleSearch}
                >
                    Pesquisar
                </button>
            </div>

            {showAdvanced && (
                <div className="advanced-options">
                    <div className="advanced-row">
                        <div className="form-group">
                            <label>Categoria</label>
                            <select 
                                name="category"
                                value={searchParams.category}
                                onChange={handleInputChange}
                            >
                                <option value="all">Todas as categorias</option>
                                <option value="legislation">Legislação</option>
                                <option value="jurisprudence">Jurisprudência</option>
                                <option value="doctrine">Doutrina</option>
                                <option value="templates">Modelos</option>
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label>Autor</label>
                            <input
                                type="text"
                                name="author"
                                placeholder="Nome do autor"
                                value={searchParams.author}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="advanced-row">
                        <div className="form-group">
                            <label>Data de</label>
                            <input
                                type="date"
                                name="dateFrom"
                                value={searchParams.dateFrom}
                                onChange={handleInputChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Data até</label>
                            <input
                                type="date"
                                name="dateTo"
                                value={searchParams.dateTo}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="tags-section">
                        <label>Tags</label>
                        <div className="tags-input">
                            <input
                                type="text"
                                placeholder="Adicionar tag"
                                value={currentTag}
                                onChange={(e) => setCurrentTag(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                            />
                            <button onClick={handleAddTag}>Adicionar</button>
                        </div>
                        
                        <div className="tags-list">
                            {searchParams.tags.map(tag => (
                                <div key={tag} className="tag">
                                    {tag}
                                    <button onClick={() => handleRemoveTag(tag)}>×</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="advanced-actions">
                        <button 
                            className="clear-button"
                            onClick={handleClear}
                        >
                            <Clear /> Limpar Filtros
                        </button>
                        <button 
                            className="apply-button"
                            onClick={handleSearch}
                        >
                            <Search /> Aplicar Filtros
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdvancedSearch; 