import { apiUrl } from "@/constants/config";

/**
 * API utility that automatically handles authentication headers.
 *
 * How it works:
 * - getAuthHeader() checks localStorage for a token and returns the proper header
 * - api.get(), api.post(), etc. are convenience methods that:
 *   1. Automatically add the Authorization header if you're logged in
 *   2. Handle JSON parsing for you
 *   3. Let you override headers when needed (like for register/login where you don't have a token yet)
 */

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Base fetch wrapper that handles auth and JSON parsing
 * @param {string} endpoint - API endpoint (e.g., "/auth/register")
 * @param {object} options - Fetch options (method, body, headers, etc.)
 * @returns {Promise<{data: any, error: string|null, status: number}>}
 */
const request = async (endpoint, options = {}) => {
  const url = `${apiUrl}${endpoint}`;

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
      ...options.headers, // Allow overriding headers
    },
  };

  // If body is an object, stringify it
  if (config.body && typeof config.body === "object") {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      // Return error info instead of throwing - gives you more control
      return {
        data: null,
        error: data.detail || "Something went wrong",
        status: response.status,
      };
    }

    return { data, error: null, status: response.status };
  } catch (error) {
    // Network errors, JSON parse errors, etc.
    return {
      data: null,
      error: error.message || "Network error",
      status: 0,
    };
  }
};

// Convenience methods for common HTTP verbs
const api = {
  get: (endpoint, options = {}) =>
    request(endpoint, { ...options, method: "GET" }),

  post: (endpoint, body, options = {}) =>
    request(endpoint, { ...options, method: "POST", body }),

  put: (endpoint, body, options = {}) =>
    request(endpoint, { ...options, method: "PUT", body }),

  delete: (endpoint, options = {}) =>
    request(endpoint, { ...options, method: "DELETE" }),
};

export default api;
