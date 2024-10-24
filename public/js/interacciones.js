document.addEventListener('DOMContentLoaded', () => {
    // Obtener la ruta para aplicar la lógica específica
    const path = window.location.pathname;

    if (path === "/validar" || "created") {
        // Interacciones de la Página profesor.ejs
        let alumnos = document.getElementsByClassName("btn-taller");
        let btnAdd = document.getElementById("addTaller");
        let btnEdit = document.getElementById("editTaller");
        let btnDel = document.getElementById("delTaller");

        for (let i = 0; i < alumnos.length; i++) {
            alumnos[i].addEventListener('click', function verAlumnos() {
                const btnValue = alumnos[i].value;
                window.location.href = `/inscriptos?nroTaller=${btnValue}`;
            }, false);
        }

        btnAdd.addEventListener('click', function () {
            gestionTalleres("add");
        });
        btnEdit.addEventListener('click', function () {
            gestionTalleres("edit");
        });
        btnDel.addEventListener('click', function () {
            gestionTalleres("del");
        });

        function gestionTalleres(acc) {
            switch (acc) {
                case "add":
                    window.location.href = "/crearTaller";
                    break;
                case "edit":
                    window.location.href = "/editarTaller";
                    break;
                case "del":
                    window.location.href = "/eliminarTaller";
                    break;
            }
        }
    } 
});
