# Fortex Test

Este es un proyecto [Next.js](https://nextjs.org) creado con [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Introducción

Fortex Test es una aplicación frontend construida con Next.js y diseñada con una arquitectura cebolla, donde los datos son el núcleo del aplicativo. Se enfocó en probar un CRUD completo con un flujo bien definido para la gestión de tipos y productos.

## Tecnologías utilizadas

- **Next.js** - Framework para React con capacidades de SSR y SSG
- **MUI (Material UI)** - Librería de componentes UI
- **Redux** - Manejo de estado global
- **Axios** - Cliente HTTP para la comunicación con el backend
- **NextAuth (inicialmente)** - Manejo de autenticación (sustituido por AuthProvider debido a problemas con los tokens)
- **CSS Modules** - Sistema de estilos para mantener variables globales y facilitar cambios dinámicos

## Instalación y ejecución

Para correr el servidor de desarrollo:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

```env
   [NEXT_PUBLIC_API_BASE_URL=https://ec2-3-15-11-112.us-east-2.compute.amazonaws.com:8080/
   ```

Luego, abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Arquitectura

Se optó por una **arquitectura cebolla**, asegurando la separación de capas. Esta arquitectura permite que los datos sean el núcleo de la aplicación, garantizando una estructura modular y escalable.

![Arquitectura](https://github.com/Dwan13/fortexTest/blob/main/Arquitectura.drawio.png)

En esta imagen se pueden observar las distintas capas:
1. **Dominio**: Contiene las capas de entidades y aplicación, con definición de interfaces para todo el sitio.
2. **Infraestructura**: Orquestador de datos, manejando su almacenamiento y recuperación.
3. **Aplicación**: Gestión del estado y lógica de negocio.
4. **Capa compartida**: Hooks, validaciones y librerías propias.

## Flujo de Datos

El flujo de datos se estructuró en dos frames principales:
- **Login**: Manejo de autenticación y validación de usuario.
- **Dashboard**: Permite la gestión de tipos y productos (listar, crear, actualizar y eliminar).

Se usaron layouts para mejorar la experiencia de usuario y hacer más intuitivo el cambio de visualización.

![Flujo de datos](https://github.com/Dwan13/fortexTest/blob/main/Flujo.drawio.png)

En la imagen se representa cómo el usuario interactúa con la aplicación a través de diferentes vistas, utilizando un sistema de layouts para facilitar la navegación y la gestión eficiente de la información.

## Modelo Entidad-Relación

Se definió un modelo estructurado para gestionar las relaciones entre usuarios, tipos y productos.

![Modelo ER](https://github.com/Dwan13/fortexTest/blob/main/ER.png)

En la imagen se puede observar cómo las entidades interactúan entre sí, permitiendo una correcta estructuración de los datos dentro del sistema.

## Sistema de diseño y UI

Se aprovechó **Material UI** al máximo para la implementación de:
- Botones
- Selectores
- Tablas
- Drawers

Se definió un sistema modular de estilos con **CSS Modules**, lo que permite mantener una estructura clara y un control eficiente del diseño global.

## Manejo de Estado

Se implementó **Redux** inicialmente para gestionar el login y la persistencia del usuario en la sesión.

## Autenticación

Se intentó usar **NextAuth**, pero debido a problemas con los tokens del backend, se optó por **Axios con un AuthProvider** para gestionar la sesión de usuario de manera manual.

## Rutas

Se estructuraron las rutas con un índice principal que guía el flujo del aplicativo tras el login.

## Componentes

Se definió un layout compuesto por:
- **Header**
- **Base Contenedor**
- **Sidebar**

En los componentes `DashboardPage` y `LoginForm`, se dejaron instrucciones para descomentar código y conectar con la base de datos una vez se resuelvan los problemas con SSL.

## Mejoras y escalabilidad

### Posibles mejoras:
- Reducir la dependencia de **MUI**, optimizando vendors.
- Refinar el sistema de diseño para priorizar clases y mejorar la estructura de estilos.
- Implementar un sistema de **themes** para gestionar la visualización de tipos y productos.
- Enfatizar el rol de **admin**, permitiendo la gestión avanzada de usuarios.
- Desplegar una landing page dinámica para mejorar la experiencia de usuario.

### Desafíos actuales:
Se encontraron problemas con los certificados SSL en AWS, lo que impide el acceso completo al backend. Actualmente, el backend está desplegado, pero sin registro funcional hasta resolver estos problemas.

**Usuarios mock para pruebas:**
```json
[
  { "username": "admin", "password": "Secure_456", "isAdmin": true },
  { "username": "user", "password": "password", "isAdmin": false }
]
```

## Despliegue

- **Frontend:** Se desplegó en **Vercel** debido a la complejidad de desplegar Next.js en AWS S3.
  - [Fortex Test en Vercel](https://fortex-test.vercel.app/)
- **Backend:** Está disponible en el siguiente repositorio:
  - [BackFortex en GitHub](https://github.com/Dwan13/backFortex/blob/main/README.md)

---

_Desarrollado por [Tu Nombre]_

