let tickets = [];
export async function createTicket(ticketData) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const ticket = {
        id: `TICKET-${Date.now().toString().slice(-6)}`,
        ...ticketData,
        status: 'open',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    tickets.push(ticket);
    console.log(`Email de confirmation envoyé à ${ticketData.userEmail || 'utilisateur'}`);
    console.log(`Ticket créé: ${ticket.id}`);
    return ticket;
}
export async function getTickets(userId) {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (userId) {
        return tickets.filter(ticket => ticket.userId === userId);
    }
    return tickets;
}
export async function getTicketById(ticketId) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return tickets.find(ticket => ticket.id === ticketId) || null;
}
export async function updateTicketStatus(ticketId, status) {
    await new Promise(resolve => setTimeout(resolve, 800));
    const ticketIndex = tickets.findIndex(ticket => ticket.id === ticketId);
    if (ticketIndex === -1) {
        return null;
    }
    tickets[ticketIndex] = {
        ...tickets[ticketIndex],
        status,
        updatedAt: new Date().toISOString()
    };
    return tickets[ticketIndex];
}
export function getCategoryLabel(category) {
    const categories = {
        general: 'Question générale',
        technical: 'Problème technique',
        account: 'Problème de compte',
        property: 'Question sur un bien',
        billing: 'Facturation',
        other: 'Autre'
    };
    return categories[category] || category;
}
export function getPriorityLabel(priority) {
    const priorities = {
        low: 'Faible',
        medium: 'Moyenne',
        high: 'Élevée',
        urgent: 'Urgente'
    };
    return priorities[priority] || priority;
}
export function getStatusLabel(status) {
    const statuses = {
        open: 'Ouvert',
        'in-progress': 'En cours',
        closed: 'Fermé'
    };
    return statuses[status] || status;
}
