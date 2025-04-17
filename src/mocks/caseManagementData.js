export const mockCases = [
    {
        id: '2024.001.123-4',
        client: 'João Silva',
        title: 'Reclamação trabalhista - Horas extras',
        type: 'Trabalhista',
        status: 'Em andamento',
        priority: 'high',
        deadline: '2024-03-19',
        description: 'Reclamação trabalhista referente a horas extras não pagas',
        documentsCount: 12,
        notesCount: 8,
        hearingsCount: 2,
        lastUpdate: '2024-03-15'
    },
    {
        id: '2024.002.456-7',
        client: 'Maria Oliveira',
        title: 'Ação de indenização',
        type: 'Civil',
        status: 'Aguardando documento',
        priority: 'medium',
        deadline: '2024-03-24',
        description: 'Ação de indenização por danos morais',
        documentsCount: 8,
        notesCount: 5,
        hearingsCount: 1,
        lastUpdate: '2024-03-14'
    },
    {
        id: '2024.003.789-0',
        client: 'Pedro Santos',
        title: 'Reclamação consumidor - Produto defeituoso',
        type: 'Consumidor',
        status: 'Novo',
        priority: 'low',
        deadline: '2024-03-31',
        description: 'Reclamação referente a produto com defeito de fábrica',
        documentsCount: 4,
        notesCount: 2,
        hearingsCount: 0,
        lastUpdate: '2024-03-16'
    }
];

export const mockCourts = [
    { id: 'tjsp', name: 'TJSP', active: true },
    { id: 'trt2', name: 'TRT-2', active: true },
    { id: 'trf3', name: 'TRF-3', active: true },
    { id: 'tjrj', name: 'TJRJ', active: false },
    { id: 'trt1', name: 'TRT-1', active: false }
];

export const mockProcesses = [
    {
        numero: '1234567-89.2024.8.26.0000',
        tribunal: 'TJSP',
        status: 'Concluso para despacho',
        tipo: 'Civil',
        ultimaAtualizacao: '2024-03-15 14:30',
        partes: {
            autor: 'João Silva',
            reu: 'Empresa ABC Ltda'
        },
        movimentacoes: [
            {
                data: '2024-03-15 14:30',
                descricao: 'Conclusos para despacho'
            },
            {
                data: '2024-03-14 16:45',
                descricao: 'Juntada de petição'
            }
        ]
    },
    {
        numero: '0987654-32.2024.5.02.0001',
        tribunal: 'TRT-2',
        status: 'Aguardando audiência',
        tipo: 'Trabalhista',
        ultimaAtualizacao: '2024-03-16 09:15',
        partes: {
            autor: 'Maria Oliveira',
            reu: 'Empresa XYZ S/A'
        },
        movimentacoes: [
            {
                data: '2024-03-16 09:15',
                descricao: 'Designada audiência'
            }
        ]
    }
];

export const mockAIFeatures = [
    {
        id: 'research',
        title: 'Pesquisa Jurídica',
        description: 'Busca automatizada de jurisprudência e doutrinas relevantes',
        available: true
    },
    {
        id: 'analysis',
        title: 'Análise Preditiva',
        description: 'Previsão de resultados baseada em casos similares',
        available: true
    },
    {
        id: 'documents',
        title: 'Geração de Documentos',
        description: 'Criação automática de petições e documentos legais',
        available: true
    },
    {
        id: 'strategy',
        title: 'Sugestão de Estratégia',
        description: 'Recomendações estratégicas baseadas em análise de dados',
        available: true
    }
];

export const mockFilters = {
    types: [
        { id: 'all', label: 'Todos os tipos' },
        { id: 'civil', label: 'Civil' },
        { id: 'trabalho', label: 'Trabalhista' },
        { id: 'consumidor', label: 'Consumidor' },
        { id: 'tributario', label: 'Tributário' }
    ],
    status: [
        { id: 'all', label: 'Todos os status' },
        { id: 'novo', label: 'Novo' },
        { id: 'andamento', label: 'Em andamento' },
        { id: 'aguardando', label: 'Aguardando' },
        { id: 'concluido', label: 'Concluído' }
    ],
    priorities: [
        { id: 'all', label: 'Todas as prioridades' },
        { id: 'high', label: 'Alta' },
        { id: 'medium', label: 'Média' },
        { id: 'low', label: 'Baixa' }
    ]
}; 