
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { obtenerProductoPorId } from "../services/productosService";
import Loader from "../components/Loader";
import { useCarrito } from "../hooks/useCarrito.js";
import styles from "./ProductoDetalle.module.css";

export default function ProductoDetalle() {
  const { id } = useParams();
  const [resultado, setResultado] = useState({
    id: null,
    producto: null,
    cargando: true,
    error: "",
  });

  const carrito = useCarrito();

  useEffect(() => {
    let vigente = true;

    obtenerProductoPorId(id)
      .then((dato) => {
        if (vigente) {
          setResultado({
            id,
            producto: dato,
            cargando: false,
            error: "",
          });
        }
      })
      .catch((fallo) => {
        if (vigente) {
          setResultado({
            id,
            producto: null,
            cargando: false,
            error: fallo.message || "No se pudo cargar el producto.",
          });
        }
      });

    return () => {
      vigente = false;
    };
  }, [id]);

  const cargando = resultado.id !== id || resultado.cargando;

  if (cargando) {
    return <Loader showLabel label="Cargando producto…" />;
  }

  if (resultado.error) {
    return (
      <section className="container section">
        <p role="alert">
          No pudimos cargar el producto: {resultado.error}
        </p>
        <Link to="/productos">Volver al catálogo</Link>
      </section>
    );
  }

  const producto = resultado.producto;

  return (
    <section className={`container ${styles.page}`}>
      <img
        className={styles.image}
        src={
          producto.imagen ||
          producto.image ||
          "https://placehold.co/800x600?text=Mueble"
        }
        alt={producto.nombre}
      />

      <div className={styles.content}>
        <Link to="/productos">← Catálogo</Link>

        <h1>{producto.nombre}</h1>

        <p>
          {producto.descripcion ||
            "Una pieza realizada en nuestro taller con atención a cada detalle."}
        </p>

        <p className="price">
          ${Number(producto.precio || 0).toLocaleString("es-AR")}
        </p>

        <button
          className="button primary"
          onClick={() => {
            carrito.agregar(producto);
            carrito.setAbierto(true);
          }}
        >
          Agregar al carrito
        </button>
      </div>
    </section>
  );
}
