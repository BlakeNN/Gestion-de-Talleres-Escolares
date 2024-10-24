// Middleware para Validar el Cambio de Pass

function validarTogglePass(req, res, next) {
    const {user, pass} = req.body;
    const regexEspecial = /[!@#$%^&*(),.?":{}|<>]/;
    if (pass.length < 8) {
        return res.status(400).send( "La contraseña debe tener mas de 8 caracteres")
    }
    if (!regexEspecial.test(pass)) {
        return res.status(400).send("La contraseña debe contener al menos un carácter especial")
    }
    console.log("TogglePass Validado - Pass Cambiada")
    next();
}

module.exports = validarTogglePass;