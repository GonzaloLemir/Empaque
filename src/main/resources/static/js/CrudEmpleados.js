'use strict'

var empleadoLista;
var empleadoListaMostrar;
var puestoLista;
var tipoEmpleadoLista;
var nuevo;
var empId;


var puestosCmb = document.getElementById('selectPuesto');
var tipoEmpleadosCmb = document.getElementById('selectTipoEmpleado');
var tipoFotoCmb = document.getElementById('selectFotoElegir');

var previewImageDoc = document.getElementById('previewDoc');
var previewImageCar = document.getElementById('previewCar');
var previewImagePer = document.getElementById('previewPer');

var imagenDoc=null, imagenCar=null, imagenPer=null;

document.getElementById("archivo").addEventListener('change', procesarArchivo, false);

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/citrusfranco/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "nzdgqocg";


function llamarAImput()
{
    document.getElementById("archivo").click();
}

function mostrarImagen(event)
{
     var imagenSource = event.target.result;
     if(tipoFotoCmb.value == "DNI" ){
             previewImageDoc.src = imagenSource;
          }
     if(tipoFotoCmb.value == "CARNET" ){
             previewImageCar.src = imagenSource;
          }
     if(tipoFotoCmb.value == "PERFIL" ){
             previewImagePer.src = imagenSource;
          }

}

async function procesarArchivo(event)
{
     let imagen;
     if(tipoFotoCmb.value == "DNI" ){
             imagenDoc = event.target.files[0];
             imagen = imagenDoc;
          }
     if(tipoFotoCmb.value == "CARNET" ){
             imagenCar = event.target.files[0];
             imagen = imagenCar;
          }
     if(tipoFotoCmb.value == "PERFIL" ){
             imagenPer = event.target.files[0];
             imagen = imagenPer;
          }


    var lector = new FileReader();
    lector.addEventListener('load', mostrarImagen, false);
    lector.readAsDataURL(imagen);


 }

function openModal(){
  puestosCmb.innerHTML = "";
          for(let puesto of puestoLista){
              let option = `<option value=${puesto.id} text=${puesto.puestonombre}>${puesto.puestonombre}</option>`;
              puestosCmb.insertAdjacentHTML("beforeend", option);
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
           /* for(let sector of sectorLista){
                  if(empleado.sectorid == sector.id){
                     empleado.sectoridM= sector.sectornombre;
                  }
                }*/
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
    var previewImage = document.getElementById('preview');////////CAMBIAR
    previewImagePer.src = "../img/empleadoPred.jpg";
    previewImageDoc.src = "../img/dniPred.png";
    previewImageCar.src = "../img/carnetPred.jpg";
    imagenDoc = null;
    imagenCar = null;
    imagenPer = null;
}

const saveEmpleado = (resDoc, resCar, resPer) => {
    if (isValidFields()) 
    {
        const empleado =
        {
            codigoempleado: document.getElementById('codigoEmpleado').value,
           // legajoempleado: document.getElementById('legajoempleado').value,
            nombre: document.getElementById('nombreEmpleado').value,
            email: document.getElementById('emailEmpleado').value,
            telefono: document.getElementById('celularEmpleado').value,
            direccion: document.getElementById('direccionEmpleado').value,
            dni: document.getElementById('dni').value,
            fotodni:  null,
            fotocarnet:  null,
            fotoperfil:  null,
            puestoid: document.getElementById('selectPuesto').value,
            tipoempleadoid: document.getElementById('selectTipoEmpleado').value
        }

        if(resDoc!=null){empleado.fotodni = resDoc.data.secure_url;}
                else{empleado.fotodni = previewImageDoc.src;}

        if(resCar!=null){empleado.fotocarnet = resCar.data.secure_url;}
                else{empleado.fotocarnet = previewImageCar.src;}

        if(resPer!=null){empleado.fotoperfil = resPer.data.secure_url;}
                else{empleado.fotoperfil = previewImagePer.src;}

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

        previewImagePer.src = "../img/empleadoPred.jpg";
        previewImageDoc.src = "../img/dniPred.png";
        previewImageCar.src = "../img/carnetPred.jpg";
    }
}

async function uploadFile() {
      //creating form data object and append file into that form data
  let formData = new FormData();
  formData.append("file", fileupload.files[0]);
}

async function guardar(){
let resDoc = null;
const formDataDoc = new FormData();
       formDataDoc.append('file', imagenDoc);
       formDataDoc.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
let resCar = null;
const formDataCar = new FormData();
       formDataCar.append('file', imagenCar);
       formDataCar.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
let resPer = null;
const formDataPer = new FormData();
       formDataPer.append('file', imagenPer);
       formDataPer.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      if(imagenDoc != null){
       resDoc = await axios.post(
          CLOUDINARY_URL,
          formDataDoc,
                  {
                    headers: {
                              'Content-Type': 'multipart/form-data'
                             }
                  }
              );
       }
       if(imagenCar != null){
       resCar = await axios.post(
                        CLOUDINARY_URL,
                        formDataCar,
                                {
                                  headers: {
                                            'Content-Type': 'multipart/form-data'
                                           }
                                }
                            );
       }

       if(imagenPer != null){
       resPer = await axios.post(
                        CLOUDINARY_URL,
                        formDataPer,
                                {
                                  headers: {
                                            'Content-Type': 'multipart/form-data'
                                           }
                                }
                            );
       }

       saveEmpleado(resDoc, resCar, resPer);
}

const createRow = (empleado, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = 
    `
        <td>${empleado.codigoempleado}</td>
        <td>${empleado.nombre}</td>
        <td>${empleado.email}</td>
        <td>${empleado.telefono}</td>
        <td>${empleado.dni}</td>
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
  //  document.getElementById('legajoempleado').value = empleado.legajoempleado;
    document.getElementById('emailEmpleado').value = empleado.email;
    document.getElementById('celularEmpleado').value = empleado.telefono;
    document.getElementById('direccionEmpleado').value = empleado.direccion;
    document.getElementById('dni').value = empleado.dni;
    puestosCmb.value = empleado.puestoid;
    tipoEmpleadosCmb.value = empleado.tipoempleadoid;
    previewImageDoc.src = empleado.fotodni;
    previewImageCar.src = empleado.fotocarnet;
    previewImagePer.src = empleado.fotoperfil;
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

document.getElementById('subir_imagen')
    .addEventListener('click', llamarAImput)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)