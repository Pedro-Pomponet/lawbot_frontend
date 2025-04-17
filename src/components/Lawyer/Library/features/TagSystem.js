import React, { useState, useEffect } from 'react';
import { 
    Label,
    Add,
    Close,
    LocalOffer,
    Category,
    AutoAwesome,
    FilterList
} from '@mui/icons-material';
import './TagSystem.css';

const TagSystem = ({ documentId }) => {
    const [tags, setTags] = useState([]);
    const [suggestedTags, setSuggestedTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (documentId) {
            loadTags();
            loadSuggestedTags();
            loadCategories();
        }
    }, [documentId]);

    const loadTags = async () => {
        try {
            const response = await fetch(`/api/documents/${documentId}/tags`);
            const data = await response.json();
            setTags(data.tags);
        } catch (error) {
            console.error('Erro ao carregar tags:', error);
        }
    };

    const loadSuggestedTags = async () => {
        try {
            const response = await fetch(`/api/documents/${documentId}/tags/suggest`);
            const data = await response.json();
            setSuggestedTags(data.suggestions);
        } catch (error) {
            console.error('Erro ao carregar sugestões:', error);
        }
    };

    const loadCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            const data = await response.json();
            setCategories(data.categories);
        } catch (error) {
            console.error('Erro ao carregar categorias:', error);
        }
    };

    const addTag = async (tagName, category = selectedCategory) => {
        if (!tagName.trim()) return;

        try {
            const response = await fetch(`/api/documents/${documentId}/tags`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name: tagName,
                    category 
                })
            });
            const data = await response.json();
            setTags([...tags, data.tag]);
            setNewTag('');
        } catch (error) {
            console.error('Erro ao adicionar tag:', error);
        }
    };

    const removeTag = async (tagId) => {
        try {
            await fetch(`/api/documents/${documentId}/tags/${tagId}`, {
                method: 'DELETE'
            });
            setTags(tags.filter(tag => tag.id !== tagId));
        } catch (error) {
            console.error('Erro ao remover tag:', error);
        }
    };

    const handleAutoTag = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/documents/${documentId}/tags/auto`, {
                method: 'POST'
            });
            const data = await response.json();
            setTags(data.tags);
        } catch (error) {
            console.error('Erro na categorização automática:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tag-system-container">
            <div className="tag-header">
                <h3>
                    <LocalOffer />
                    Tags e Categorias
                </h3>
                <button 
                    className="auto-tag-button"
                    onClick={handleAutoTag}
                    disabled={loading}
                >
                    <AutoAwesome />
                    {loading ? 'Categorizando...' : 'Categorização Automática'}
                </button>
            </div>

            <div className="tag-content">
                <div className="tag-input-section">
                    <div className="category-select">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">Selecione uma categoria</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="tag-input">
                        <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            placeholder="Adicionar nova tag..."
                        />
                        <button 
                            onClick={() => addTag(newTag)}
                            disabled={!newTag.trim() || !selectedCategory}
                        >
                            <Add />
                        </button>
                    </div>
                </div>

                <div className="current-tags">
                    <h4>Tags Atuais</h4>
                    <div className="tags-grid">
                        {tags.map(tag => (
                            <div key={tag.id} className="tag-item">
                                <span className="tag-category">{tag.category}</span>
                                <span className="tag-name">{tag.name}</span>
                                <button 
                                    onClick={() => removeTag(tag.id)}
                                    className="remove-tag"
                                >
                                    <Close />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {suggestedTags.length > 0 && (
                    <div className="suggested-tags">
                        <h4>Sugestões</h4>
                        <div className="tags-grid">
                            {suggestedTags.map(tag => (
                                <div 
                                    key={tag.id} 
                                    className="tag-suggestion"
                                    onClick={() => addTag(tag.name, tag.category)}
                                >
                                    <span className="tag-category">{tag.category}</span>
                                    <span className="tag-name">{tag.name}</span>
                                    <span className="confidence">
                                        {Math.round(tag.confidence * 100)}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TagSystem; 