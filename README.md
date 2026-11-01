# Mueblería Hermanos Jota

Aplicación web de una mueblería desarrollada con React, Node.js, Express y MongoDB. Permite explorar un catálogo de muebles, consultar sus características, gestionar productos, registrarse y enviar consultas mediante un formulario de contacto.

## Integrantes

- Mateo Polci
- Rodrigo Rivera
- Maximiliano Lopez
- Pablo Francisco Romero
- Pamela Lucia Mena

## Tecnologías utilizadas

**Frontend**
- React 19
- Vite 8
- React Router DOM
- JavaScript
- CSS Modules
- Fetch API

**Backend**
- Node.js
- Express 5
- MongoDB
- Mongoose
- bcryptjs
- dotenv
- CORS

## Requisitos previos

- Node.js 22.13 o superior (también compatible con Node.js 20.19 o superior, según los requisitos de Vite 8).
- npm.
- MongoDB local o una instancia remota.

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Rodriggo7/muebleria-hermanos.git
cd muebleria-hermanos
```

Instalar las dependencias del backend:

```bash
cd backend
npm install
```

Instalar las dependencias del frontend:

```bash
cd ../client
npm install
```

## Configuración del entorno

### Backend

Crear un archivo `.env` dentro de `backend`, tomando como referencia `backend/.env.example`.

Configurar las siguientes variables:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/muebleria-hermanos
CLIENT_ORIGIN=http://localhost:5173
```

`MONGODB_URI` debe apuntar a una instancia de MongoDB disponible.

### Frontend

Crear un archivo `.env` dentro de `client`, tomando como referencia `client/.env.example`.

Configurar:

```env
VITE_API_URL=http://localhost:3000
```

La variable indica la dirección de la API que utilizará el frontend.

## Carga inicial del catálogo

El proyecto incluye un script para cargar los 11 productos iniciales en MongoDB.

Con MongoDB en funcionamiento y el archivo `backend/.env` configurado, ejecutar desde la carpeta `backend`:

```bash
node scripts/seedProductos.js
```

El script evita duplicar la carga si ya existen productos en la colección.

Las imágenes del catálogo están incluidas en `client/public/images/productos`, por lo que forman parte del repositorio.

## Ejecución

Se necesitan dos terminales.

**Terminal 1: backend**

```bash
cd backend
npm run dev
```

La API estará disponible en:

`http://localhost:3000`

**Terminal 2: frontend**

```bash
cd client
npm run dev
```

La aplicación estará disponible en:

`http://localhost:5173`

## Funcionalidades

### Catálogo y navegación
- Página de inicio.
- Catálogo de muebles conectado a la API.
- Visualización del detalle de cada producto.
- Navegación mediante React Router DOM.
- Carrito de compras compartido entre las páginas.

### Administración de productos
- Listado de productos.
- Alta de nuevos productos.
- Edición de productos existentes.
- Eliminación lógica de productos.

### Registro de usuarios
- Formulario de registro.
- Validación de los datos ingresados.
- Verificación de correos duplicados.
- Cifrado de contraseñas mediante bcryptjs.

### Contacto
- Formulario con validación de datos.
- Envío de consultas al backend.
- Almacenamiento de mensajes en MongoDB.
- Confirmación visual de recepción y mensajes de error.

## API

Principales endpoints disponibles:

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/health` | Verificar el estado de la API |
| GET | `/api/productos` | Obtener el catálogo |
| GET | `/api/productos/:id` | Obtener un producto por ID |
| POST | `/api/usuarios/registro` | Registrar un usuario |
| POST | `/api/contacto` | Registrar un mensaje de contacto |

La API de productos también permite las operaciones de administración correspondientes a la creación, actualización y eliminación de productos.

## Arquitectura del proyecto

### Frontend

- `client/src/App.jsx`: configura las rutas y la estructura general de la aplicación.
- `client/src/pages/`: contiene las páginas.
- `client/src/components/`: contiene componentes reutilizables.
- `client/src/services/`: centraliza las solicitudes HTTP.
- `client/src/hooks/`: contiene hooks personalizados.
- `client/src/styles/`: contiene los estilos globales y compartidos.

### Backend

El backend organiza las responsabilidades en capas:

- `models/`: esquemas de Mongoose.
- `repositories/`: acceso a los datos.
- `services/`: lógica de negocio y validaciones.
- `controllers/`: manejo de solicitudes y respuestas HTTP.
- `routes/`: definición de endpoints.
- `middleware/`: middlewares de la aplicación.
- `config/`: configuración de la conexión a MongoDB.
- `scripts/`: scripts auxiliares, incluida la carga inicial de productos.

## Scripts disponibles

**Frontend**

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

**Backend**

```bash
npm run dev
npm start
```

## Despliegue

Los enlaces públicos de frontend y backend se incorporarán una vez realizados y verificados los despliegues.

## Consideraciones

- No subir archivos `.env` ni credenciales al repositorio.
- Mantener los archivos `.env.example` actualizados.
- Las imágenes de los productos deben permanecer dentro de `client/public/images/productos`.
- La aplicación utiliza MongoDB para almacenar productos, usuarios y mensajes de contacto.
