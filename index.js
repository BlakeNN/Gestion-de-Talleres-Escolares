//Dependencias (MySQL, Express, Path)
const express = require("express");
const mySql = require("mysql");
const path = require("path");
require('dotenv').config();
const session = require('express-session');
const bcrypt = require('bcrypt');
//Importar MiddleWares
const validarLogin = require("./src/middlewares/validarLogin");
const validarTogglePass = require("./src/middlewares/validarTogglePass");
const { env } = require("process");

// Conexion a la Base de Datos : isesTalleres
let conn = mySql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
// Prueba de Conexion
conn.connect(function (err) {
    if(err) {
        throw err;
    } else {
        console.log("Conexion Exitosa a la BD");
    }
}); 
const app = express(); //Declarando la App

// Configuración de la sesión
app.use(session({
    secret: '1234', //Clave con la que se Encripta la Cookie de Session
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // False para HTTP - True para HTTPS
}));
app.set("view engine", "ejs"); //EJS como motor de Vistas/Views
app.use(express.json());
app.use(express.urlencoded({extended:false})); // Obtener datos del HTML
app.use(require('./src/routes/index.routes')) //Import del Enrutador y Controladores

//Consultas Recurrentes a la Base de Datos
async function renderProf(req, res, idUser) {
    try {
        const tallerData = 'SELECT id_taller, taller, DATE_FORMAT(fecha, "%d/%m/%Y") AS fecha, hora FROM talleres WHERE id_user = ?';
        conn.query(tallerData, [idUser], (err, resData) => { //Extraer Datos de los Talleres
            // Renderizar '/profesor' con sus talleres y nombre
            res.render('profesor', { talleres: resData, nombre: req.session.user });
            });
    } catch (error) {
        console.log("Error en la consulta de talleres");
        throw error;
    }
}
async function renderAlmn(req, res, curso, carrera) {
    try {
        const talleresDisp = 'SELECT id_taller, taller, DATE_FORMAT(fecha, "%d/%m/%Y") AS fecha, hora FROM talleres WHERE cursoTaller = ? AND carreraTaller = ?'; 
        const tallerData = 'SELECT t.id_taller, t.taller, DATE_FORMAT(t.fecha, "%d/%m/%Y") AS fecha, t.hora FROM inscripciones i JOIN talleres t ON i.id_taller = t.id_taller WHERE i.id_user = ?';
        conn.query(tallerData, [req.session.userId], (err, resData) => {
            const tallerInsc = resData.map(taller => taller.id_taller);
            conn.query(talleresDisp, [curso, carrera], (err, resDisp) => {
                const tallerRender = resDisp.filter(taller => !tallerInsc.includes(taller.id_taller));
                // Renderiza la página con los talleres a los que se ha inscripto el usuario y los talleres disponibles
                res.render('alumno', { talleresAnotado: resData, talleresDisp: tallerRender, nombre: req.session.user });
            })
        });
    } catch (error) {
        console.log("Error en la consulta de talleres");
        throw error;
    }
}
function tallerData(nroTaller, callback) { //Funcion con Parametro y CallBack(err, res)
    const talleresData = 'SELECT id_taller, taller, DATE_FORMAT(fecha, "%d/%m/%Y") AS fecha, hora, carreraTaller, cursoTaller FROM talleres WHERE id_taller = ?';
    conn.query(talleresData, [nroTaller], (err, resData) => {
        if (err) {
            return callback(err, null);
        }
        //Obtener datos de los Talleres
        return callback(null, resData);
    });
}
app.post("/validar", validarLogin, function(req, res) {
    const { user, pass } = req.body;
    req.session.user = user;
    //Corroborar si el usuario existe
    const datosUser = 'SELECT id_user, password, role, curso, carrera, firstLog FROM users WHERE user = ?';
        conn.query(datosUser, [user], (err, resUser) => {
        if (err) { 
            console.log("Error en el servidor");
            return res.status(500).send("Error en el servidor");
        } else if (resUser.length === 0) { 
            console.log("Usuario o contraseña incorrectos");
            return res.status(401).send("Credenciales incorrectas");
        }
        //Comparar Password
        const userData = resUser[0];
        bcrypt.compare(pass, userData.password, (err, isMatch) => {
            if (err) { 
                console.log("Error al verificar la contraseña");
                return res.status(500).send("Error en el servidor");
            } else if (!isMatch) { 
                console.log("Usuario o contraseña incorrectos");
                return res.status(401).send("Credenciales incorrectas");
            } else if (userData.firstLog === 1) {
                console.log("Primer inicio de sesión detectado");
                return res.render('togglePassword', { user: user });
            }

            // Configurar sesión con userData
            req.session.userId = userData.id_user;
            req.session.rol = userData.role;
            req.session.carrera = userData.carrera;
            req.session.curso = userData.curso;

            // Redirigir s/ rol
            if (req.session.rol === "prof") {
                console.log("Inicio de sesión como Profesor");
                return renderProf(req, res, req.session.userId);
            } else if (req.session.rol === "almn") {
                console.log("Inicio de sesión como Alumno");
                return renderAlmn(req, res, req.session.curso, req.session.carrera);
            } else {
                console.log("Error al verificar el rol");
                return res.status(500).send("Error verificando el rol");
            }
        });
    });
});

