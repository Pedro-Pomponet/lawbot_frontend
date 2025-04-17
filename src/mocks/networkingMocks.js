export const networkingMocks = {
    professionals: [
        {
            id: 1,
            name: "Dra. Ana Silva",
            specialty: "Direito Civil",
            location: "São Paulo, SP",
            yearsOfExperience: 8,
            oabNumber: "123456/SP",
            avatar: "/avatars/ana-silva.jpg",
            connections: 245,
            cases: 89,
            rating: 4.8,
            isConnected: false
        },
        {
            id: 2,
            name: "Dr. Carlos Santos",
            specialty: "Direito Trabalhista",
            location: "Rio de Janeiro, RJ",
            yearsOfExperience: 12,
            oabNumber: "98765/RJ",
            avatar: "/avatars/carlos-santos.jpg",
            connections: 312,
            cases: 156,
            rating: 4.9,
            isConnected: true
        }
    ],
    events: [
        {
            id: 1,
            title: "Congresso de Direito Digital",
            type: "conference",
            date: "2024-04-15",
            time: "09:00",
            location: "Centro de Convenções",
            description: "Discussões sobre os desafios jurídicos na era digital",
            participants: 150,
            isRegistered: false,
            speakers: [
                { id: 1, name: "Dr. Paulo Mendes", avatar: "/avatars/paulo.jpg" },
                { id: 2, name: "Dra. Maria Costa", avatar: "/avatars/maria.jpg" }
            ]
        }
    ],
    discussions: [
        {
            id: 1,
            title: "Impactos da LGPD no Direito Empresarial",
            content: "Como as empresas estão se adaptando às novas exigências...",
            author: {
                name: "Dr. Ricardo Alves",
                avatar: "/avatars/ricardo.jpg"
            },
            createdAt: "2024-03-10T10:30:00",
            tags: ["tech", "empresarial"],
            likes: 45,
            comments: 12,
            views: 230,
            isLiked: false
        }
    ],
    requests: [
        {
            id: 1,
            from: {
                name: "Dra. Juliana Lima",
                specialty: "Direito Tributário",
                location: "Curitiba, PR",
                avatar: "/avatars/juliana.jpg"
            },
            message: "Gostaria de conectar para discutir possíveis colaborações em casos tributários.",
            mutualConnections: 5
        }
    ]
}; 