const wrapper = document.querySelector(".wrapper"),
selectBtn = wrapper.querySelector(".select-btn"),
searchInp = wrapper.querySelector("input"),
ops = wrapper.querySelector(".options");
var empleadoId = null;
//Lista para el SelectBox
let empleados;
let empleadoMostrar=[];
var listaEmpSelec=[];

var sectorLista;
var sectoresCmb = document.getElementById('selectPuesto');

async function getSectores(){

const request = await fetch('/sectores', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  sectorLista = await request.json();

  sectoresCmb.innerHTML = "";
           let option = `<option >Seleccione un Sector</option>`;
           sectoresCmb.insertAdjacentHTML("beforeend", option);
           for(let sector of sectorLista){
               let option = `<option value=${sector.id}>${sector.sectornombre}</option>`;
               sectoresCmb.insertAdjacentHTML("beforeend", option);
           };
}

async function cargarEmpleados(selectedCountry)
{
   const request = await fetch('/empleados', {
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       }
     });
    empleados = await request.json();
    ops.innerHTML = "";
    for(let empleado of empleados){
        let isSelected = empleado == selectedCountry ? "selected" : "";
        let li = `<li onclick="updateName(this)" class="${isSelected}" value=`+ empleado.id +`>${empleado.nombre}  ${empleado.dni}</li>`;
        ops.insertAdjacentHTML("beforeend", li);
        empleadoMostrar.push(empleado.nombre + "  " + empleado.dni);
    };
    getSectores();
}
cargarEmpleados();

function updateName(selectedLi) 
{

   empleadoId = selectedLi.value;
    searchInp.value = "";
    cargarEmpleados(selectedLi.innerText);
    wrapper.classList.remove("active");
    selectBtn.firstElementChild.innerText = selectedLi.innerText;

    for (let i = 0; i < empleados.length; i++) {
       if(empleados[i].id == empleadoId){

         if(listaEmpSelec.length>0){
            for (let i = 0; i < listaEmpSelec.length; i++) {
               if(listaEmpSelec[i].id == empleadoId){
                  return;
               }
            }
         }
         listaEmpSelec.push(empleados[i]);
         updateTable();
         return;
       }
    }


}

const createRow = (empleado, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML =
    `
        <td>${empleado.nombre}</td>
        <td>${empleado.dni}</td>
        <td>
            <button id="eliminar-asistencia" onclick="deleteEmpleado(${empleado.id})">Eliminar</button>
        </td>
    `
    document.querySelector('#emplist>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#emplist>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

function updateTable(){

    clearTable();
    for(let empleado of listaEmpSelec){ createRow(empleado) };

}

function limpiarEmpleados(){
    listaEmpSelec=[];
    clearTable();

}

function deleteEmpleado(id){
    if(listaEmpSelec.length>0){
        for (let i = 0; i < listaEmpSelec.length; i++) {
              if(listaEmpSelec[i].id == id){
                 listaEmpSelec.splice(i,1);
              }
            }
        }
        updateTable();

}

searchInp.addEventListener("keyup", () => {
    let arr = [];
    let searchWord = searchInp.value.toLowerCase();
    arr = empleados.filter(empleado => {
        return empleado.nombre.toLowerCase().startsWith(searchWord);
    }).map(empleado => {
        let isSelected = empleado.nombre == selectBtn.firstElementChild.innerText ? "selected" : "";
        return `<li onclick="updateName(this)" class="${isSelected}" value=`+ empleado.id +`>${empleado.nombre}  ${empleado.dni}</li>`;
    }).join("");
    
    ops.innerHTML = arr ? arr : `<p style="margin-top: 10px;">Oops! Empleado no encontrado</p>`;
});


selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));

async function entrada()
{

for (let i = 0; i < listaEmpSelec.length; i++) {
      const request = await fetch('/asistencia/' + sectoresCmb.value, {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(listaEmpSelec[i].id)
                 });
  }

alert("Se registro la/s entrada/s con exito");
limpiarEmpleados();
}

async function comprobarAsistenciaEntrada()
{
  if(!(sectoresCmb.value>0)){
  alert("Debe seleccionar un sector!");
  return;
  }
  if(listaEmpSelec.lenght == 0){return null}

  for (let i = 0; i < listaEmpSelec.length; i++) {
      const request = await fetch('/comprobarAsistenciaEntrada', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(listaEmpSelec[i].id)
            });

             const respuesta = await request.text();

             if(respuesta != "OK"){
                alert("Entrada de "+ listaEmpSelec[i].nombre +" ya esta registrada");
                return;
             }
  }
  entrada();

}

async function salida()
{

for (let i = 0; i < listaEmpSelec.length; i++) {

      const request = await fetch('/asistenciaSalida', {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(listaEmpSelec[i].id)
                 });
  }

alert("Se registro la/s salida/s con exito");
limpiarEmpleados();
}

async function comprobarAsistenciaSalida()
{
 if(listaEmpSelec.lenght == 0){return null}

   for (let i = 0; i < listaEmpSelec.length; i++) {
       const request = await fetch('/comprobarAsistenciaSalida', {
               method: 'POST',
               headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
               },
               body: JSON.stringify(listaEmpSelec[i].id)
             });

              const respuesta = await request.text();
              console.log(respuesta);

              if(respuesta != "OK"){
                 alert("No hay una entrada de "+ listaEmpSelec[i].nombre +" registrada");
                 return;
              }
   }
   salida();

}