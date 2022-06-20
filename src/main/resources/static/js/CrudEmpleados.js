'use strict'

var empleadoLista;
var empleadoListaMostrar;
var puestoLista;
var sectorLista;
var tipoEmpleadoLista;
var nuevo;
var empId;
var imagen;
var puestosCmb = document.getElementById('selectPuesto');
var sectoresCmb = document.getElementById('selectSector');
var tipoEmpleadosCmb = document.getElementById('selectTipoEmpleado');
var previewImage = document.getElementById('preview');
document.getElementById("archivo").addEventListener('change', procesarArchivo, false);

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/citrusfranco/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "nzdgqocg";

function mostrarImagen(event)
{
     var imagenSource = event.target.result;
     var previewImage = document.getElementById('preview');
     previewImage.src = imagenSource;
}

async function procesarArchivo(event)
{
    imagen = event.target.files[0];


    var lector = new FileReader();
    lector.addEventListener('load', mostrarImagen, false);
    lector.readAsDataURL(imagen);


 }

function openModal(){
  puestosCmb.innerHTML = "";
          for(let puesto of puestoLista){
              let option = `<option value=${puesto.id}>${puesto.puestonombre}</option>`;
              puestosCmb.insertAdjacentHTML("beforeend", option);
          };

  sectoresCmb.innerHTML = "";
           for(let sector of sectorLista){
               let option = `<option value=${sector.id}>${sector.sectornombre}</option>`;
               sectoresCmb.insertAdjacentHTML("beforeend", option);
           };

  tipoEmpleadosCmb.innerHTML = "";
            for(let tipoEmpleado of tipoEmpleadoLista){
                let option = `<option value=${tipoEmpleado.id}>${tipoEmpleado.tipoempleadonombre}</option>`;
                tipoEmpleadosCmb.insertAdjacentHTML("beforeend", option);
            };

  document.getElementById('modal')
      .classList.add('active')
}

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

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

try {
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
      } catch (error) {

      }


}



// CRUD - create read update delete

async function deleteEmpleado(id){
 const request = await fetch('/empleado/' + id, {
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
  getEmpleados()
}

async function updateEmpleado(empleado){

    const request = await fetch('/empleado', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(empleado)
      });
      if(request != null){
         alert("Se modifico a : " + empleado.nombre);
      }
      else{
        alert("Error al modificar");
      }
      getEmpleados()
}

async function createEmpleado(empleado){

  const request = await fetch('/empleado', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(empleado)
  });

  if(request != null){
     alert("Se registro a : " + empleado.nombre);
  }
  else{
    alert("Error al registrar");
  }
  getEmpleados()
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interacción con el diseño
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    var previewImage = document.getElementById('preview');
    previewImage.src = null;
}

const saveEmpleado = (res) => {

    if (isValidFields()) 
    {
        const empleado =
        {
            codigoempleado: document.getElementById('codigoEmpleado').value,
            nombre: document.getElementById('nombreEmpleado').value,
            email: document.getElementById('emailEmpleado').value,
            telefono: document.getElementById('celularEmpleado').value,
            direccion: document.getElementById('direccionEmpleado').value,
            foto: res,
            puestoid: document.getElementById('selectPuesto').value,
            sectorid: document.getElementById('selectSector').value,
            tipoempleadoid: document.getElementById('selectTipoEmpleado').value
        }

        if (nuevo == true)
        {
            createEmpleado(empleado)
            closeModal()
        } 
        else 
        {
            empleado.id = empId;
            updateEmpleado(empleado)
            closeModal()
        }

        previewImage.src = null;
    }
}

async function guardar(){
const formData = new FormData();
       formData.append('file', imagen);
       formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

       const res = await axios.post(
          CLOUDINARY_URL,
          formData,
                  {
                    headers: {
                              'Content-Type': 'multipart/form-data'
                             }
                  }
              );
       saveEmpleado(res.data.secure_url);
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
            <button type="button" onclick= "editEmpleado(${empleado.id})" class="button green" id="edit">Editar</button>
            <button type="button" onclick="deleteEmpleado(${empleado.id})" class="button red" id="delete" >Borrar</button>
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

const fillFields = (empleado) => {

    empId = empleado.id;
    document.getElementById('codigoEmpleado').value = empleado.codigoempleado;
    document.getElementById('nombreEmpleado').value = empleado.nombre;
    document.getElementById('emailEmpleado').value = empleado.email;
    document.getElementById('celularEmpleado').value = empleado.telefono;
    document.getElementById('direccionEmpleado').value = empleado.direccion;
    puestosCmb.value = empleado.puestoid;
    sectoresCmb.value = empleado.sectorid;
    tipoEmpleadosCmb.value = empleado.tipoempleadoid;
    previewImage.src = empleado.foto;
 }

function editEmpleado(empleadoId){
        for(let empleado of empleadoLista){
            if(empleado.id == empleadoId){
               fillFields(empleado);
               break;
            }
         }
       nuevo = false;
       openModal();
}

function newEmpleado(){
  nuevo = true;
  openModal();
}


getPuestos();
// Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', newEmpleado)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', guardar)

/*document.querySelector('#tableEmpleado>tbody')
    .addEventListener('click', editDelete)*/

document.getElementById('cancelar')
    .addEventListener('click', closeModal)