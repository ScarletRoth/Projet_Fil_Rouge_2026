export interface Ticket {
  id: string
  subject: string
  category: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  description: string
  status: 'open' | 'in-progress' | 'closed'
  userId?: string
  userName?: string
  userEmail?: string
  createdAt: string
  updatedAt: string
}

export interface CreateTicketData {
  subject: string
  category: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  description: string
  userId?: string
  userName?: string
  userEmail?: string
}

let tickets: Ticket[] = []

export async function createTicket(ticketData: CreateTicketData): Promise<Ticket> {
  await new Promise(resolve => setTimeout(resolve, 1500))

  const ticket: Ticket = {
    id: `TICKET-${Date.now().toString().slice(-6)}`,
    ...ticketData,
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  tickets.push(ticket)

  console.log(`Email de confirmation envoyé à ${ticketData.userEmail || 'utilisateur'}`)
  console.log(`Ticket créé: ${ticket.id}`)

  return ticket
}

export async function getTickets(userId?: string): Promise<Ticket[]> {
  await new Promise(resolve => setTimeout(resolve, 500))

  if (userId) {
    return tickets.filter(ticket => ticket.userId === userId)
  }

  return tickets
}

export async function getTicketById(ticketId: string): Promise<Ticket | null> {
  await new Promise(resolve => setTimeout(resolve, 300))

  return tickets.find(ticket => ticket.id === ticketId) || null
}

export async function updateTicketStatus(ticketId: string, status: Ticket['status']): Promise<Ticket | null> {
  await new Promise(resolve => setTimeout(resolve, 800))

  const ticketIndex = tickets.findIndex(ticket => ticket.id === ticketId)

  if (ticketIndex === -1) {
    return null
  }

  tickets[ticketIndex] = {
    ...tickets[ticketIndex],
    status,
    updatedAt: new Date().toISOString()
  }

  return tickets[ticketIndex]
}

export function getCategoryLabel(category: string): string {
  const categories: Record<string, string> = {
    general: 'Question générale',
    technical: 'Problème technique',
    account: 'Problème de compte',
    property: 'Question sur un bien',
    billing: 'Facturation',
    other: 'Autre'
  }

  return categories[category] || category
}

export function getPriorityLabel(priority: string): string {
  const priorities: Record<string, string> = {
    low: 'Faible',
    medium: 'Moyenne',
    high: 'Élevée',
    urgent: 'Urgente'
  }

  return priorities[priority] || priority
}

export function getStatusLabel(status: string): string {
  const statuses: Record<string, string> = {
    open: 'Ouvert',
    'in-progress': 'En cours',
    closed: 'Fermé'
  }

  return statuses[status] || status
}