'use strict'


var sectorLista;

var nuevo;
var sectorId;

function openModal(){

  document.getElementById('modal')
      .classList.add('active')
}

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}


async function getSectores(){
try {
        const request = await fetch('/sectores', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
          sectorLista = await request.json();
          updateTable();
      } catch (error) {

      }
}


// CRUD - create read update delete

async function deleteSector(id){
 const request = await fetch('/sector/' + id, {
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
  getSectores()
}

async function updateSector(sector){

    const request = await fetch('/sector', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sector)
      });
      if(request != null){
         alert("Se modifico a : " + sector.sectornombre);
      }
      else{
        alert("Error al modificar");
      }
      getSectores()
}

async function createSector(sector){

  const request = await fetch('/sector', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(sector)
  });

  if(request != null){
     alert("Se registro a : " + sector.sectornombre);
  }
  else{
    alert("Error al registrar");
  }
  getSectores();
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interacción con el diseño
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}

const saveSector = () => {

    if (isValidFields()) 
    {
        var archivo = new FormData();
        const sector =
        {
            sectornombre: document.getElementById('descripcion').value
        }

        if (nuevo == true)
        {
            createSector(sector)
            closeModal()
        } 
        else 
        {
            sector.id = sectorId;
            updateSector(sector)
            closeModal()
        }
    }
}

const createRow = (sector, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = 
    `
        <td>${sector.sectornombre}</td>
        <td>
            <button type="button" onclick= "editSector(${sector.id})" class="button green" id="edit">Editar</button>
            <button type="button" onclick="deleteSector(${sector.id})" class="button red" id="delete" >Borrar</button>
        </td>
    `
    document.querySelector('#tableSector>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableSector>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

function updateTable(){

    clearTable()
    for(let sector of sectorLista){ createRow(sector) };

}

const fillFields = (sector) => {

    sectorId = sector.id;
    document.getElementById('descripcion').value = sector.sectornombre;
 }

function editSector(sectorId){
        for(let sector of sectorLista){
            if(sector.id == sectorId){
               fillFields(sector);
               break;
            }
         }
       nuevo = false;
       openModal();
}

function newSector(){
  nuevo = true;
  openModal();
}


getSectores();
// Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', newSector)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveSector)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)