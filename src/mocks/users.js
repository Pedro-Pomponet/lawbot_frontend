export const mockUsers = {
    lawyer: {
        id: "1",
        name: "Dr. Carlos Eduardo Santos",
        oab: "12345/SE",
        email: "carlos.santos@advogado.com",
        phone: "(79) 99999-8888",
        specialties: ["Direito Civil", "Direito do Consumidor"],
        address: "Av. Ivo do Prado, 1000 - Centro, Aracaju/SE",
        photo: "/assets/lawyer-photo.jpg",
        bio: "Advogado com 15 anos de experiência, especialista em causas cíveis e direito do consumidor. Membro ativo da OAB/SE e professor universitário.",
        metrics: {
            casesWon: 127,
            activeClients: 45,
            satisfactionRate: 98,
            yearsActive: 15
        }
    },
    client: {
        id: "2",
        name: "Maria Silva",
        email: "maria.silva@email.com",
        phone: "(79) 99999-7777",
        address: "Rua Campo do Brito, 500 - São José, Aracaju/SE",
        photo: "/assets/client-photo.jpg",
        cases: [
            {
                id: "case1",
                type: "Consumidor",
                status: "Em andamento",
                description: "Processo contra operadora de telefonia",
                startDate: "2024-01-15"
            }
        ]
    }
}; 