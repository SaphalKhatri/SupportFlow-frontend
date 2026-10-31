export type TicketCategory = 'general' | 'technical' | 'billing' | 'account';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface UserSummary {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface TicketListItem {
  id: number;
  ticket_number: string;
  title: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  creator: UserSummary;
  assigned_agent: UserSummary | null;
  created_at: string;
  updated_at: string;
}

export interface TicketDetail extends TicketListItem {
  description: string;
  resolved_at: string | null;
}

export interface CreateTicketPayload {
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}