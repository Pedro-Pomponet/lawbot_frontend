export const legalAnalyzer = {
    // Analisa tipo de documento
    analyzeDocumentType(text) {
        const types = {
            'petição': /petição|requer|excelentíssimo/i,
            'contrato': /contrato|acordo|convenção/i,
            'procuração': /procuração|outorgante|outorgado/i,
            'parecer': /parecer|opinião legal|consultoria/i
        };

        for (const [type, pattern] of Object.entries(types)) {
            if (pattern.test(text)) {
                return type;
            }
        }

        return 'outro';
    },

    // Extrai partes envolvidas
    extractParties(text) {
        const parties = {
            requerente: text.match(/requerente:\s*([^\n]+)/i)?.[1],
            requerido: text.match(/requerido:\s*([^\n]+)/i)?.[1],
            autor: text.match(/autor:\s*([^\n]+)/i)?.[1],
            réu: text.match(/réu:\s*([^\n]+)/i)?.[1]
        };

        return Object.fromEntries(
            Object.entries(parties).filter(([_, value]) => value)
        );
    },

    // Identifica prazos
    identifyDeadlines(text) {
        const deadlinePatterns = [
            /prazo\s*de\s*(\d+)\s*(dias?|meses?|anos?)/gi,
            /até\s*(\d{2}\/\d{2}\/\d{4})/g
        ];

        const deadlines = [];
        for (const pattern of deadlinePatterns) {
            let match;
            while ((match = pattern.exec(text)) !== null) {
                deadlines.push(match[0]);
            }
        }

        return deadlines;
    },

    // Analisa riscos
    analyzeRisks(text) {
        const riskPatterns = {
            alto: /risco\s*alto|perigo\s*iminente|urgente/i,
            médio: /risco\s*médio|atenção\s*necessária/i,
            baixo: /risco\s*baixo|sem\s*urgência/i
        };

        for (const [level, pattern] of Object.entries(riskPatterns)) {
            if (pattern.test(text)) {
                return level;
            }
        }

        return 'não identificado';
    }
}; 