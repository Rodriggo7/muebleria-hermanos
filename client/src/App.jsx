import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CarritoProvider, useCarrito } from "./hooks/CarritoContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/ProductoDetalle";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";

function CarritoPanel() {
  const carrito = useCarrito();
  if (!carrito.abierto) return null;
  const total = carrito.items.reduce((suma, item) => suma + Number(item.precio || 0) * item.cantidad, 0);
  return <aside className="cart-panel" aria-label="Carrito de compras">
    <div className="cart-heading"><h2>Tu carrito ({carrito.items.reduce((n, i) => n + i.cantidad, 0)})</h2><button onClick={() => carrito.setAbierto(false)} aria-label="Cerrar carrito">×</button></div>
    {carrito.items.length === 0 ? <p>El carrito está vacío.</p> : carrito.items.map((item) => <div className="cart-item" key={item._id ?? item.id}>
      <span>{item.nombre || item.name}<br />Unitario: ${Number(item.precio || 0).toLocaleString("es-AR")} · Subtotal ({item.cantidad}): ${(Number(item.precio || 0) * item.cantidad).toLocaleString("es-AR")}</span>
      <div><button onClick={() => carrito.cambiarCantidad(item._id ?? item.id, item.cantidad - 1)} aria-label="Disminuir cantidad">−</button> {item.cantidad} <button onClick={() => carrito.cambiarCantidad(item._id ?? item.id, item.cantidad + 1)} aria-label="Aumentar cantidad">+</button> <button onClick={() => carrito.quitar(item._id ?? item.id)}>Quitar</button></div>
    </div>)}
    <strong>Total: ${total.toLocaleString("es-AR")}</strong>
  </aside>;
}

function AppShell() {
  const carrito = useCarrito();
  return <><Navbar links={[{ label: "Inicio", href: "/" }, { label: "Productos", href: "/productos" }, { label: "Contacto", href: "/contacto" }]} />
    <div className="cart-trigger-wrap"><button className="button primary" onClick={() => carrito.setAbierto(!carrito.abierto)}>Carrito ({carrito.items.reduce((n, i) => n + i.cantidad, 0)})</button></div>
    <CarritoPanel />
    <main><Routes><Route path="/" element={<Home />} /><Route path="/productos" element={<Productos />} /><Route path="/productos/:id" element={<ProductoDetalle />} /><Route path="/contacto" element={<Contacto />} /><Route path="*" element={<NotFound />} /></Routes></main>
    <Footer />
  </>;
}

export default function App() {
  return <BrowserRouter><CarritoProvider><AppShell /></CarritoProvider></BrowserRouter>;
}
