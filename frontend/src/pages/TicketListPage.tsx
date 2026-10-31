
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { TicketListItem } from "../types/ticket";

export const TicketListPage = () => {
    const [tickets, setTickets] = useState<TicketListItem[]>([]);
    const [totalcount, setTotalCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTickets = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                "http://localhost:8000/api/tickets/",
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch tickets");
            }

            const data = await response.json();

            setTickets(data.results);
            setTotalCount(data.count);

        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to fetch tickets"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h2>Support Tickets</h2>
                    <p className="page-subtitle">
                        Track, Manage and view customer support requests
                        ({totalcount} total)
                    </p>
                </div>

                <Link
                    to="/tickets/new"
                    className="btn btn-primary"
                >
                    Create Ticket
                </Link>
            </div>

            {loading && (
                <div className="card text-muted">
                    Loading tickets...
                </div>
            )}

            {error && (
                <div className="card alert-error">
                    <p>
                        <strong>Error loading tickets: {error}</strong>
                    </p>
                </div>
            )}

            {!loading && !error && tickets.length > 0 && (
                <div className="card-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Ticket ID</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Assigned Agent</th>
                                <th>Created</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tickets.map((t) => (
                                <tr key={t.id}>
                                    <td>
                                        <Link
                                            to={`/tickets/${t.id}`}
                                            className="ticket-link"
                                        >
                                            {t.ticket_number}
                                        </Link>
                                    </td>

                                    <td>
                                        <Link
                                            to={`/tickets/${t.id}`}
                                            className="ticket-title-link"
                                        >
                                            {t.title}
                                        </Link>
                                    </td>

                                    <td>
                                        <span className="badge category-badge">
                                            {t.category}
                                        </span>
                                    </td>

                                    <td>
                                        <span className={`badge priority-${t.priority}`}>
                                            {t.priority}
                                        </span>
                                    </td>

                                    <td>
                                        <span className="badge status">
                                            {t.status.replace("_", " ")}
                                        </span>
                                    </td>

                                    <td>
                                        <span className="text-muted">
                                            {t.assigned_agent
                                                ? t.assigned_agent.username
                                                : "Unassigned"}
                                        </span>
                                    </td>

                                    <td>
                                        <span className="text-muted">
                                            {new Date(
                                                t.created_at
                                            ).toLocaleDateString()}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {!loading && !error && tickets.length === 0 && (
                <div className="card text-muted">
                    No tickets found.
                </div>
            )}
        </div>
    );
};
