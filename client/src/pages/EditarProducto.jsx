
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  obtenerProductoPorId,
  actualizarProducto,
} from "../services/productosService";
import styles from "./CrearProducto.module.css";

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
    materiales: "",
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
          materiales: producto.materiales || "",
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
    setFormulario((actual) => ({
      ...actual,
      [e.target.name]: e.target.value,
    }));
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

  if (cargando) {
    return (
      <section className={`container ${styles.page}`}>
        <p>Cargando producto...</p>
      </section>
    );
  }

  return (
    <section className={`container ${styles.page}`}>
      <h1>Editar producto</h1>
      <p>Modificá los datos del producto seleccionado.</p>

      {error && <p role="alert">{error}</p>}

      <form className={styles.form} onSubmit={manejarEnvio}>
        <label className={styles.field}>
          Nombre
          <input
            className={styles.control}
            name="nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
            required
          />
        </label>

        <label className={styles.field}>
          Descripción
          <textarea
            className={`${styles.control} ${styles.textarea}`}
            name="descripcion"
            value={formulario.descripcion}
            onChange={manejarCambio}
          />
        </label>

        <label className={styles.field}>
          Materiales
          <textarea
            className={`${styles.control} ${styles.textarea}`}
            name="materiales"
            value={formulario.materiales}
            onChange={manejarCambio}
            placeholder="Ej.: Nogal macizo FSC®, herrajes de latón"
          />
        </label>

        <label className={styles.field}>
          Precio
          <input
            className={styles.control}
            name="precio"
            type="number"
            min="0"
            step="0.01"
            value={formulario.precio}
            onChange={manejarCambio}
            required
          />
        </label>

        <label className={styles.field}>
          Stock
          <input
            className={styles.control}
            name="stock"
            type="number"
            min="0"
            step="1"
            value={formulario.stock}
            onChange={manejarCambio}
            required
          />
        </label>

        <label className={styles.field}>
          Categoría
          <select
            className={styles.control}
            name="categoria"
            value={formulario.categoria}
            onChange={manejarCambio}
            required
          >
            <option value="">Seleccionar categoría</option>
            {CATEGORIAS.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          URL de imagen
          <input
            className={styles.control}
            name="imagen"
            type="text"
            value={formulario.imagen}
            onChange={manejarCambio}
            placeholder="/images/productos/ejemplo.png"
          />
        </label>

        <div className={styles.actions}>
          <button
            className="button primary"
            type="submit"
            disabled={guardando}
          >
            {guardando ? "Guardando..." : "Guardar cambios"}
          </button>

          <button
            className="button"
            type="button"
            onClick={() => navigate("/productos")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}
