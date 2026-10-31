import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { obtenerProductoPorId } from "../services/productosService";
import Loader from "../components/Loader";
import { useCarrito } from "../hooks/CarritoContext";
import styles from "./ProductoDetalle.module.css";

export default function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const carrito = useCarrito();
  useEffect(() => {
    let vigente = true;
    setCargando(true); setError("");
    obtenerProductoPorId(id).then((dato) => { if (vigente) setProducto(dato); }).catch((fallo) => { if (vigente) setError(fallo.message); }).finally(() => { if (vigente) setCargando(false); });
    return () => { vigente = false; };
  }, [id]);
  if (cargando) return <Loader showLabel label="Cargando producto…" />;
  if (error) return <section className="container section"><p role="alert">No pudimos cargar el producto: {error}</p><Link to="/productos">Volver al catálogo</Link></section>;
  return <section className={`container ${styles.page}`}><img className={styles.image} src={producto.imagen || producto.image || "https://placehold.co/800x600?text=Mueble"} alt={producto.nombre} /><div className={styles.content}><Link to="/productos">← Catálogo</Link><h1>{producto.nombre}</h1><p>{producto.descripcion || "Una pieza realizada en nuestro taller con atención a cada detalle."}</p><p className="price">${Number(producto.precio || 0).toLocaleString("es-AR")}</p><button className="button primary" onClick={() => { carrito.agregar(producto); carrito.setAbierto(true); }}>Agregar al carrito</button></div></section>;
}
