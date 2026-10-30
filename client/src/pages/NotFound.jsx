import { Link } from "react-router-dom";
export default function NotFound() { return <section className="container section"><h1>Página no encontrada</h1><p>La dirección que buscás no está disponible.</p><Link to="/">Volver al inicio</Link></section>; }
