import React, { useState } from 'react';
import { 
    SmartToy, 
    Description, 
    AutoAwesome,
    Compare,
    ContentCopy,
    Save,
    History,
    Tune
} from '@mui/icons-material';
import './AIDocumentGenerator.css';

const AIDocumentGenerator = () => {
    const [prompt, setPrompt] = useState('');
    const [documentType, setDocumentType] = useState('petition');
    const [loading, setLoading] = useState(false);
    const [generatedContent, setGeneratedContent] = useState('');
    const [showSettings, setShowSettings] = useState(false);
    const [settings, setSettings] = useState({
        creativity: 0.7,
        formality: 0.8,
        length: 'medium',
        includeReferences: true,
        language: 'pt-BR'
    });

    // Tipos de documentos disponíveis
    const documentTypes = [
        { id: 'petition', name: 'Petição Inicial' },
        { id: 'contract', name: 'Contrato' },
        { id: 'appeal', name: 'Recurso' },
        { id: 'defense', name: 'Contestação' },
        { id: 'opinion', name: 'Parecer Jurídico' }
    ];

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/ai/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt,
                    documentType,
                    settings
                })
            });
            
            const data = await response.json();
            setGeneratedContent(data.content);
        } catch (error) {
            console.error('Erro na geração:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            await fetch('/api/documents/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: generatedContent,
                    type: documentType,
                    metadata: {
                        generatedBy: 'AI',
                        prompt,
                        settings
                    }
                })
            });
        } catch (error) {
            console.error('Erro ao salvar:', error);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedContent);
    };

    return (
        <div className="ai-generator-container">
            <div className="generator-header">
                <h2>
                    <SmartToy />
                    Gerador de Documentos IA
                </h2>
                <button 
                    className="settings-button"
                    onClick={() => setShowSettings(!showSettings)}
                >
                    <Tune />
                    Configurações
                </button>
            </div>

            {showSettings && (
                <div className="generator-settings">
                    <div className="settings-group">
                        <label>Criatividade</label>
                        <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.1"
                            value={settings.creativity}
                            onChange={(e) => setSettings({
                                ...settings,
                                creativity: parseFloat(e.target.value)
                            })}
                        />
                    </div>

                    <div className="settings-group">
                        <label>Formalidade</label>
                        <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.1"
                            value={settings.formality}
                            onChange={(e) => setSettings({
                                ...settings,
                                formality: parseFloat(e.target.value)
                            })}
                        />
                    </div>

                    <div className="settings-group">
                        <label>Extensão</label>
                        <select
                            value={settings.length}
                            onChange={(e) => setSettings({
                                ...settings,
                                length: e.target.value
                            })}
                        >
                            <option value="short">Curto</option>
                            <option value="medium">Médio</option>
                            <option value="long">Longo</option>
                        </select>
                    </div>

                    <div className="settings-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={settings.includeReferences}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    includeReferences: e.target.checked
                                })}
                            />
                            Incluir Referências
                        </label>
                    </div>
                </div>
            )}

            <div className="generator-content">
                <div className="input-section">
                    <select
                        value={documentType}
                        onChange={(e) => setDocumentType(e.target.value)}
                        className="document-type-select"
                    >
                        {documentTypes.map(type => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>

                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Descreva o documento que você deseja gerar..."
                        className="prompt-input"
                    />

                    <button 
                        onClick={handleGenerate}
                        disabled={loading || !prompt}
                        className="generate-button"
                    >
                        <AutoAwesome />
                        {loading ? 'Gerando...' : 'Gerar Documento'}
                    </button>
                </div>

                {generatedContent && (
                    <div className="output-section">
                        <div className="output-header">
                            <h3>Documento Gerado</h3>
                            <div className="output-actions">
                                <button onClick={handleCopy}>
                                    <ContentCopy />
                                    Copiar
                                </button>
                                <button onClick={handleSave}>
                                    <Save />
                                    Salvar
                                </button>
                            </div>
                        </div>
                        <div className="generated-content">
                            {generatedContent}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIDocumentGenerator; 