app.post("/togglePassword", validarTogglePass, function(req, res){ //Funcion de Cambio de Password
    //Sentencia SQL y Obtencion de Datos
    const togglePass = 'UPDATE users SET password = ?, firstLog = false WHERE user = ?';
    const newPass = req.body.pass;
    const user = req.body.user;
    //Consulta de Cambio de Password
    bcrypt.hash(newPass, 10, (err, hash) => {
        if(err) {
            return res.status(500).send('Error al hashear la contraseña');
        }
        conn.query(togglePass, [hash, user], (err, resNewPass)=> {
            if(err) {
                console.log("Error");
                // Devolver Errores y frenar ejecucion
                return res.status(500).send('Error al actualizar la contraseña');
            } else {
                console.log("Contraseña actualizada con Éxito");
                return res.render('inicio');
            }
        });
    });
});

app.get("/profesor", function (req, res) {
    renderProf(req, res, req.session.userId);
})

app.get("/alumno", function (req, res) {     
    renderAlmn(req, res, req.session.curso, req.session.carrera);
});

//Interacciones del Alumno
app.get("/inscForm", function(req, res) {
    let nroTaller = req.query.taller;
    tallerData(nroTaller, (err, resData) => {
        if (err) {
            console.log("Error en la consulta de talleres");
            return res.status(500).send("Error en el servidor");
        } else {
            //Mostrar el Form de Inscripcion
            res.render('inscForm', { tallerData: resData });
        }
    });
});

app.post("/insc", function (req, res) {
    const cargarDatos = 'INSERT INTO inscripciones (id_user, id_taller) VALUES (?, ?)';
    const validarInsc = 'SELECT cursoTaller, carreraTaller FROM talleres WHERE id_taller = ?'
    const datos = req.body;
    const userId = req.session.userId;
    const taller = datos.tallerId;
    //Validar Inscripcion del Alumno
    conn.query(validarInsc, [taller], (err, resValidar) => {
        let carrera = resValidar[0].carreraTaller;
        let curso = resValidar[0].cursoTaller;
        if (carrera === req.session.carrera && curso === req.session.curso) {
            conn.query(cargarDatos, [userId, taller], (err, resCargar) => {
                if (err) {
                    console.log("Error cargando datos");
                    console.log(err)
                    return res.status(500).send("Error en el servidor");
                } else {
                    console.log("Inscripcion Hecha")
                    res.redirect('alumno');
                }
            });
        } else {
            console.log("Credenciales no Validas para anotarse al Taller")
        }
    });
});

//Interacciones del Profesor
app.get("/inscriptos", function (req, res) {
    const inscriptos = 'SELECT u.user, u.curso FROM inscripciones i JOIN users u ON i.id_user = u.id_user WHERE i.id_taller = ?';
    const nombreTaller = 'SELECT taller FROM talleres WHERE id_taller = ?';
    const nroTaller = req.query.nroTaller;
    conn.query(inscriptos, [nroTaller], (err, resInsc) => {
        if (err) {
            console.log("Error al obtener los inscriptos: ", err);
            return res.status(500).send("Error en el servidor");
        } else if (resInsc.length === 0) {
            console.log("No hay inscriptos para este taller.");
            return res.status(404).send("No hay inscriptos para este taller.");
        }
        conn.query(nombreTaller, [nroTaller], (err, resName) => {
            const nombre = resName[0].taller;
            // Renderizar la página de inscriptos con los datos obtenidos
            res.render('inscriptos', { insc: resInsc, nameTaller: nombre });
        });
    });
});

