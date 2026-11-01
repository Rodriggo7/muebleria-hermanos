import "dotenv/config";
import mongoose from "mongoose";
import Product from "../models/Product.js";

const productos = [
  {
    nombre: "Aparador Uspallata",
    descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón.",
    materiales: "Nogal macizo FSC®, herrajes de latón",
    precio: 1250000,
    stock: 5,
    categoria: "Almacenamiento",
    imagen: "/images/productos/aparador-uspallata.png",
  },
  {
    nombre: "Biblioteca Recoleta",
    descripcion: "Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro.",
    materiales: "Acero Sage Green y roble",
    precio: 980000,
    stock: 5,
    categoria: "Almacenamiento",
    imagen: "/images/productos/biblioteca-recoleta.png",
  },
  {
    nombre: "Butaca Mendoza",
    descripcion: "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú.",
    materiales: "Guatambú macizo y tela bouclée",
    precio: 890000,
    stock: 5,
    categoria: "Asientos",
    imagen: "/images/productos/butaca-mendoza.png",
  },
  {
    nombre: "Sillón Copacabana",
    descripcion: "Sillón lounge en cuero cognac con base giratoria.",
    materiales: "Estructura de acero y cuero premium",
    precio: 1450000,
    stock: 5,
    categoria: "Asientos",
    imagen: "/images/productos/sillon-copacabana.png",
  },
  {
    nombre: "Mesa de Centro Araucaria",
    descripcion: "Mesa de centro con sobre circular de mármol Patagonia y base de nogal.",
    materiales: "Mármol Patagonia y nogal",
    precio: 650000,
    stock: 5,
    categoria: "Mesas",
    imagen: "/images/productos/mesa-centro-araucaria.png",
  },
  {
    nombre: "Mesa de Noche Aconcagua",
    descripcion: "Mesa de noche con cajón oculto y repisa inferior.",
    materiales: "Roble macizo FSC®",
    precio: 390000,
    stock: 5,
    categoria: "Dormitorio",
    imagen: "/images/productos/mesa-noche-aconcagua.png",
  },
  {
    nombre: "Sofá Patagonia",
    descripcion: "Sofá de tres cuerpos tapizado en lino Warm Alabaster.",
    materiales: "Madera de eucalipto y lino natural",
    precio: 2450000,
    stock: 5,
    categoria: "Asientos",
    imagen: "/images/productos/sofa-patagonia.png",
  },
  {
    nombre: "Mesa Comedor Pampa",
    descripcion: "Mesa extensible de roble macizo para 6 a 10 comensales.",
    materiales: "Roble macizo FSC®",
    precio: 1650000,
    stock: 5,
    categoria: "Comedor",
    imagen: "/images/productos/mesa-comedor-pampa.png",
  },
  {
    nombre: "Sillas Córdoba",
    descripcion: "Set de cuatro sillas apilables en contrachapado moldeado de nogal.",
    materiales: "Contrachapado de nogal y acero",
    precio: 1100000,
    stock: 5,
    categoria: "Asientos",
    imagen: "/images/productos/sillas-cordoba.png",
  },
  {
    nombre: "Escritorio Costa",
    descripcion: "Escritorio compacto con cajón organizado y tapa pasacables integrada.",
    materiales: "Bambú laminado y herrajes ocultos",
    precio: 890000,
    stock: 5,
    categoria: "Oficina",
    imagen: "/images/productos/escritorio-costa.png",
  },
  {
    nombre: "Silla de Trabajo Belgrano",
    descripcion: "Silla ergonómica regulable en altura con respaldo de malla transpirable.",
    materiales: "Malla técnica y tejido reciclado",
    precio: 620000,
    stock: 5,
    categoria: "Oficina",
    imagen: "/images/productos/silla-trabajo-belgrano.png",
  },
];

async function cargarProductos() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("No se encontró MONGODB_URI en el archivo .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    const existentes = await Product.countDocuments();

    if (existentes > 0) {
      console.log(`La base de datos ya contiene ${existentes} productos.`);
      console.log("No se insertó ni modificó ningún registro.");
      return;
    }

    const insertados = await Product.insertMany(productos);

    console.log(`Carga completada: ${insertados.length} productos insertados.`);
    insertados.forEach((producto) => {
      console.log(`- ${producto.nombre}`);
    });
  } catch (error) {
    console.error("Error al cargar los productos:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

cargarProductos();
