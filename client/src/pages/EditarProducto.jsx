import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  obtenerProductoPorId,
  actualizarProducto,
} from "../services/productosService";

const CATEGORIAS = [
  "Almacenamiento",
  "Asientos",
  "Mesas",
  "Dormitorio",
  "Comedor",
  "Oficina",
];

export default function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "0",
    categoria: "",
    imagen: "",
  });
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarProducto() {
      try {
        const data = await obtenerProductoPorId(id);
        const producto = data.producto || data;
        setFormulario({
          nombre: producto.nombre || "",
          descripcion: producto.descripcion || "",
          precio: producto.precio ?? "",
          stock: producto.stock ?? 0,
          categoria: producto.categoria || "",
          imagen: producto.imagen || "",
        });
      } catch (err) {
        setError(err.message || "No se pudo cargar el producto.");
      } finally {
        setCargando(false);
      }
    }

    cargarProducto();
  }, [id]);

  function manejarCambio(e) {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  }

  async function manejarEnvio(e) {
    e.preventDefault();
    setError("");
    setGuardando(true);

    try {
      await actualizarProducto(id, {
        ...formulario,
        precio: Number(formulario.precio),
        stock: Number(formulario.stock),
      });
      navigate("/productos");
    } catch (err) {
      setError(err.message || "No se pudo actualizar el producto.");
    } finally {
      setGuardando(false);
    }
  }

  if (cargando) return <section className="container"><p>Cargando producto...</p></section>;

  return (
    <section className="container">
      <h1>Editar producto</h1>
      {error && <p role="alert">{error}</p>}
      <form onSubmit={manejarEnvio}>
        <label>Nombre
          <input name="nombre" value={formulario.nombre} onChange={manejarCambio} required />
        </label>
        <label>Descripción
          <textarea name="descripcion" value={formulario.descripcion} onChange={manejarCambio} />
        </label>
        <label>Precio
          <input name="precio" type="number" min="0" step="0.01" value={formulario.precio} onChange={manejarCambio} required />
        </label>
        <label>Stock
          <input name="stock" type="number" min="0" step="1" value={formulario.stock} onChange={manejarCambio} required />
        </label>
        <label>Categoría
          <select name="categoria" value={formulario.categoria} onChange={manejarCambio} required>
            <option value="">Seleccionar categoría</option>
            {CATEGORIAS.map((categoria) => <option key={categoria} value={categoria}>{categoria}</option>)}
          </select>
        </label>
        <label>URL de imagen
          <input name="imagen" type="url" value={formulario.imagen} onChange={manejarCambio} />
        </label>
        <button type="submit" disabled={guardando}>{guardando ? "Guardando..." : "Guardar cambios"}</button>
        <button type="button" onClick={() => navigate("/productos")}>Cancelar</button>
      </form>
    </section>
  );
}
