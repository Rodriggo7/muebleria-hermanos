import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearProducto } from "../services/productosService";
import styles from "./CrearProducto.module.css";

const CATEGORIAS = [
  "Almacenamiento",
  "Asientos",
  "Mesas",
  "Dormitorio",
  "Comedor",
  "Oficina",
];

export default function CrearProducto() {
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

  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

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
      await crearProducto({
        ...formulario,
        precio: Number(formulario.precio),
        stock: Number(formulario.stock),
      });

      navigate("/admin/productos");
    } catch (err) {
      setError(err.message || "No se pudo crear el producto.");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <section className={`container ${styles.page}`}>
      <h1>Agregar producto</h1>
      <p>Completá los datos para incorporar un mueble al catálogo.</p>

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

        {error && <p role="alert">{error}</p>}

        <div className={styles.actions}>
          <button
            className="button primary"
            type="submit"
            disabled={guardando}
          >
            {guardando ? "Guardando..." : "Crear producto"}
          </button>

          <button
            className="button"
            type="button"
            onClick={() => navigate("/admin/productos")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}