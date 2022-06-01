// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarTablaUsuarios();
  $('#tablaUsuarios').DataTable();
});

async function cargarTablaUsuarios(){

  const request = await fetch('usuarios', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const usuariosLista = await request.json();

  console.log(usuariosLista);

  let usuarioHTML = "";

  for(let usuario of usuariosLista){

  let botonEliminar = '<a href="#" onclick="eliminarUsuarios('+usuario.id+')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';

  usuarioHTML += '<tr> <td>'+usuario.nombre+'</td> <td>'+usuario.apellido+'</td> <td>'+usuario.email+'</td> <td>'+usuario.telefono+'</td> <td>'+usuario.id+'</td> <td>'+botonEliminar+'</td></tr>';

  }

  document.querySelector('#tablaUsuarios tbody').outerHTML = usuarioHTML;
}

async function eliminarUsuarios(id){

  const request = await fetch('usuario/'+id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  alert("Eliminado user de id: "+id);
  //cargarTablaUsuarios();
  location.reload();
}