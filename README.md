# 📲 API - Taller de Deploy
Repositorio con una pequeña API para deployear en [Vercel](https://vercel.com) durante el taller.

La API cuenta con los siguientes endpoints:

| Metodo |   Path                  |   contenido   
|--------|-------------------------|----------------
|`GET`   |`/`                      | Muestra un mensaje default
|`POST`  |`/registrar/:serialName` | Registra a un androide con el nombre `serialName` dado
|`GET`   |`/androides`             | Muestra todos los androides registrados de momento 
|`GET`   |`/serial/:serialName`    | Muestra al androide registrado bajo ese `serialName`

---

El objetivo del taller es deployear esta API en Vercel y tener una experiencia respecto a como hacerlo. 

Para ello, además de este repositorio, necesitaremos una base remota de MongoDB, la cual generaremos desde [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database)

---

Eventualmente (lo veremos durante el taller) tendremos que tener en cuenta una variable de entorno nombrada `MONGODB_URI`
