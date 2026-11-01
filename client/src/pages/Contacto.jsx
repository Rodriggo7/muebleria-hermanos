
import { useState } from "react";
import styles from "./Contacto.module.css";
import { enviarMensaje } from "../services/contactoService";

export default function Contacto() {
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviar(event) {
    event.preventDefault();

    const formulario = event.currentTarget;
    const datos = new FormData(formulario);

    const nombre = String(datos.get("nombre") || "").trim();
    const email = String(datos.get("email") || "").trim();
    const mensaje = String(datos.get("mensaje") || "").trim();

    if (!nombre || !email || !mensaje) {
      setError("Completá todos los campos para continuar.");
      return;
    }

    setError("");
    setEnviado(false);
    setEnviando(true);

    try {
      await enviarMensaje({ nombre, email, mensaje });

      setEnviado(true);
      formulario.reset();
    } catch (error) {
      setError(
        error.message || "No pudimos enviar tu mensaje. Intentá nuevamente."
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className={`container ${styles.page}`}>
      <h1>Contacto</h1>

      <p>
        ¿Tenés una consulta? Escribinos y te responderemos a la brevedad.
      </p>

      {enviado && (
        <div className={styles.successMessage} role="status">
          <span className={styles.successIcon} aria-hidden="true">
            ✓
          </span>

          <div>
            <strong>¡Recibimos tu mensaje!</strong>
            <p>
              Tu consulta fue registrada correctamente en Hermanos Jota.
            </p>
            <span>Nos pondremos en contacto con vos a la brevedad.</span>
          </div>
        </div>
      )}

      {error && (
        <div className={styles.errorMessage} role="alert">
          <strong>No pudimos enviar tu mensaje</strong>
          <p>{error}</p>
        </div>
      )}

      <form className={styles.form} onSubmit={enviar}>
        <label className={styles.field}>
          Nombre
          <input
            className={styles.control}
            name="nombre"
            autoComplete="name"
            required
            minLength="2"
            maxLength="80"
          />
        </label>

        <label className={styles.field}>
          Correo electrónico
          <input
            className={styles.control}
            type="email"
            name="email"
            autoComplete="email"
            required
            maxLength="120"
          />
        </label>

        <label className={styles.field}>
          Mensaje
          <textarea
            className={styles.control}
            name="mensaje"
            rows="6"
            required
            minLength="10"
            maxLength="2000"
          />
        </label>

        <button
          className="button primary"
          type="submit"
          disabled={enviando}
        >
          {enviando ? "Enviando..." : "Enviar mensaje"}
        </button>
      </form>
    </section>
  );
}
