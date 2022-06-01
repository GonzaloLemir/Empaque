package com.citrusfranco.citrusfranco.dao.empleado;

import com.citrusfranco.citrusfranco.models.Empleado;
import com.citrusfranco.citrusfranco.models.Sector;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class empleado_dao_imp implements empleado_dao{

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Empleado> getEmpleado() {
        String query = "FROM empleado";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public Empleado getEmpleado(long id) {
        String query = "FROM empleado WHERE codigoEmpleado = "+id+"";
        return (Empleado) entityManager.createQuery(query).getSingleResult();
    }

    @Override
    public void eliminarEmpleado(long id) {
        Empleado empleado = entityManager.find(Empleado.class, id);
        entityManager.remove(empleado);
    }

    @Override
    public void registrarEmpleado(Empleado empleado) {
        entityManager.merge(empleado);
    }
}
