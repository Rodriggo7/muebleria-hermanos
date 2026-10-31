const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

async function request(path) {
  const response = await fetch(`${API_URL}${path}`);
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.message || data?.error || `Error HTTP ${response.status}`);
  return data;
}

export const obtenerProductos = () => request("/api/productos");
export const obtenerProductoPorId = (id) => request(`/api/productos/${encodeURIComponent(id)}`);
