package com.citrusfranco.citrusfranco.controllers;


import com.citrusfranco.citrusfranco.dao.usuario.usuario_dao;
import com.citrusfranco.citrusfranco.models.Usuario;
import com.citrusfranco.citrusfranco.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;

@RestController
public class UsuarioController {

    @Autowired
    private usuario_dao Usuario_dao;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "/validartoken/{token}", method = RequestMethod.POST)
    private String validarToken(@PathVariable String token) {
        try {
            String usuarioId = jwtUtil.getKey(token);
            if(usuarioId != null){
                return "t";
            }
            else {
                return "f";
            }
        }catch (Exception error){
            return "f";
        }


    }

    @RequestMapping(value = "usuarios", method = RequestMethod.GET)
    public List<Usuario> getUsuarios(){
        return Usuario_dao.getUsuarios();
    }

    @RequestMapping(value = "usuario", method = RequestMethod.POST)
    public void registrarUsuario(@RequestBody Usuario usuario){
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        usuario.setPasswordusuario(argon2.hash(1,1024,1, usuario.getPasswordusuario()));
        Usuario_dao.registrarUsuario(usuario);
    }

    @RequestMapping(value = "usuario/{id}", method = RequestMethod.GET)
    public Usuario getUsuario(@PathVariable long id){
        return Usuario_dao.getUsuario(id);
    }

    @RequestMapping(value = "usuario/{id}", method = RequestMethod.DELETE)
    public void eliminarUsuario(@PathVariable long id){
        Usuario_dao.eliminarUsuario(id);
    }

    @RequestMapping(value = "/loginusuario", method = RequestMethod.POST)
    public String loginUsuario(@RequestBody Usuario usuario) throws JSONException {
        Usuario usuarioLogeado = Usuario_dao.loginUsuario(usuario);
      if(usuarioLogeado != null) {
          String tokenLogin = jwtUtil.create(String.valueOf(usuarioLogeado.getId()), usuarioLogeado.getNombreusuario());
          JSONObject item = new JSONObject();
           item.put("token", tokenLogin);
           item.put("esadmin",usuarioLogeado.getEsadmin());
           return item.toString();
       }
       else{
           return "falso";
       }
    }

}
