package com.citrusfranco.citrusfranco.dao.usuario;

import com.citrusfranco.citrusfranco.models.Usuario;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class usuario_dao_imp implements usuario_dao{

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Usuario> getUsuarios() {
        String query = "FROM usuarios";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public Usuario getUsuario(long id) {
        String query = "FROM usuarios WHERE id = "+id+"";
        return (Usuario) entityManager.createQuery(query).getSingleResult();
    }

    @Override
    public void eliminarUsuario(long id) {
        Usuario usuario = entityManager.find(Usuario.class, id);
        entityManager.remove(usuario);
    }

    @Override
    public void registrarUsuario(Usuario usuario) {
        entityManager.merge(usuario);
    }

    @Override
    public Usuario loginUsuario(Usuario usuario) {
       String query = "FROM Usuario WHERE nombreusuario = :nombreusuario";

        List<Usuario> lista = entityManager.createQuery(query)
                .setParameter("nombreusuario", usuario.getNombreusuario())
                .getResultList();

        if(lista.isEmpty()){
            return null;
        }
        else {
            String password = lista.get(0).getPasswordusuario();
            Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);

            if(argon2.verify(password, usuario.getPasswordusuario())) {
                return lista.get(0);
            }
            else{
                return null;
            }
        }
    }
}
