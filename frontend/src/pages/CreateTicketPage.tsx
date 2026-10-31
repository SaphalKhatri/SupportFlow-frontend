
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { TicketCategory, TicketPriority } from '../types/ticket';

export const CreateTicketPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TicketCategory>('general');
  const [priority, setPriority] = useState<TicketPriority>('medium');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError('Please provide both a title and description.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/tickets/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          category,
          priority,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to create ticket');
      }

      navigate(`/tickets/${data.id}`);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create ticket');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container narrow">
      <div className="page-header">
        <div>
          <h2>Create Support Ticket</h2>
          <p className="page-subtitle">
            Submit a request to our customer support team
          </p>
        </div>

        <Link to="/tickets" className="btn btn-secondary">
          Cancel
        </Link>
      </div>

      <div className="card">
        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="form-stack">
          <div className="form-group">
            <label htmlFor="title">Subject / Title</label>
            <input
              id="title"
              type="text"
              required
              placeholder="Brief summary of the issue"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={submitting}
            />
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as TicketCategory)}
                disabled={submitting}
              >
                <option value="general">General</option>
                <option value="technical">Technical</option>
                <option value="billing">Billing</option>
                <option value="account">Account</option>
              </select>
            </div>

            <div className="form-group flex-1">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TicketPriority)}
                disabled={submitting}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Detailed Description</label>
            <textarea
              id="description"
              rows={6}
              required
              placeholder="Explain the details of the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={submitting}
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Submitting Ticket...' : 'Submit Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
