'use strict'


var conceptoLista;

var nuevo;
var conceptoId;

function openModal(){

  document.getElementById('modal')
      .classList.add('active')
}

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}


async function getConceptos(){
   try {
      const request = await fetch('/conceptos', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        conceptoLista = await request.json();
        updateTable();
     } catch (error) {

      }
}


// CRUD - create read update delete

async function deleteConcepto(id){
 const request = await fetch('/concepto/' + id, {
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
  getConceptos()
}

async function updateConcepto(concepto){

    const request = await fetch('/concepto', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(concepto)
      });
      if(request != null){
         alert("Se modifico a : " + concepto.conceptonombre);
      }
      else{
        alert("Error al modificar");
      }
      getConceptos()
}

async function createConcepto(concepto){

  const request = await fetch('/concepto', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(concepto)
  });

  if(request != null){
     alert("Se registro a : " + concepto.conceptonombre);
  }
  else{
    alert("Error al registrar");
  }
  getConceptos();
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interacción con el diseño
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('debe').checked  = false;
    document.getElementById('haber').checked  = false;
}

const saveConcepto = () => {

    if (isValidFields()) 
    {
        var archivo = new FormData();
        var debehaber;
        if(!document.getElementById('debe').checked && !document.getElementById('haber').checked){
           alert("SELECCIONE EL TIPO DE CONCEPTO!");
           return;
        }
        if(document.getElementById('debe').checked){debehaber=true;}else{debehaber=false;}
        const concepto =
        {
            conceptonombre: document.getElementById('descripcion').value,
            debehaber: debehaber,
            monto: document.getElementById('monto').value
        }

        if (nuevo == true)
        {
            createConcepto(concepto)
            closeModal()
        } 
        else 
        {
            concepto.id = conceptoId;
            updateConcepto(concepto)
            closeModal()
        }
    }
}

const createRow = (concepto, index) => {
    const newRow = document.createElement('tr')
    var debehaber;
    if(concepto.debehaber){debehaber="DEBE";}else{debehaber="HABER";}
    newRow.innerHTML = 
    `
        <td>${concepto.conceptonombre}</td>
        <td>${debehaber}</td>
        <td>$ ${concepto.monto}</td>
        <td>
            <button type="button" onclick= "editConcepto(${concepto.id})" class="button green" id="edit">Editar</button>
            <button type="button" onclick="deleteConcepto(${concepto.id})" class="button red" id="delete" >Borrar</button>
        </td>
    `
    document.querySelector('#tableConceptos>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableConceptos>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

function updateTable(){

    clearTable()
    for(let concepto of conceptoLista){ createRow(concepto) };

}

const fillFields = (concepto) => {

    conceptoId = concepto.id;
    document.getElementById('descripcion').value = concepto.conceptonombre;
    if(concepto.debehaber){
    document.getElementById('debe').checked  = true;
    }else{document.getElementById('haber').checked  = true;}
    document.getElementById('monto').value = concepto.monto;

 }

function editConcepto(conceptoId){
        for(let concepto of conceptoLista){
            if(concepto.id == conceptoId){
               fillFields(concepto);
               break;
            }
         }
       nuevo = false;
       openModal();
}

function newConcepto(){
  nuevo = true;
  openModal();
}


getConceptos();
// Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', newConcepto)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveConcepto)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)