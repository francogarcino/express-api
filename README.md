# 📲 API - Taller de Deploy
Repositorio con una pequeña API para deployear en [Vercel](https://vercel.com) durante el taller.

### La API cuenta con los siguientes endpoints:

| Metodo | Path                     | Contenido                                              |
|--------|--------------------------|--------------------------------------------------------|
| `GET`  | `/`                      | Muestra un mensaje default                             |
| `POST` | `/descubrir/:nombre`     | Persiste un espiritu con el `nombre` dado              |
| `GET`  | `/espiritus`             | Muestra todos los espiritus registrados de momento     |

### 🛜 Objetivo del taller

El objetivo del taller es deployear esta API en Vercel y tener una experiencia respecto a como hacerlo. 

### ⚠️ Consideraciones durante el taller

Además de este repositorio, necesitaremos una base remota de MongoDB la cual generaremos desde [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database)

A fines practicos del TP (y en contra de lo que es la seguridad de la base de datos), en la base remota deberemos:

- Crear un usuario `root` con contraseña `root`
- Habilitar el acceso a la red con una IP `0.0.0.0/0` (es decir, cualquier IP)

Eventualmente (lo veremos durante el taller) tendremos que tener en cuenta una variable de entorno nombrada `MONGODB_URI`
