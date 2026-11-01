import { useEffect, useState } from "react";
import { obtenerProductos } from "../services/productosService";

export default function useProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    async function cargarProductos() {
      try {
        setCargando(true);
        setError("");

        const data = await obtenerProductos();

        if (!activo) return;

        const lista = Array.isArray(data)
          ? data
          : Array.isArray(data?.productos)
            ? data.productos
            : [];

        setProductos(lista);
      } catch (err) {
        if (activo) {
          setError(err.message || "No se pudieron cargar los productos.");
        }
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargarProductos();

    return () => {
      activo = false;
    };
  }, []);

  return { productos, cargando, error };
}
