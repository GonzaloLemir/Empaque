window.onload = async function() {
    const request = await fetch('/validartoken/'+localStorage.token, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

       const respuesta = await request.text();
       if(respuesta == 'f')
       {
         alert("Acceso Denegado..");
         window.location.href = "../html/Login.html";
       }
 };