package com.citrusfranco.citrusfranco.dao.usuario;

import com.citrusfranco.citrusfranco.models.Usuario;

import java.util.List;

public interface usuario_dao {

    List<Usuario> getUsuarios();

    Usuario getUsuario(long id);

    void eliminarUsuario(long id);

    void registrarUsuario(Usuario usuario);

    Usuario loginUsuario(Usuario usuario);
}
