import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  obtenerProductos,
  eliminarProducto,
} from "../services/productosService";

export default function AdministrarProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarProductos = useCallback(async () => {
    try {
      setCargando(true);
      setError("");
      const data = await obtenerProductos();
      setProductos(Array.isArray(data) ? data : data.productos || []);
    } catch (err) {
      setError(err.message || "No se pudieron cargar los productos.");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  async function manejarEliminacion(id) {
    if (!window.confirm("¿Querés dar de baja este producto?")) return;

    try {
      await eliminarProducto(id);
      await cargarProductos();
    } catch (err) {
      setError(err.message || "No se pudo eliminar el producto.");
    }
  }

  return (
    <section className="container">
      <h1>Administrar productos</h1>
      <p>Gestioná el catálogo de la mueblería.</p>

      <Link className="button primary" to="/admin/productos/nuevo">
        Agregar producto
      </Link>

      {error && <p role="alert">{error}</p>}
      {cargando ? (
        <p>Cargando productos...</p>
      ) : productos.length === 0 ? (
        <p>No hay productos cargados todavía.</p>
      ) : (
        <div>
          {productos.map((producto) => (
            <article key={producto._id} className="card">
              <h2>{producto.nombre}</h2>
              <p>Categoría: {producto.categoria}</p>
              <p>Precio: ${Number(producto.precio).toLocaleString("es-AR")}</p>
              <p>Stock: {producto.stock}</p>
              <Link
                className="button"
                to={`/admin/productos/${producto._id}/editar`}
              >
                Editar
              </Link>
              <button
                type="button"
                onClick={() => manejarEliminacion(producto._id)}
              >
                Eliminar
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