app.post("/created", function (req, res) {
    const tallerData = 'SELECT id_taller, taller, DATE_FORMAT(fecha, "%d/%m/%Y") AS fecha, hora FROM talleres WHERE id_user = ?';
    const crearTaller = 'INSERT INTO talleres (taller, id_user, cursoTaller, carreraTaller, fecha, hora) VALUES (?, ?, ?, ?, ?, ?)';
    const { nombre, carrera, curso, fecha, hora } = req.body;
    conn.query(crearTaller, [nombre, req.session.userId, curso, carrera, fecha, hora], (err, resCreate) => {
        if (err) {
            console.log("Error en la consulta de talleres");
            return res.status(500).send("Error en el servidor");
        } else {
            res.redirect('profesor');
        }
    })
});

app.get('/editarTaller', function(req, res) { //Renderizar Talleres a Editar
    const mostrarTalleres = 'SELECT id_taller, taller FROM talleres WHERE id_user = ?';
    conn.query(mostrarTalleres, [req.session.userId], (err, resShow) => {
        if (err) {
            console.log("Error en la consulta de talleres");
            return res.status(500).send("Error en el servidor");
        } else {
            if (resShow.length === 0) {
                console.log("No hay talleres creados.");
                return res.status(404).send("No hay talleres creados.");
            } else {
                res.render('editarTaller', { talleres: resShow, nombre: req.session.user })
            }
        }
    });
});

app.get('/edit', function(req, res) { //Renderizar Formulario de Edicion s/ taller elegido
    const fecha = 'SELECT fecha FROM talleres WHERE id_taller = ?'
    let nroTaller = req.query.taller;
    tallerData(nroTaller, (err, resData) => {
        if (err) {
            console.log("Error en la consulta de talleres");
            return res.status(500).send("Error en el servidor");
        } else {
            conn.query(fecha, [nroTaller], (err, resFecha) => {
                res.render('edit', { tallerData: resData, fecha: resFecha});
            })
        }
    });
});

app.post('/edited', function(req, res) { //Obtener y Actualizar Datos
    const editarTaller = 'UPDATE talleres SET taller = ?, cursoTaller = ?, carreraTaller = ?, fecha = ?, hora = ? WHERE id_taller = ?'
    const tallerData = 'SELECT taller, DATE_FORMAT(fecha, "%d/%m/%Y") AS fecha, hora FROM talleres WHERE id_user = ?';
    let nroTaller = req.query.taller;
    const { nombre, carrera, curso, fecha, hora } = req.body;
    conn.query(editarTaller, [nombre, curso, carrera, fecha, hora, nroTaller], (err, resEdit) => {
        if (err) {
            console.log("Error en la consulta de talleres");
            return res.status(500).send("Error en el servidor");
        } else {
            conn.query(tallerData, [req.session.userId], (err, resData) => {
                if (err) {
                    console.log("Error en la consulta de talleres");
                    return res.status(500).send("Error en el servidor");
                } else {
                    // Redireccionar a /profesor
                    res.redirect('profesor');
                }
            });
        }
    });
});

app.get('/eliminarTaller', function(req, res) { //Renderizar Talleres a Eliminar
    const mostrarTalleres = 'SELECT id_taller, taller FROM talleres WHERE id_user = ?';
    conn.query(mostrarTalleres, [req.session.userId], (err, resShow) => {
        if (err) {
            console.log("Error en la consulta de talleres");
            return res.status(500).send("Error en el servidor");
        } else {
            if (resShow.length === 0) {
                console.log("No hay talleres creados.");
                return res.status(404).send("No hay talleres creados.");
            } else {
                res.render('eliminarTaller', { talleres: resShow, nombre: req.session.user })
            }
        }
    });
});

app.get('/delete', function (req, res) { //Eliminar Talleres
    const mostrarTalleres = 'SELECT id_taller, taller FROM talleres WHERE id_user = ?';
    const delTaller = 'DELETE FROM talleres WHERE id_taller = ?';
    let nroTaller = req.query.taller;
    conn.query(delTaller, [nroTaller], (err, resDelete) => {
        if (err) {
            console.log("Error en la consulta de talleres");
            return res.status(500).send("Error en el servidor");
        } else {
            console.log("Eliminado")
            res.redirect('eliminarTaller');
        }
    });
});
//Iniciar Sevidor en el Puerto 3000
const port = process.env.PORT
app.use(express.static(path.join(__dirname, 'public'))); //Declaraccion de ruta para recursos estaticos [carpeta '/public']
app.listen(port, function() { //Montando el Servidor en el puerto 3000
    console.log(`Servidor Escuchando el Puerto ${port}\nhttp://localhost:${port}`);
});