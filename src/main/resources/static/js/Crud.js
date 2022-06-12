'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

var empleadoLista;
var empleadoListaMostrar;
var puestoLista;
var sectorLista;
var tipoEmpleadoLista;

async function getPuestos(){

const request = await fetch('/puestos', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  puestoLista = await request.json();
  getSectores();

}

async function getSectores(){

const request = await fetch('/sectores', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  sectorLista = await request.json();

  getTiposEmpleados();

}

async function getTiposEmpleados(){

const request = await fetch('/tipoempleados', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  tipoEmpleadoLista = await request.json();

  getEmpleados();

}

async function getEmpleados(){

const request = await fetch('/empleados', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  empleadoLista = await request.json();
  empleadoListaMostrar = empleadoLista

  for(let empleado of empleadoListaMostrar){
    for(let puesto of puestoLista){
         if(empleado.puestoid == puesto.id){
            empleado.puestoidM = puesto.puestonombre;
          }
       }
    for(let sector of sectorLista){
          if(empleado.sectorid == sector.id){
             empleado.sectoridM= sector.sectornombre;
          }
        }
    for(let tipoEmpleado of tipoEmpleadoLista){
          if(empleado.tipoempleadoid == tipoEmpleado.id){
             empleado.tipoempleadoidM = tipoEmpleado.tipoempleadonombre;
          }
        }
  };

  updateTable();

}



// CRUD - create read update delete
/*const deleteEmpleado = (index) => {//cambiar
    const dbEmpleados = leerEmpleados()
    dbEmpleados.splice(index, 1)
    setLocalStorage(dbEmpleados)*/
} ///////////////////////////////////////

async function deleteEmpleado(id , nombre){
 const request = await fetch('/empleado/' + id, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
     }
  });
  var elimidadoExito = await request.json();
  if(elimidadoExito != null){
    alert("Se elimino a : " + nombre);
  }
}



const updateEmpleado = (index, empleado) => {//cambiar
    const dbEmpleados = leerEmpleados()
    dbEmpleados[index] = empleado
    setLocalStorage(dbEmpleados)
}

//const leerEmpleados = () => getEmpleados()

const createEmpleado = (empleado) => {//cambiar
    const dbEmpleados = getLocalStorage()
    dbEmpleados.push (empleado)
    setLocalStorage(dbEmpleados)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interacción con el diseño
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('nombreEmpleado').dataset.index = 'new'
    var previewImage = document.getElementById('preview');
    previewImage.src = null;
}

const saveEmpleado = () => {
    debugger

    if (isValidFields()) 
    {
        const empleado =
        {
            codigoEmpleado: document.getElementById('codigoEmpleado').value,
            nombreEmpleado: document.getElementById('nombreEmpleado').value,
            emailEmpleado: document.getElementById('emailEmpleado').value,
            celularEmpleado: document.getElementById('celularEmpleado').value,
            direccionEmpleado: document.getElementById('direccionEmpleado').value,   
            selectPuesto: document.getElementById('selectPuesto').value,
            selectSector: document.getElementById('selectSector').value,
            selectTipoEmpleado: document.getElementById('selectTipoEmpleado').value
        }

        const index = document.getElementById('nombreEmpleado').dataset.index

        if (index == 'new') 
        {
            createEmpleado(empleado)
            updateTable()
            closeModal()
        } 
        else 
        {
            updateEmpleado(index, empleado)
            updateTable()
            closeModal()
        }

        var previewImage = document.getElementById('preview');
        previewImage.src = null;
    }
}

const createRow = (empleado, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = 
    `
        <td>${empleado.codigoempleado}</td>
        <td>${empleado.nombre}</td>
        <td>${empleado.email}</td>
        <td>${empleado.telefono}</td>
        <td>${empleado.direccion}</td>
        <td>${empleado.puestoidM}</td>
        <td>${empleado.sectoridM}</td>
        <td>${empleado.tipoempleadoidM}</td>
        <td>
            <button type="button" onclick="" class="button green" id="edit-${index}">Editar</button>
            <button type="button" onclick="deleteEmpleado("+empleado.id+", "+empleado.nombre+")" class="button red" id="delete-${index}" >Borrar</button>
        </td>
    `
    document.querySelector('#tableEmpleado>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableEmpleado>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

function updateTable(){

    clearTable()
    for(let empleado of empleadoListaMostrar){ createRow(empleado) };

}

const fillFields = (client) => {
    document.getElementById('codigoEmpleado').value = client.codigoEmpleado
    document.getElementById('nombreEmpleado').value = client.nombreEmpleado
    document.getElementById('emailEmpleado').value = client.emailEmpleado
    document.getElementById('celularEmpleado').value = client.celularEmpleado
    document.getElementById('direccionEmpleado').value = client.direccionEmpleado
    document.getElementById('selectPuesto').value = client.selectPuesto
    document.getElementById('selectSector').value = client.selectSector
    document.getElementById('selectTipoEmpleado').value = client.selectTipoEmpleado
    document.getElementById('nombreEmpleado').dataset.index = client.index
 }

const editEmpleado = (index) => {
    const client = leerEmpleados()[index]
    client.index = index
    fillFields(client)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') 
    {
        const [action, index] = event.target.id.split('-')

        if (action == 'edit') 
        {
            editEmpleado(index)
        } 
        else 
        {
            const empleado = leerEmpleados()[index]
            const response = confirm(`Desea eliminar el empleado ${empleado.nombreEmpleado}`)

            if (response) 
            {
                deleteEmpleado(index)
                updateTable()
            }
        }
    }
}

getPuestos();
// Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveEmpleado)

document.querySelector('#tableEmpleado>tbody')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)