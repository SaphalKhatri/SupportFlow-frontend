
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { TicketDetail } from '../types/ticket';

export const TicketDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchTicket = async () => {
      

      try {
        const response = await fetch(
          `http://localhost:8000/api/tickets/${id}/`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        if (!response.ok) {
          throw new Error('Failed to load ticket');
        }

        const data = await response.json();
        setTicket(data);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load ticket');
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="card text-muted">
          Loading ticket #{id}...
        </div>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="page-container">
        <div className="card alert-error">
          <p><strong>Error:</strong> {error || 'Ticket not found.'}</p>

          <Link
            to="/tickets"
            className="btn btn-secondary"
            style={{ marginTop: '1rem', display: 'inline-block' }}
          >
            Back to Tickets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <span className="badge category-badge">
            {ticket.category}
          </span>

          <h2 style={{ marginTop: '0.25rem' }}>
            {ticket.title}
          </h2>

          <p className="page-subtitle">
            Ticket ID: <strong>{ticket.ticket_number}</strong> •
            Created by {ticket.creator.username} on{' '}
            {new Date(ticket.created_at).toLocaleString()}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span className={`badge status-${ticket.status}`}>
            {ticket.status.replace('_', ' ')}
          </span>

          <span className={`badge priority-${ticket.priority}`}>
            {ticket.priority}
          </span>

          <Link to="/tickets" className="btn btn-secondary">
            Back to List
          </Link>
        </div>
      </div>

      <div className="ticket-layout">
        <div className="ticket-main">
          <div className="card">
            <h3 style={{ marginBottom: '0.75rem', fontSize: 'var(--font-size-base)' }}>
              Description
            </h3>

            <p className="ticket-body">
              {ticket.description}
            </p>
          </div>
        </div>

        <aside className="ticket-sidebar">
          <div className="card">
            <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
              Ticket Details
            </h4>

            <div className="meta-list">
              <div className="meta-item">
                <span className="meta-label">Assigned Agent</span>
                <span className="meta-value">
                  {ticket.assigned_agent
                    ? ticket.assigned_agent.username
                    : 'Unassigned'}
                </span>
              </div>

              <div className="meta-item">
                <span className="meta-label">Category</span>
                <span className="meta-value" style={{ textTransform: 'capitalize' }}>
                  {ticket.category}
                </span>
              </div>

              <div className="meta-item">
                <span className="meta-label">Priority</span>
                <span className="meta-value" style={{ textTransform: 'capitalize' }}>
                  {ticket.priority}
                </span>
              </div>

              <div className="meta-item">
                <span className="meta-label">Status</span>
                <span className="meta-value" style={{ textTransform: 'capitalize' }}>
                  {ticket.status.replace('_', ' ')}
                </span>
              </div>

              <div className="meta-item">
                <span className="meta-label">Last Updated</span>
                <span className="meta-value">
                  {new Date(ticket.updated_at).toLocaleString()}
                </span>
              </div>

              {ticket.resolved_at && (
                <div className="meta-item">
                  <span className="meta-label">Resolved At</span>
                  <span className="meta-value">
                    {new Date(ticket.resolved_at).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
