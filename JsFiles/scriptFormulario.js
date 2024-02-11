const alumno = {
    id: '',
    curso: '',
    nombre: '',
    apellido: '',
    asignatura: '',
    nota: '',
    evaluacion: ''
};

let isValid = false;
let isEditando = false;

document.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        realizarAccionUsuario();
    }
});

function realizarAccionUsuario() {
    accionUsuario(event);
}
function accionUsuario(event) {
    event.preventDefault();

    validData();
    if (isValid) {
        if (!isEditando) {
            addAlumno();
        } else {
            editAlumno();
        }
    }

    limpiarObj();
    limpiarCampos();
}

function addAlumno() {
    const id = new Date().getTime()

    const inpCurso = document.getElementById("curso").value;
    const inpNombre = document.getElementById("nombre").value;
    const inpApellido = document.getElementById("apellido").value;
    const inpAsignatura = document.getElementById("asignatura").value;
    const inpNota = document.getElementById("nota").value;
    const inpEval = document.getElementById("evaluacion").value;

    const tbody = document.querySelector('#tableAlumnos tbody');

    const tr = document.createElement('tr');
    tr.setAttribute("id", id);

    const thId = document.createElement("th");
    thId.textContent = id;
    const thCurso = document.createElement("th");
    thCurso.textContent = inpCurso;
    const thNombre = document.createElement("th");
    thNombre.textContent = inpNombre;
    const thApellido = document.createElement("th");
    thApellido.textContent = inpApellido;
    const thAsignatura = document.createElement("th");
    thAsignatura.textContent = inpAsignatura;
    const thNota = document.createElement("th");
    thNota.textContent = inpNota;
    const thEvaluacion = document.createElement("th");
    thEvaluacion.textContent = inpEval;

    btnEdit = document.createElement("button");
    btnEdit.classList.add("btn", "btn-edit");
    btnEdit.textContent = "Editar";
    btnEdit.onclick = function () {
        isEditando = true;

        alumno.id = thId.textContent;
        alumno.curso = thCurso.textContent;
        alumno.nombre = thNombre.textContent;
        alumno.apellido = thApellido.textContent;
        alumno.asignatura = thAsignatura.textContent;
        alumno.nota = thNota.textContent;
        alumno.evaluacion = thEvaluacion.textContent;

        document.getElementById("curso").value = alumno.curso;
        document.getElementById("nombre").value = alumno.nombre;
        document.getElementById("apellido").value = alumno.apellido;
        document.getElementById("asignatura").value = alumno.asignatura;
        document.getElementById("nota").value = alumno.nota;
        document.getElementById("evaluacion").value = alumno.evaluacion;

        document.getElementById("add-data").value = "Editar alumno";
        document.getElementById("add-data").classList.add("btn-edit-data");
        document.getElementById("add-data").classList.remove("btn-acreate-alumno");
    }

    btnDelete = document.createElement("button");
    btnDelete.classList.add("btn", "btn-delete");
    btnDelete.textContent = "Borrar";
    btnDelete.onclick = function () {
        tr.remove()
    }

    tr.appendChild(thId);
    tr.appendChild(thCurso);
    tr.appendChild(thNombre);
    tr.appendChild(thApellido);
    tr.appendChild(thAsignatura);
    tr.appendChild(thNota);
    tr.appendChild(thEvaluacion);
    const tdActions = document.createElement("td");
    tdActions.appendChild(btnEdit);
    tdActions.appendChild(btnDelete);
    tr.appendChild(tdActions);
    tbody.appendChild(tr);
}

function editAlumno(){
    const trId = document.getElementById(alumno.id)

    trId.childNodes[1].textContent = document.getElementById("curso").value;
    trId.childNodes[2].textContent = document.getElementById("nombre").value;
    trId.childNodes[3].textContent = document.getElementById("apellido").value;
    trId.childNodes[4].textContent = document.getElementById("asignatura").value
    trId.childNodes[5].textContent = document.getElementById("nota").value
    trId.childNodes[6].textContent = document.getElementById("evaluacion").value

    console.log("alumno editado exitosamente")
    const btnEditar = document.getElementById("add-data")
    btnEditar.value = "Crear nuevo Alumno"
    btnEditar.classList.remove('btn-edit')
    btnEditar.classList.add('btn-acreate-alumno')
}

function limpiarObj(){
        alumno.id = '',
        alumno.curso = '',
        alumno.nombre = '',
        alumno.apellido = '',
        alumno.asignatura = '',
        alumno.nota = '',
        alumno.evaluacion = ''
    }

function limpiarCampos(){
        document.getElementById("curso").value = '';
        document.getElementById("nombre").value = '';
        document.getElementById("apellido").value = '';
        document.getElementById("asignatura").value = ''; 
        document.getElementById("nota").value = '';
        document.getElementById("evaluacion").value = '';

        isValid = false;
        isEditando = false;

    }

function validData(){

        const inpCurso = document.getElementById("curso").value;
        const inpNombre = document.getElementById("nombre").value;
        const inpApellido = document.getElementById("apellido").value;
        const inpAsignatura = document.getElementById("asignatura").value;
        const inpNota = document.getElementById("nota").value;
        const inpEval = document.getElementById("evaluacion").value;

        if(
            inpCurso === '' || 
            inpNombre === '' || 
            inpApellido === '' || 
            inpAsignatura === '' || 
            inpNota === '' || 
            inpEval === ''
        ){
            alert("Debes introducir todos los datos ")
            isValid = false; 
        }else{
            isValid = true;
        }
}

function generarPDF(event) {
    event.preventDefault();

    const tbody = document.querySelector('#tableAlumnos tbody');
    if(tbody.childElementCount === 0) {
        alert('No se puede crear el PDF ya que no existen registros en la tabla');
        return;
    }

    const str = recorrerTabla();

    const doc = new jsPDF();
    doc.autoTable({ html: '#tableAlumnos' });
    doc.save('Registro_notas.pdf');
}

function recorrerTabla() {
    let str = '';

    const table = document.getElementById('tableAlumnos');

    if (!table) {
        console.error('La tabla no se encontró.');
        return '';
    }

    return str;
}