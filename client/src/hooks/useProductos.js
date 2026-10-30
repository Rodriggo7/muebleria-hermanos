import { useEffect, useState } from "react";
import { obtenerProductos } from "../services/productosService";

export default function useProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let vigente = true;
    obtenerProductos().then((datos) => {
      if (vigente) setProductos(Array.isArray(datos) ? datos : []);
    }).catch((fallo) => {
      if (vigente) setError(fallo.message || "No se pudieron cargar los productos.");
    }).finally(() => {
      if (vigente) setCargando(false);
    });
    return () => { vigente = false; };
  }, []);

  return { productos, cargando, error };
}
