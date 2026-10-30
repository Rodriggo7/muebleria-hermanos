import { useState } from "react";
import styles from "./Contacto.module.css";

export default function Contacto() {
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  function enviar(event) {
    event.preventDefault();
    const datos = new FormData(event.currentTarget);
    const nombre = String(datos.get("nombre") || "").trim();
    const email = String(datos.get("email") || "").trim();
    const mensaje = String(datos.get("mensaje") || "").trim();
    if (!nombre || !email || !mensaje) { setError("Completá todos los campos para continuar."); return; }
    setError(""); setEnviado(true); event.currentTarget.reset();
  }
  return <section className={`container ${styles.page}`}><h1>Contacto</h1><p>¿Tenés una consulta? Escribinos y te responderemos a la brevedad.</p>{enviado && <p role="status">El formulario pasó la validación. El backend todavía no ofrece un endpoint para recibir mensajes.</p>}{error && <p role="alert">{error}</p>}<form className={styles.form} onSubmit={enviar}>
    <label className={styles.field}>Nombre<input className={styles.control} name="nombre" autoComplete="name" required minLength="2" /></label>
    <label className={styles.field}>Correo electrónico<input className={styles.control} type="email" name="email" autoComplete="email" required /></label>
    <label className={styles.field}>Mensaje<textarea className={styles.control} name="mensaje" rows="6" required minLength="10" /></label>
    <button className="button primary" type="submit">Enviar mensaje</button>
  </form></section>;
}
