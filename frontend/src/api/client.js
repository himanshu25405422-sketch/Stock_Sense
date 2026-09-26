export async function apiFetch(endpoint, options = {}) {
  const defaultHeaders = { 'Content-Type': 'application/json' };
  const res = await fetch(`/api${endpoint}`, {
    ...options,
    headers: { ...defaultHeaders, ...(options.headers || {}) }
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Request failed with status ${res.status}`);
  }
  return res.json();
}
