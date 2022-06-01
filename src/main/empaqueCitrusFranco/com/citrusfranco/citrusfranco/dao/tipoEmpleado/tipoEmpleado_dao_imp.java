package com.citrusfranco.citrusfranco.dao.tipoEmpleado;

import com.citrusfranco.citrusfranco.models.TipoEmpleado;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class tipoEmpleado_dao_imp implements tipoEmpleado_dao {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<TipoEmpleado> getTipoEmpleados() {
        String query = "FROM tipoempleado";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public TipoEmpleado getTipoEmpleado(long id) {
        String query = "FROM tipoempleado WHERE id = "+id+"";
        return (TipoEmpleado) entityManager.createQuery(query).getSingleResult();
    }

    @Override
    public void eliminarTipoEmpleado(long id) {
        TipoEmpleado tipoEmpleado = entityManager.find(TipoEmpleado.class, id);
        entityManager.remove(tipoEmpleado);
    }

    @Override
    public void registrarTipoEmpleado(TipoEmpleado tipoEmpleado) {
        entityManager.merge(tipoEmpleado);
    }
}