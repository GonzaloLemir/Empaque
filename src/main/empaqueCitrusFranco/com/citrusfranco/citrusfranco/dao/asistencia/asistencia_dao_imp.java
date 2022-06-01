package com.citrusfranco.citrusfranco.dao.asistencia;

import com.citrusfranco.citrusfranco.models.Asistencia;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class asistencia_dao_imp implements asistencia_dao{

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Asistencia> getAsistencia() {
        String query = "FROM asistencia";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public Asistencia getAsistencia(long id) {
        String query = "FROM asistencia WHERE id = "+id+"";
        return (Asistencia) entityManager.createQuery(query).getSingleResult();
    }

    @Override
    public void eliminarAsistencia(long id) {
        Asistencia asistencia = entityManager.find(Asistencia.class, id);
        entityManager.remove(asistencia);
    }

    @Override
    public void registrarAsistencia(Asistencia asistencia) {
        entityManager.merge(asistencia);
    }
}
