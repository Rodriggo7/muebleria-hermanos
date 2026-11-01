const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/$/, "");

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, options);
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ||
      data?.mensaje ||
      data?.error ||
      `Error HTTP ${response.status}`
    );
  }

  return data;
}

export function obtenerProductos() {
  return request("/api/productos");
}

export function obtenerProductoPorId(id) {
  return request(`/api/productos/${encodeURIComponent(id)}`);
}

export function crearProducto(producto) {
  return request("/api/productos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
}

export function actualizarProducto(id, producto) {
  return request(`/api/productos/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
}

export function eliminarProducto(id) {
  return request(`/api/productos/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
