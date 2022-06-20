'use strict'


var puestoLista;

var nuevo;
var puestoId;

function openModal(){

  document.getElementById('modal')
      .classList.add('active')
}

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}


async function getPuestos(){

try {
        const request = await fetch('/puestos', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
          puestoLista = await request.json();
          updateTable();
      } catch (error) {

      }
}


// CRUD - create read update delete

async function deletePuesto(id){
 const request = await fetch('/puesto/' + id, {
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
  getPuestos()
}

async function updatePuesto(puesto){

    const request = await fetch('/puesto', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(puesto)
      });
      if(request != null){
         alert("Se modifico a : " + puesto.puestonombre);
      }
      else{
        alert("Error al modificar");
      }
      getPuestos()
}

async function createPuesto(puesto){

  const request = await fetch('/puesto', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(puesto)
  });

  if(request != null){
     alert("Se registro a : " + puesto.puestonombre);
  }
  else{
    alert("Error al registrar");
  }
  getPuestos();
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interacción con el diseño
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}

const savePuesto = () => {

    if (isValidFields()) 
    {
        var archivo = new FormData();
        const puesto =
        {
            puestonombre: document.getElementById('descripcion').value
        }

        if (nuevo == true)
        {
            createPuesto(puesto)
            closeModal()
        } 
        else 
        {
            puesto.id = puestoId;
            updatePuesto(puesto)
            closeModal()
        }
    }
}

const createRow = (puesto, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = 
    `
        <td>${puesto.puestonombre}</td>
        <td>
            <button type="button" onclick= "editPuesto(${puesto.id})" class="button green" id="edit">Editar</button>
            <button type="button" onclick="deletePuesto(${puesto.id})" class="button red" id="delete" >Borrar</button>
        </td>
    `
    document.querySelector('#tablePuestos>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tablePuestos>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

function updateTable(){

    clearTable()
    for(let puesto of puestoLista){ createRow(puesto) };

}

const fillFields = (puesto) => {

    puestoId = puesto.id;
    document.getElementById('descripcion').value = puesto.puestonombre;
 }

function editPuesto(puestoId){
        for(let puesto of puestoLista){
            if(puesto.id == puestoId){
               fillFields(puesto);
               break;
            }
         }
       nuevo = false;
       openModal();
}

function newPuesto(){
  nuevo = true;
  openModal();
}


getPuestos();
// Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', newPuesto)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', savePuesto)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)