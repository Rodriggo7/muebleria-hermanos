import { Link } from "react-router-dom";
import useProductos from "../hooks/useProductos";
import ProductCard from "../components/ProductCard";
import { useCarrito } from "../hooks/CarritoContext";
import styles from "./Home.module.css";

export default function Home() {
  const { productos, cargando, error } = useProductos();
  const carrito = useCarrito();
  return <div className="container">
    <section className={styles.hero}><p className={styles.eyebrow}>Muebles hechos para durar</p><h1>Diseño y oficio para tu hogar</h1><p>Piezas con materiales nobles, creadas con cuidado en nuestro taller.</p><Link className="button primary" to="/productos">Explorar catálogo</Link></section>
    <section className={styles.section}><h2>Piezas destacadas</h2>{error ? <p role="alert">{error}</p> : cargando ? <p>Cargando productos…</p> : productos.length === 0 ? <p>Pronto vas a encontrar nuestras piezas acá.</p> : <div className={styles.grid}>{productos.slice(0, 3).map((p) => <ProductCard key={p._id} id={p._id} image={p.imagen || p.image || "https://placehold.co/600x450?text=Mueble"} name={p.nombre} price={p.precio} onAddToCart={() => carrito.agregar(p)} />)}</div>}<Link to="/productos">Ver todos los productos →</Link></section>
  </div>;
}
