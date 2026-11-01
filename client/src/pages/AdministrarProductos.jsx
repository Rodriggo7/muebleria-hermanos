
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  obtenerProductos,
  eliminarProducto,
} from "../services/productosService";
import styles from "./AdministrarProductos.module.css";

export default function AdministrarProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);

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
    let vigente = true;

    async function cargarInicialmente() {
      try {
        const data = await obtenerProductos();

        if (vigente) {
          setProductos(Array.isArray(data) ? data : data.productos || []);
        }
      } catch (err) {
        if (vigente) {
          setError(err.message || "No se pudieron cargar los productos.");
        }
      } finally {
        if (vigente) {
          setCargando(false);
        }
      }
    }

    cargarInicialmente();

    return () => {
      vigente = false;
    };
  }, []);

  function manejarEliminacion(producto) {
    setProductoAEliminar(producto);
  }

  function cancelarEliminacion() {
    if (eliminando) return;
    setProductoAEliminar(null);
  }

  async function confirmarEliminacion() {
    if (!productoAEliminar || eliminando) return;

    try {
      setEliminando(true);
      setError("");

      await eliminarProducto(productoAEliminar._id);
      setProductoAEliminar(null);
      await cargarProductos();
    } catch (err) {
      setError(err.message || "No se pudo eliminar el producto.");
    } finally {
      setEliminando(false);
    }
  }

  return (
    <section className={`container ${styles.admin}`}>
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Panel de gestión</span>
          <h1>Administrar productos</h1>
          <p>Gestioná el catálogo de la mueblería.</p>
        </div>

        <Link
          className={`button primary ${styles.addButton}`}
          to="/admin/productos/nuevo"
        >
          + Agregar producto
        </Link>
      </header>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      {cargando ? (
        <p className={styles.message}>Cargando productos...</p>
      ) : productos.length === 0 ? (
        <p className={styles.message}>
          No hay productos cargados todavía.
        </p>
      ) : (
        <>
          <div className={styles.summary}>
            <span>Productos registrados</span>
            <strong>{productos.length}</strong>
          </div>

          <div className={styles.grid}>
            {productos.map((producto) => (
              <article key={producto._id} className={styles.card}>
                <img
                  className={styles.productImage}
                  src={producto.imagen}
                  alt={producto.nombre}
                  onError={(e) => {
                    e.currentTarget.style.visibility = "hidden";
                  }}
                />

                <div className={styles.cardContent}>
                  <span className={styles.category}>
                    {producto.categoria}
                  </span>

                  <h2>{producto.nombre}</h2>

                  <div className={styles.details}>
                    <p>
                      <span>Precio</span>
                      <strong>
                        ${Number(producto.precio).toLocaleString("es-AR")}
                      </strong>
                    </p>

                    <p>
                      <span>Stock disponible</span>
                      <strong>{producto.stock} unidades</strong>
                    </p>
                  </div>
                </div>

                <div className={styles.actions}>
                  <Link
                    className={styles.editButton}
                    to={`/admin/productos/${producto._id}/editar`}
                  >
                    Editar
                  </Link>

                  <button
                    className={styles.deleteButton}
                    type="button"
                    onClick={() => manejarEliminacion(producto)}
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {productoAEliminar && (
        <div
          className={styles.modalOverlay}
          onClick={cancelarEliminacion}
        >
          <section
            className={styles.modal}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="titulo-confirmacion"
            aria-describedby="descripcion-confirmacion"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.modalClose}
              onClick={cancelarEliminacion}
              aria-label="Cerrar"
              disabled={eliminando}
            >
              ×
            </button>

            <span className={styles.modalEyebrow}>
              Hermanos Jota · Panel de gestión
            </span>

            <h2 id="titulo-confirmacion">¿Estás seguro?</h2>

            <h3>¿Querés dar de baja este producto?</h3>
            <p
              id="descripcion-confirmacion"
              className={styles.modalDescription}
            >
              El producto dejará de estar disponible en el catálogo.
            </p>

            <div className={styles.selectedProduct}>
              <span>Producto seleccionado</span>
              <strong>{productoAEliminar.nombre}</strong>
              <small>
                {productoAEliminar.categoria} · $
                {Number(productoAEliminar.precio).toLocaleString("es-AR")}
              </small>
            </div>

            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.cancelModalButton}
                onClick={cancelarEliminacion}
                disabled={eliminando}
              >
                Cancelar
              </button>

              <button
                type="button"
                className={styles.confirmModalButton}
                onClick={confirmarEliminacion}
                disabled={eliminando}
              >
                {eliminando ? "Procesando..." : "Confirmar baja"}
              </button>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
