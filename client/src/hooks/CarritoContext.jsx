import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("muebleria-carrito") || "[]"); } catch { return []; }
  });
  const [abierto, setAbierto] = useState(false);
  useEffect(() => localStorage.setItem("muebleria-carrito", JSON.stringify(items)), [items]);
  const value = useMemo(() => ({
    items,
    agregar: (producto) => setItems((prev) => {
      const id = String(producto._id ?? producto.id);
      const actual = prev.find((item) => String(item._id ?? item.id) === id);
      return actual ? prev.map((item) => String(item._id ?? item.id) === id ? { ...item, cantidad: item.cantidad + 1 } : item) : [...prev, { ...producto, cantidad: 1 }];
    }),
    cambiarCantidad: (id, cantidad) => setItems((prev) => prev.map((item) => String(item._id ?? item.id) === String(id) ? { ...item, cantidad: Math.max(1, Number(cantidad) || 1) } : item)),
    quitar: (id) => setItems((prev) => prev.filter((item) => String(item._id ?? item.id) !== String(id))),
    abierto, setAbierto,
  }), [items, abierto]);
  return <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>;
}

export function useCarrito() {
  const context = useContext(CarritoContext);
  if (!context) throw new Error("useCarrito debe usarse dentro de CarritoProvider.");
  return context;
}
