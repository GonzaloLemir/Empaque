
window.onload = function() {
    localStorage.clear();
 };

async function iniciarSesion(){

  let usuario = {}

  usuario.nombreusuario = document.getElementById("nombreUsuario").value;
  usuario.passwordusuario = document.getElementById("passwordUsuario").value;

  const request = await fetch('/loginusuario', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(usuario)
  });

   const respuesta = await request.text();

   if(respuesta != "falso"){
     var objJson = JSON.parse(respuesta);
     localStorage.token = objJson['token'];
     if(objJson['esadmin'] == 'T'){ window.location.href = "../html/MenuPrincipal.html";}
     else{ window.location.href = "../html/ControlAsistencia.html";}
   }
   else{ alert("Usuario o Clave incorrect@/s");}
}
