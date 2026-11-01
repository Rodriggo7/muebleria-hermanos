import { useState } from "react";
import { Link } from "react-router-dom";
import { registrarUsuario } from "../services/usuariosService";
import styles from "./Contacto.module.css";

export default function Registro() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmarPassword: "",
  });

  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  function manejarCambio(event) {
    const { name, value } = event.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));
  }

  async function manejarEnvio(event) {
    event.preventDefault();
    setError("");
    setMensaje("");

    if (formulario.password !== formulario.confirmarPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setCargando(true);

    try {
      const resultado = await registrarUsuario({
        nombre: formulario.nombre,
        email: formulario.email,
        password: formulario.password,
      });

      setMensaje(
        resultado.mensaje || "Registro completado correctamente."
      );

      setFormulario({
        nombre: "",
        email: "",
        password: "",
        confirmarPassword: "",
      });
    } catch (err) {
      setError(err.message || "No se pudo completar el registro.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <section className={`container ${styles.page}`}>
      <h1>Crear una cuenta</h1>

      <p>
        Registrate para formar parte de Mueblería Hermanos Jota.
      </p>

      {mensaje && (
        <div className={styles.successMessage} role="status">
          <span className={styles.successIcon} aria-hidden="true">
            ✓
          </span>

          <div>
            <strong>¡Tu cuenta fue creada correctamente!</strong>
            <p>{mensaje}</p>
            <span>Ya formás parte de Hermanos Jota.</span>
          </div>
        </div>
      )}

      {error && (
        <div className={styles.errorMessage} role="alert">
          <strong>No pudimos completar el registro</strong>
          <p>{error}</p>
        </div>
      )}

      <form className={styles.form} onSubmit={manejarEnvio}>
        <label className={styles.field}>
          Nombre completo
          <input
            className={styles.control}
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
            minLength={2}
            maxLength={80}
            autoComplete="name"
            required
          />
        </label>

        <label className={styles.field}>
          Correo electrónico
          <input
            className={styles.control}
            type="email"
            name="email"
            value={formulario.email}
            onChange={manejarCambio}
            autoComplete="email"
            required
          />
        </label>

        <label className={styles.field}>
          Contraseña
          <input
            className={styles.control}
            type="password"
            name="password"
            value={formulario.password}
            onChange={manejarCambio}
            minLength={8}
            autoComplete="new-password"
            required
          />
        </label>

        <label className={styles.field}>
          Confirmar contraseña
          <input
            className={styles.control}
            type="password"
            name="confirmarPassword"
            value={formulario.confirmarPassword}
            onChange={manejarCambio}
            minLength={8}
            autoComplete="new-password"
            required
          />
        </label>

        <button
          className="button primary"
          type="submit"
          disabled={cargando}
        >
          {cargando ? "Registrando..." : "Registrarme"}
        </button>
      </form>

      <p>
        <Link to="/">Volver al inicio</Link>
      </p>
    </section>
  );
}