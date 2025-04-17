import React from 'react';
import { formatters } from '../../utils/helpers';
import { legalAnalyzer } from '../../utils/legalAnalysis';

const Message = ({ type, content, metadata }) => {
    return (
        <div className={`message ${type}`}>
            <div className="message-content">{content}</div>
            {metadata && (
                <div className="message-metadata">
                    <span className="timestamp">
                        {new Date(metadata.timestamp).toLocaleTimeString()}
                    </span>
                    {metadata.confidence && (
                        <span className="confidence">
                            Confiança: {Math.round(metadata.confidence * 100)}%
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default Message; 