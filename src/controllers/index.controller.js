const controller = {}

// Renderiza x archivo s/ la ruta
controller.index = (req, res) => { 
    res.render("inicio") //Ej : Renderiza inicio.ejs en la ruta raiz
}

controller.crear = (req, res) => {
    res.render('crearTaller')
}
controller.creado = (req, res) => {
    res.render('created')
}

controller.editado = (req, res) => {
    res.render('edited')
}

module.exports = controller