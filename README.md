# Gestion de Talleres Escolares - Version 1.0
Proyecto de Fin de Año - Tec. Sup. en Desarrollo de Apps y Páginas Web - Instituto Superior Espiritu Santo - 0405  
Posadas, Misiones, Argentina  
Creado por: Reinert Lucas Iván (BlakeNN) - 1er Año  
**Cualquier recomendacion/mejora que me quieran decir es bienvenida**

## Indice
1. [Introduccion](#Introduccion)
2. [Caracteristicas](#Caracteristicas)
3. [Instalacion](#Instalacion)
4. [Guia de Uso](#Uso)

## Introduccion
El siguiente es mi proyecto de fin de año para la Tec. en Apps y Pags Web del ISES.
Para elaborarlo use las siguientes tecnologias:
### Fron-End
- HTML5 y CSS3 (Maquetado y Estilos)
- EJS 3.1.10 (View Engine)
- JavaScript (Animaciones / Interacciones Simples)
### Back-End
- NodeJS
- Express - Express-Session (BackEnd y Manejo de Sesiones)
- MySQL (Base de Datos)
- Bcrypt (Hasheo de Contraseñas)
- DotEnv (Variables de Entorno)

## Caracteristicas
Esta Aplicacion Web esta diseñada para la **Creacion** y **Gestion** de Talleres de Apoyo Escolares
La misma permite:  
- Como **Alumno**:  
Ver y Anotarse a los Talleres disponibles.
- Como **Profesor**:  
Ver los Alumnos inscriptos a los Talleres, Crear nuevos Talleres, Editar los ya existentes y Eliminarlos

## Instalacion
- Instala NodeJS desde su Web Oficial
  ```bash
  https://nodejs.org/en/
- Descarga los archivos del Repositorio y Descomprimelos en una carpeta
- Abre una consola en la ruta de la carpeta donde tienes la aplicacion
- Instala los Modulos Necesarios  
  ```bash
  npm i express express-session ejs mysql dotenv bcrypt
- Importa la Base de Datos de la Carpeta "DB" y colocale el nombre que desees (Recuerda cambiarlo en tus variables de Entorno)
- Crea un archivo .env en la raiz del proyecto y configura las Variables de Entorno:  
```bash
  DB_HOST='localhost'
  DB_USER='root'
  DB_PASS=
  DB_NAME='isesTalleres' #Nombre de la base de datos
  PORT=3000 #Si el puerto esta ocupado cambialo aquí
```
- Inicia la Base de Datos y Ejecuta el Archivo index.js  
```bash
  node index.js
```
- Si todo esta en orden, deberias ver esto en tu consola:
```bash
  Servidor Escuchando el Puerto 3000
  http://localhost:3000
  Conexion Exitosa a la BD
```
- Para visualizarlo desde el Celular/Tablet u otro Dispositivo:
  - Conectado a la misma red.
  - Obten tu IPv4 EJ: 192.168.X.X
  - En el navegador del dispositivo escribe: 192.168.X.X:3000
  - El :3000 es el puerto en el que esta la App, si lo cambiaste a otro, pon ese otro.
Si presionas Ctrl + Click sobre la Segunda linea, abriras tu navegador y deberías de ver esta Pagina:  
![Login-Img](https://github.com/BlakeNN/Gestion-de-Talleres-Escolares/blob/c6241525745d4c061412f20e9bc8912e11d0f4b6/login.png)

## Uso
Despues de Instalar todo e Iniciar el programa verás el formulario de LogIn.
Algunos de los Usuarios validos (Se pueden ver en el archivo de la base de datos) con sus Contraseñas son:
 -  Juan Carlos Perez: Profesor, Contraseña: 123
 -  Juan Carlos Gomez: Alumno, Contraseña: 123  
Estos son dos usuarios que tienen varios datos cargados y permiten ver mejor la aplicacion, pero los otros tambien funcionan.  
**Nota**: Las contraseñas en la Base de Datos estan hasheadas, pero son **TODAS** la misma (123).
