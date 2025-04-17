import React, { useState, useRef } from 'react';
import { api } from '../../../utils/api';
import { documentProcessors } from '../../../utils/helpers';
import SignatureCanvas from 'react-signature-canvas';
import { 
    Description, 
    Edit, 
    Save, 
    Delete, 
    CloudDownload, 
    Share, 
    Create, 
    Upload 
} from '@mui/icons-material';

const DocumentAutomation = () => {
    const [template, setTemplate] = useState(null);
    const [variables, setVariables] = useState({});
    const [generatedDoc, setGeneratedDoc] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showESignModal, setShowESignModal] = useState(false);
    const [signatureType, setSignatureType] = useState('draw');
    const [typedSignature, setTypedSignature] = useState('');
    const [signatureImage, setSignatureImage] = useState(null);
    const sigCanvas = useRef({});

    const handleTemplateSelect = async (templateId) => {
        try {
            const templateData = await api.getDocumentTemplate(templateId);
            setTemplate(templateData);
            // Extrair variáveis do template
            const extractedVars = documentProcessors.extractTemplateVariables(templateData.content);
            setVariables(extractedVars.reduce((acc, v) => ({...acc, [v]: ''}), {}));
        } catch (error) {
            console.error('Erro ao carregar template:', error);
        }
    };

    const handleGenerate = async () => {
        try {
            setLoading(true);
            const document = await api.generateDocument({
                templateId: template.id,
                variables
            });
            setGeneratedDoc(document);
        } catch (error) {
            console.error('Erro na geração:', error);
        } finally {
            setLoading(false);
        }
    };

    const clearSignature = () => {
        if (signatureType === 'draw') {
            sigCanvas.current.clear();
        } else if (signatureType === 'type') {
            setTypedSignature('');
        } else {
            setSignatureImage(null);
        }
    };
    
    const handleSignDocument = () => {
        let signatureData;
        
        if (signatureType === 'draw') {
            signatureData = sigCanvas.current.toDataURL();
        } else if (signatureType === 'type') {
            signatureData = typedSignature;
        } else {
            signatureData = signatureImage;
        }
        
        // Aqui você adicionaria a lógica para salvar a assinatura no documento
        setGeneratedDoc({
            ...generatedDoc,
            signed: true,
            signatureData
        });
        
        setShowESignModal(false);
    };
    
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setSignatureImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="document-automation">
            <header className="automation-header">
                <h2>Automação de Documentos</h2>
                <div className="template-selector">
                    {/* Seletor de templates */}
                    <select onChange={(e) => handleTemplateSelect(e.target.value)}>
                        <option value="">Selecione um modelo</option>
                        <option value="1">Contrato de Prestação de Serviços</option>
                        <option value="2">Petição Inicial</option>
                        <option value="3">Procuração</option>
                    </select>
                </div>
            </header>

            {template && (
                <div className="template-form">
                    <h3>{template.name}</h3>
                    
                    <div className="variables-form">
                        {Object.keys(variables).map(varName => (
                            <div key={varName} className="form-group">
                                <label>{varName}</label>
                                <input
                                    type="text"
                                    value={variables[varName]}
                                    onChange={e => setVariables({
                                        ...variables,
                                        [varName]: e.target.value
                                    })}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="preview-panel">
                        {/* Prévia do documento */}
                        <div className="document-preview">
                            <h4>Prévia do Documento</h4>
                            <div className="preview-content">
                                <Description style={{ fontSize: '3rem', color: '#ccc' }} />
                                <p>Preencha todos os campos para visualizar a prévia</p>
                            </div>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button 
                            className="generate-btn"
                            onClick={handleGenerate}
                            disabled={loading}
                        >
                            {loading ? 'Gerando...' : 'Gerar Documento'}
                        </button>
                    </div>
                </div>
            )}

            {generatedDoc && (
                <div className="generated-document">
                    <div className="document-header">
                        <h3>{generatedDoc.title || 'Documento Gerado'}</h3>
                        <div className="document-actions">
                            <button className="action-btn" onClick={() => setShowESignModal(true)}>
                                <Create />
                                Assinar
                            </button>
                            <button className="action-btn">
                                <CloudDownload />
                                Baixar
                            </button>
                            <button className="action-btn">
                                <Share />
                                Compartilhar
                            </button>
                        </div>
                    </div>
                    
                    <div className="document-content">
                        {/* Conteúdo do documento gerado */}
                        <div className="document-preview-box">
                            <p>Documento gerado com sucesso!</p>
                            {generatedDoc.signed && (
                                <div className="signature-badge">
                                    <span>✓</span> Documento Assinado
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {showESignModal && (
                <div className="esign-modal-overlay">
                    <div className="esign-modal">
                        <div className="modal-header">
                            <h3>Assinar Documento</h3>
                            <button 
                                className="close-modal"
                                onClick={() => setShowESignModal(false)}
                            >
                                &times;
                            </button>
                        </div>
                        
                        <div className="modal-content">
                            <div className="document-preview">
                                <h4>{generatedDoc.title || 'Documento'}</h4>
                                <div className="preview-placeholder">
                                    <Description />
                                    <p>Prévia do documento</p>
                                </div>
                            </div>
                            
                            <div className="signature-area">
                                <h4>Sua Assinatura</h4>
                                
                                <div className="signature-type-selector">
                                    <button 
                                        className={signatureType === 'draw' ? 'active' : ''}
                                        onClick={() => setSignatureType('draw')}
                                    >
                                        Desenhar
                                    </button>
                                    <button 
                                        className={signatureType === 'type' ? 'active' : ''}
                                        onClick={() => setSignatureType('type')}
                                    >
                                        Digitar
                                    </button>
                                    <button 
                                        className={signatureType === 'upload' ? 'active' : ''}
                                        onClick={() => setSignatureType('upload')}
                                    >
                                        Carregar
                                    </button>
                                </div>
                                
                                {signatureType === 'draw' && (
                                    <div className="signature-canvas-container">
                                        <SignatureCanvas
                                            ref={sigCanvas}
                                            canvasProps={{
                                                className: 'signature-pad',
                                                width: 500,
                                                height: 200
                                            }}
                                            backgroundColor="#f5f5f5"
                                        />
                                    </div>
                                )}
                                
                                {signatureType === 'type' && (
                                    <div className="typed-signature-container">
                                        <input 
                                            type="text"
                                            value={typedSignature}
                                            onChange={(e) => setTypedSignature(e.target.value)}
                                            placeholder="Digite seu nome completo"
                                            className="typed-signature-input"
                                        />
                                        <div className="typed-signature-preview">
                                            {typedSignature && (
                                                <p style={{ fontFamily: 'cursive', fontSize: '24px' }}>
                                                    {typedSignature}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                                
                                {signatureType === 'upload' && (
                                    <div className="upload-signature-container">
                                        <label className="upload-button">
                                            <Upload />
                                            Selecionar Imagem
                                            <input 
                                                type="file" 
                                                accept="image/*" 
                                                onChange={handleImageUpload}
                                                style={{ display: 'none' }}
                                            />
                                        </label>
                                        
                                        {signatureImage && (
                                            <div className="uploaded-signature-preview">
                                                <img 
                                                    src={signatureImage} 
                                                    alt="Assinatura carregada" 
                                                    style={{ maxWidth: '100%', maxHeight: '150px' }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                                
                                <div className="signature-options">
                                    <button className="clear-btn" onClick={clearSignature}>Limpar</button>
                                </div>
                            </div>
                        </div>
                        
                        <div className="modal-actions">
                            <button 
                                className="cancel-btn"
                                onClick={() => setShowESignModal(false)}
                            >
                                Cancelar
                            </button>
                            <button 
                                className="sign-btn"
                                onClick={handleSignDocument}
                            >
                                Assinar Documento
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentAutomation; 