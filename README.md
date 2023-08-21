# AppSistemaVentas - Aplicación Angular para Gestión de Ventas

AppSistemaVentas es una robusta aplicación de gestión de ventas desarrollada utilizando Angular 16, que interactúa con una [aplicación backend](https://github.com/AlexisleoMena/APISistemaVentas) construida en ASP.NET Core 7. Esta aplicación aprovecha la tecnología de contenedores Docker con Nginx como servidor web, y se integra con la autenticación basada en tokens JWT para garantizar una experiencia segura y confiable.

## Capturas de Pantalla

A continuación, se presentan capturas de pantalla que ofrecen una vista visual de las distintas características de la aplicación:

### Autenticación:

**Inicio de Sesión:**
![Inicio de sesion](https://i.ibb.co/9NcP2t2/Iniciar-sesion.jpg)

**Registro:**
![Registrarse](https://i.ibb.co/GHW5ZJx/Registrarse.jpg)

### Vistas Según el Rol de Usuario

**Vista de Empleado:**
![Vista-Empleado](https://i.ibb.co/nDxnRvf/Vista-Empleado.jpg)

**Vista de Supervisor:**
![Vista-Supervisor](https://i.ibb.co/rw3L5T9/Vista-Supervisor.jpg)

**Vista de Administrador:**
![Vista-Administrador](https://i.ibb.co/p0S0WGh/Vista-Administrador.jpg)

### Detalles de la Vista de Usuarios:

**Usuarios:**
![Usuarios](https://i.ibb.co/Bg8VGvD/Usuarios.jpg)

**Editar Usuario:**
![Editar-usuario](https://i.ibb.co/xCNTXMr/Editar-usuario.jpg)

**Eliminar Usuario:**
![Eliminar-usuario](https://i.ibb.co/qFt3WzC/Eliminar-usuario.jpg)

### Detalles de la Vista de Productos:

**Productos:**
![Productos](https://i.ibb.co/Rhpjb6n/Productos.jpg)

**Agregar Producto:**
![Agregar-producto](https://i.ibb.co/fXM44r4/Agregar-producto.jpg)

**Editar Producto:**
![Editar-producto](https://i.ibb.co/pQ7XLS3/Editar-producto.jpg)

**Eliminar Producto:**
![Eliminar-producto](https://i.ibb.co/ZgyZrK0/Eliminar-producto.jpg)

### Detalles de la Vista de Ventas:

**Ventas:**
![Ventas](https://i.ibb.co/FmxFC5H/Venta.jpg)

**Agregar Venta:**
![Agregar-venta](https://i.ibb.co/yh1bQdn/Agregar-venta.jpg)

**Venta Registrada:**
![Venta-registrada](https://i.ibb.co/DDZG1tw/Venta-registrada.jpg)

### Detalles de la Vista de Historial:

**Historial de Ventas:**
![Historial](https://i.ibb.co/XJgLRLn/Historial.jpg)

**Detalle de Venta en Historial:**
![Historial-detalle-venta](https://i.ibb.co/18rgBXc/Historial-detalle-venta.jpg)

**Historial de Ventas por Fecha:**
![Historial-ventas-por-fecha](https://i.ibb.co/0ck0vfp/Historial-ventas-por-fecha.jpg)

**Historial de Ventas por Número:**
![Historial-ventas-por-numero](https://i.ibb.co/M631M83/Historial-ventas-por-numero.jpg)

### Detalles de la Vista de Reportes:

**Reportes:**
![Reportes](https://i.ibb.co/SVHjKcP/Reportes.jpg)

**Generar Reporte según Fecha:**
![Reporte-generar-segun-fecha](https://i.ibb.co/LrZ1jn6/Reporte-generar-segun-fecha.jpg)

## Iniciar la Aplicación

Sigue estos pasos para ejecutar la aplicación en tu entorno local:

1. Instala las dependencias de la aplicación utilizando npm:
   ```bash
   npm install
   ```

2. Inicia la aplicación en modo de desarrollo:
   ```bash
   npm start
   ```

3. Abre tu navegador y accede a http://localhost:4200 para explorar la aplicación.

## Crear una Imagen y Ejecutar el Contenedor

Si deseas implementar la aplicación utilizando Docker, sigue estos pasos:

1. Asegúrate de tener Docker instalado en tu máquina.

2. Abre una terminal y navega hasta el directorio raíz del proyecto.

3. Crea la imagen de Docker:
   ```bash
   docker build --no-cache --progress=plain -t ang-app .
   ```

4. Inicia el contenedor creado:
   ```bash
   docker run -d -it -p 80:80/tcp ang-app
   ```

Con estos pasos, podrás ejecutar la aplicación AppSistemaVentas en un contenedor Docker, proporcionando una forma conveniente de desplegarla y gestionarla.
