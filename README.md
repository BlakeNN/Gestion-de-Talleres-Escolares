# Gestion de Talleres Escolares - Version 1.0
Proyecto de Fin de Año - Tec. Sup. en Desarrollo de Apps y Páginas Web - Instituto Superior Espiritu Santo - 0405 - Posadas, Misiones, Argentina  
Creado por: Reinert Lucas Iván (BlakeNN) - 1er Año  
**Cualquier recomendacion/mejora que me quieran decir es bienvenida**

## Indice
1. [Introduccion](#Introduccion)
2. [Caracteristicas](#Caracteristicas)
3. [Instalacion](#Instalacion)
4. [Licencia](#Licencia)


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
Ver los Alumnos inscriptos a los Talleres, **Crear** nuevos Talleres, **Editar** los ya existentes y **Eliminarlos**

## Instalacion
- Instala NodeJS
- Inicializa el Proyecto  
  ```bash
  npm init
- Instala los Modulos Necesarios  
  ```bash
  npm i express express-session mysql dotenv bcrypt
- Importa la Base de Datos de la Carpeta "DB" y colocale el nombre que desees
- Configura las Variables de Entorno:  
```bash
  DB_HOST='localhost'
  DB_USER='root'
  DB_PASS=
  DB_NAME='isesTalleres'
  PORT=3000
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
Si presionas Ctrl + Click sobre la Segunda linea, abriras tu navegador y deberías de ver esta Pagina:  
![Login-Img](https://github.com/BlakeNN/Gestion-de-Talleres-Escolares/blob/c6241525745d4c061412f20e9bc8912e11d0f4b6/login.png)

## Licencia
El presente proyecto está bajo la Licencia del MIT (https://opensource.org/licenses/MIT).
