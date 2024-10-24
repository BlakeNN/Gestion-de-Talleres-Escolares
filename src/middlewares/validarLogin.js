//MiddleWare para Validar el Login

function validarLogin(req, res, next) {
    const {user, pass} = req.body;
    if (!user || !pass) {
        return res.status(400).send("El Usuario/Contraseña no puede estar vacío")
    }
    console.log("Login validado")
    next();
}

module.exports = validarLogin;