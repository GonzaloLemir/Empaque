'use strict'


var tipoEmpleadoLista;
var tipoEmpleadoListaMostrar;

var nuevo;
var tipEmpId;

function openModal(){

  document.getElementById('modal')
      .classList.add('active')
}

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}


async function getTiposEmpleados(){
try {
        const request = await fetch('/tipoempleados', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
          tipoEmpleadoLista = await request.json();
          //tipoEmpleadoListaMostrar = tipoEmpleadoLista;

          updateTable();
      } catch (error) {

      }
}


// CRUD - create read update delete

async function deleteTipoEmpleado(id){
 const request = await fetch('/tipoempleado/' + id, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
     }
  });

  if(request != null){
       alert("Se elimino registro");
    }
  else{
     alert("Error al eliminar el registro");
  }
  getTiposEmpleados()
}

async function updateTipoEmpleado(tipoEmpleado){

    const request = await fetch('/tipoempleado', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tipoEmpleado)
      });
      if(request != null){
         alert("Se modifico a : " + tipoEmpleado.tipoempleadonombre);
      }
      else{
        alert("Error al modificar");
      }
      getTiposEmpleados()
}

async function createTIpoEmpleado(tipoEmpleado){

  const request = await fetch('/tipoempleado', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tipoEmpleado)
  });

  if(request != null){
     alert("Se registro a : " + tipoEmpleado.tipoempleadonombre);
  }
  else{
    alert("Error al registrar");
  }
  getTiposEmpleados();
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interacción con el diseño
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}

const saveTipoEmpleado = () => {

    if (isValidFields()) 
    {
        var archivo = new FormData();
        const tipoEmpleado =
        {
            tipoempleadonombre: document.getElementById('descripcion').value
        }

        if (nuevo == true)
        {
            createTIpoEmpleado(tipoEmpleado)
            closeModal()
        } 
        else 
        {
            tipoEmpleado.id = tipEmpId;
            updateTipoEmpleado(tipoEmpleado)
            closeModal()
        }
    }
}

const createRow = (tipoEmpleado, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = 
    `
        <td>${tipoEmpleado.tipoempleadonombre}</td>
        <td>
            <button type="button" onclick= "editTipoEmpleado(${tipoEmpleado.id})" class="button green" id="edit">Editar</button>
            <button type="button" onclick="deleteTipoEmpleado(${tipoEmpleado.id})" class="button red" id="delete" >Borrar</button>
        </td>
    `
    document.querySelector('#tableTipoEmpleado>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableTipoEmpleado>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

function updateTable(){

    clearTable()
    for(let tipoEmpleado of tipoEmpleadoLista){ createRow(tipoEmpleado) };

}

const fillFields = (tipoEmpleado) => {

    tipEmpId = tipoEmpleado.id;
    document.getElementById('descripcion').value = tipoEmpleado.tipoempleadonombre;
 }

function editTipoEmpleado(tipoEmpleadoId){
        for(let tipoEmpleado of tipoEmpleadoLista){
            if(tipoEmpleado.id == tipoEmpleadoId){
               fillFields(tipoEmpleado);
               break;
            }
         }
       nuevo = false;
       openModal();
}

function newTipoEmpleado(){
  nuevo = true;
  openModal();
}


getTiposEmpleados();
// Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', newTipoEmpleado)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveTipoEmpleado)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)