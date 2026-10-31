
import { getCsrfToken } from "./csrf";

const API_BASE_URL = "http://localhost:8000";

export async function apiClient<T>(
    endpoint: string,
    method: string = "GET",
    data?: unknown
): Promise<T> {

    const headers: Record<string, string> = {
        "Accept": "application/json",
    };

    if (["POST", "PUT", "PATCH", "DELETE"].includes(method.toUpperCase())) {
        const csrfToken = getCsrfToken();

        if (csrfToken) {
            headers["X-CSRFToken"] = csrfToken;
        }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        credentials: "include",
        headers: {
            ...headers,
            ...(data !== undefined && {
                "Content-Type": "application/json",
            }),
        },
        body: data !== undefined ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    return response.json() as Promise<T>;
}
