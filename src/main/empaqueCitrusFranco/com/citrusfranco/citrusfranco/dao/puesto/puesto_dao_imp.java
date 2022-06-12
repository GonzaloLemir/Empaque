package com.citrusfranco.citrusfranco.dao.puesto;

import com.citrusfranco.citrusfranco.models.Puesto;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class puesto_dao_imp implements puesto_dao{
    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Puesto> getPuestos() {
        String query = "FROM Puesto";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public Puesto getPuesto(long id) {
        String query = "FROM Puesto WHERE id = "+id+"";
        return (Puesto) entityManager.createQuery(query).getSingleResult();
    }

    @Override
    public void eliminarPuesto(long id) {
        Puesto puesto = entityManager.find(Puesto.class, id);
        entityManager.remove(puesto);
    }

    @Override
    public void registrarPuesto(Puesto puesto) {
        entityManager.merge(puesto);
    }
}
