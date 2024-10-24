# Gestion de Talleres Escolares - Version 1.0
Proyecto de Fin de Año - Tec. Sup. en Desarrollo de Apps y Páginas Web - Instituto Superior Espiritu Santo - 0405 - Posadas, Misiones, Argentina
Creado por: Reinert Lucas Iván (BlakeNN) - 1er Año

## Indice
1. [Introduccion](#Introduccion)  
  -[Front-End](#Fron-End)  
  -[Back-End](#Back-End)
2. [Instalacion](#Instalacion)

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
- 
## Instalacion
- Instala NodeJS
- Inicializa el Proyecto  
  ```bash
  npm init
- Instala los Modulos Necesarios  
  `npm i express express-session mysql dotenv bcrypt`
- Importa la Base de Datos de la Carpeta "DB" y colocale el nombre que desees
- Configura las Variables de Entorno:  
`DB_HOST='localhost'
DB_USER='root'
DB_PASS=
DB_NAME='isesTalleres'
PORT=3000`
- Inicia tu Base de Datos y Ejecuta el Archivo index.js  
`node index.js`
