import React, { useState, useRef } from 'react';
import { 
    CameraAlt, 
    Upload, 
    TextFormat, 
    Edit,
    Check,
    ContentCopy,
    Save,
    Crop,
    ZoomIn,
    ZoomOut,
    Rotate90DegreesCcw,
    Delete,
    Image
} from '@mui/icons-material';
import './OCRSystem.css';

const OCRSystem = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [extractedText, setExtractedText] = useState('');
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedText, setEditedText] = useState('');
    const [zoomLevel, setZoomLevel] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [processingHistory, setProcessingHistory] = useState([]);
    const [activeTab, setActiveTab] = useState('upload');
    
    const fileInputRef = useRef(null);
    const cameraRef = useRef(null);
    const canvasRef = useRef(null);
    
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            processFile(selectedFile);
        }
    };
    
    const processFile = (selectedFile) => {
        setFile(selectedFile);
        
        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };
    
    const handleDrop = (e) => {
        e.preventDefault();
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };
    
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    
    const captureImage = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (cameraRef.current) {
                cameraRef.current.srcObject = stream;
                cameraRef.current.play();
            }
        } catch (error) {
            console.error('Erro ao acessar câmera:', error);
        }
    };
    
    const takeSnapshot = () => {
        if (cameraRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            
            // Definir dimensões do canvas para corresponder ao vídeo
            canvas.width = cameraRef.current.videoWidth;
            canvas.height = cameraRef.current.videoHeight;
            
            // Desenhar o frame atual do vídeo no canvas
            context.drawImage(cameraRef.current, 0, 0, canvas.width, canvas.height);
            
            // Converter para base64
            const imageDataUrl = canvas.toDataURL('image/png');
            setPreview(imageDataUrl);
            
            // Converter base64 para Blob/File
            fetch(imageDataUrl)
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], "camera-capture.png", { type: "image/png" });
                    setFile(file);
                    
                    // Parar a câmera
                    if (cameraRef.current.srcObject) {
                        cameraRef.current.srcObject.getTracks().forEach(track => track.stop());
                    }
                });
        }
    };
    
    const processOCR = async () => {
        if (!file) return;
        
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('image', file);
            
            const response = await fetch('/api/ocr/process', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                setExtractedText(data.text);
                setEditedText(data.text);
                
                // Adicionar ao histórico
                const newHistoryItem = {
                    id: Date.now(),
                    filename: file.name,
                    preview: preview,
                    text: data.text,
                    date: new Date().toISOString()
                };
                
                setProcessingHistory([newHistoryItem, ...processingHistory]);
            }
        } catch (error) {
            console.error('Erro no processamento OCR:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const handleCopy = () => {
        navigator.clipboard.writeText(editMode ? editedText : extractedText);
    };
    
    const handleSave = async () => {
        try {
            const response = await fetch('/api/documents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: file ? file.name.replace(/\.[^/.]+$/, "") : "Documento Digitalizado",
                    content: editMode ? editedText : extractedText,
                    type: "ocr",
                    originalImage: preview
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Feedback de sucesso
                alert("Documento salvo com sucesso!");
            }
        } catch (error) {
            console.error('Erro ao salvar documento:', error);
        }
    };
    
    const handleZoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 0.1, 2));
    };
    
    const handleZoomOut = () => {
        setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
    };
    
    const handleRotate = () => {
        setRotation(prev => (prev + 90) % 360);
    };
    
    const clearImage = () => {
        setFile(null);
        setPreview('');
        setExtractedText('');
        setEditedText('');
        setZoomLevel(1);
        setRotation(0);
        
        // Parar a câmera se estiver ativa
        if (cameraRef.current && cameraRef.current.srcObject) {
            cameraRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
    };
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };
    
    return (
        <div className="ocr-system-container">
            <div className="ocr-header">
                <h3>
                    <TextFormat />
                    Sistema OCR
                </h3>
                <div className="tab-navigation">
                    <button 
                        className={activeTab === 'upload' ? 'active' : ''}
                        onClick={() => setActiveTab('upload')}
                    >
                        Upload de Imagem
                    </button>
                    <button 
                        className={activeTab === 'camera' ? 'active' : ''}
                        onClick={() => {
                            setActiveTab('camera');
                            captureImage();
                        }}
                    >
                        Captura de Câmera
                    </button>
                    <button 
                        className={activeTab === 'history' ? 'active' : ''}
                        onClick={() => setActiveTab('history')}
                    >
                        Histórico
                    </button>
                </div>
            </div>

            <div className="ocr-content">
                {activeTab === 'upload' && (
                    <div className="upload-section">
                        <div 
                            className="dropzone"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                        >
                            {!preview ? (
                                <>
                                    <Upload className="upload-icon" />
                                    <p>Arraste e solte uma imagem aqui ou clique para selecionar</p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                    />
                                    <button 
                                        onClick={() => fileInputRef.current.click()}
                                        className="select-file-button"
                                    >
                                        Selecionar Arquivo
                                    </button>
                                </>
                            ) : (
                                <div className="image-preview-container">
                                    <div className="image-controls">
                                        <button onClick={handleZoomIn}>
                                            <ZoomIn />
                                        </button>
                                        <button onClick={handleZoomOut}>
                                            <ZoomOut />
                                        </button>
                                        <button onClick={handleRotate}>
                                            <Rotate90DegreesCcw />
                                        </button>
                                        <button onClick={clearImage}>
                                            <Delete />
                                        </button>
                                    </div>
                                    <div className="image-preview-wrapper">
                                        <img 
                                            src={preview} 
                                            alt="Preview" 
                                            className="image-preview"
                                            style={{
                                                transform: `scale(${zoomLevel}) rotate(${rotation}deg)`
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {preview && (
                            <div className="ocr-actions">
                                <button 
                                    onClick={processOCR}
                                    disabled={loading || !file}
                                    className="process-button"
                                >
                                    <TextFormat />
                                    {loading ? 'Processando...' : 'Processar OCR'}
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'camera' && (
                    <div className="camera-section">
                        <div className="camera-container">
                            <video ref={cameraRef} className="camera-preview"></video>
                            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                            
                            <div className="camera-controls">
                                <button onClick={takeSnapshot} className="capture-button">
                                    <CameraAlt />
                                    Capturar
                                </button>
                            </div>
                        </div>
                        
                        {preview && activeTab === 'camera' && (
                            <>
                                <div className="snapshot-preview">
                                    <img src={preview} alt="Captura" />
                                </div>
                                
                                <div className="ocr-actions">
                                    <button 
                                        onClick={processOCR}
                                        disabled={loading || !file}
                                        className="process-button"
                                    >
                                        <TextFormat />
                                        {loading ? 'Processando...' : 'Processar OCR'}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {activeTab === 'history' && (
                    <div className="history-section">
                        <h4>Histórico de Processamentos</h4>
                        
                        {processingHistory.length === 0 ? (
                            <div className="empty-history">
                                <p>Nenhum processamento OCR realizado ainda.</p>
                            </div>
                        ) : (
                            <div className="history-list">
                                {processingHistory.map(item => (
                                    <div key={item.id} className="history-item">
                                        <div className="history-preview">
                                            <img src={item.preview} alt={item.filename} />
                                        </div>
                                        <div className="history-details">
                                            <h5>{item.filename}</h5>
                                            <p className="history-date">{formatDate(item.date)}</p>
                                            <div className="history-text-preview">
                                                {item.text.substring(0, 100)}...
                                            </div>
                                            <div className="history-actions">
                                                <button onClick={() => {
                                                    setPreview(item.preview);
                                                    setExtractedText(item.text);
                                                    setEditedText(item.text);
                                                    setActiveTab('upload');
                                                }}>
                                                    <Edit />
                                                    Editar
                                                </button>
                                                <button onClick={() => {
                                                    navigator.clipboard.writeText(item.text);
                                                }}>
                                                    <ContentCopy />
                                                    Copiar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {extractedText && (
                    <div className="extracted-text-section">
                        <div className="text-header">
                            <h4>Texto Extraído</h4>
                            <div className="text-actions">
                                <button 
                                    onClick={() => {
                                        if (editMode) {
                                            setExtractedText(editedText);
                                        }
                                        setEditMode(!editMode);
                                    }}
                                >
                                    {editMode ? <Check /> : <Edit />}
                                    {editMode ? 'Salvar Edições' : 'Editar'}
                                </button>
                                <button onClick={handleCopy}>
                                    <ContentCopy />
                                    Copiar
                                </button>
                                <button onClick={handleSave}>
                                    <Save />
                                    Salvar como Documento
                                </button>
                            </div>
                        </div>
                        
                        {editMode ? (
                            <textarea
                                value={editedText}
                                onChange={(e) => setEditedText(e.target.value)}
                                className="editable-text"
                            />
                        ) : (
                            <div className="extracted-text">
                                {extractedText}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OCRSystem; 