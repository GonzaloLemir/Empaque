const wrapper = document.querySelector(".wrapper"),
selectBtn = wrapper.querySelector(".select-btn"),
searchInp = wrapper.querySelector("input"),
options = wrapper.querySelector(".options");

var empleadoId = null;


async function cargarEmpleados(selectedCountry)
{
   const request = await fetch('/empleados', {
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       }
     });
     const empleados = await request.json();
    options.innerHTML = "";
    for(let empleado of empleados){
        let id = empleado.id;
        let isSelected = empleado == selectedCountry ? "selected" : "";
        let li = `<li onclick="updateName(this)" class="${isSelected}" value=`+ id +`>${empleado.nombre}</li>`;
        options.insertAdjacentHTML("beforeend", li);
    };
}
cargarEmpleados();

function updateName(selectedLi) 
{
    empleadoId = selectedLi.value;
    searchInp.value = "";
    cargarEmpleados(selectedLi.innerText);
    wrapper.classList.remove("active");
    selectBtn.firstElementChild.innerText = selectedLi.innerText;

}

searchInp.addEventListener("keyup", () => {
    let arr = [];
    let searchWord = searchInp.value.toLowerCase();
    arr = empleados.filter(data => {
        return data.toLowerCase().startsWith(searchWord);
    }).map(data => {
        let isSelected = data == selectBtn.firstElementChild.innerText ? "selected" : "";
        return `<li onclick="updateName(this)" class="${isSelected}">${data}</li>`;
    }).join("");
    
    options.innerHTML = arr ? arr : `<p style="margin-top: 10px;">Oops! Empleado no encontrado</p>`;
});


selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));

async function entrada()
{
      const request = await fetch('/asistencia', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(empleadoId)
           });
      alert("Se registro la entrada con exito");
}

async function comprobarAsistenciaEntrada()
{
  if(empleadoId == null){return null}
  const request = await fetch('/comprobarAsistenciaEntrada', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(empleadoId)
      });

       const respuesta = await request.text();

       if(respuesta == "OK"){
          entrada();
       }
       else{
          alert("Entrada ya registrada");
       }

}

async function salida()
{
      const request = await fetch('/asistenciaSalida', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(empleadoId)
           });
      alert("Se registro la salida con exito");
}

async function comprobarAsistenciaSalida()
{
  if(empleadoId == null){return null}
  const request = await fetch('/comprobarAsistenciaSalida', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(empleadoId)
      });

       const respuesta = await request.text();

       if(respuesta == "OK"){
          salida();
       }
       else{
          alert("No existe un entrada registrada");
       }

}