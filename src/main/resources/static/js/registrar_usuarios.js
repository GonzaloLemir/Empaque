
$(document).ready(function() {
});

async function registrarUsuario(){

  let usuario = {}

  usuario.nombreusuario = document.getElementById("nombreUsuario").value;
  usuario.passwordusuario = document.getElementById("contraseñaUsuario").value;
  usuario.esadmin = "F";


  const request = await fetch('usuario', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(usuario)
  });


  alert("Usuario "+usuario.nombreusuario);
}
