import { Link } from "react-router-dom";
import useProductos from "../hooks/useProductos";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { useCarrito } from "../hooks/CarritoContext";
import styles from "./Productos.module.css";

export default function Productos() {
  const { productos, cargando, error } = useProductos();
  const carrito = useCarrito();
  return <section className={`container ${styles.page}`}><h1>Catálogo</h1><p>Encontrá la pieza indicada para tu espacio.</p>
    {cargando ? <Loader showLabel label="Cargando productos…" /> : error ? <p role="alert">No pudimos cargar el catálogo: {error}</p> : productos.length === 0 ? <p>Todavía no hay productos disponibles.</p> : <div className={styles.grid}>{productos.map((p) => <div key={p._id} className={styles.tile}><ProductCard id={p._id} image={p.imagen || p.image || "https://placehold.co/600x450?text=Mueble"} name={p.nombre} price={p.precio} onAddToCart={() => carrito.agregar(p)} /><Link className={styles.detailLink} to={`/productos/${p._id}`}>Ver detalle</Link></div>)}</div>}
  </section>;
}
