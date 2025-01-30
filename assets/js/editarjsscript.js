function actualizarVistaPrevia(event) {
    event.preventDefault();

    // Subir imagen de perfil
    var imagenInput = document.getElementById('imagen-input');
    if (imagenInput.files && imagenInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('foto-perfil').src = e.target.result;
        };
        reader.readAsDataURL(imagenInput.files[0]);
    }

    // Actualizar los datos de la cuenta
    var nombres = document.getElementById('nombres-input').value;
    var apellidos = document.getElementById('apellidos-input').value;
    var correo = document.getElementById('correo-input').value;
    var telefono = document.getElementById('telefono-input').value;
    var fechaNacimiento = document.getElementById('fecha-nacimiento-input').value;

    if (nombres) document.getElementById('preview-nombres').textContent = nombres;
    if (apellidos) document.getElementById('preview-apellidos').textContent = apellidos;
    if (correo) document.getElementById('preview-correo').textContent = correo;
    if (telefono) document.getElementById('preview-telefono').textContent = telefono;

    // Calcular y mostrar la edad
    if (fechaNacimiento) {
        var hoy = new Date();
        var nacimiento = new Date(fechaNacimiento);
        var edad = hoy.getFullYear() - nacimiento.getFullYear();
        var mes = hoy.getMonth() - nacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        document.getElementById('preview-fecha-nacimiento').textContent = fechaNacimiento;
        document.getElementById('preview-edad').textContent = edad;
    }

    // Actualizar el sexo
    var sexoHombre = document.querySelector('input[name="sexo"][value="hombre"]');
    var sexoMujer = document.querySelector('input[name="sexo"][value="mujer"]');
    if (sexoHombre.checked) {
        document.getElementById('preview-sexo').textContent = "Masculino";
    } else if (sexoMujer.checked) {
        document.getElementById('preview-sexo').textContent = "Femenino";
    }
}