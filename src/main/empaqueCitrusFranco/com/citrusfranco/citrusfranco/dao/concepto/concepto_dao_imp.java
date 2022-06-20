package com.citrusfranco.citrusfranco.dao.concepto;

import com.citrusfranco.citrusfranco.models.Concepto;
import com.citrusfranco.citrusfranco.models.TipoEmpleado;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class concepto_dao_imp implements concepto_dao{

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Concepto> getConcepto() {
        String query = "FROM Concepto";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public Concepto getConcepto(long id) {
        String query = "FROM Concepto WHERE id = "+id+"";
        return (Concepto) entityManager.createQuery(query).getSingleResult();
    }

    @Override
    public void eliminarConcepto(long id) {
        Concepto concepto = entityManager.find(Concepto.class, id);
        entityManager.remove(concepto);
    }

    @Override
    public void registrarConcepto(Concepto concepto) {
        entityManager.merge(concepto);
    }
}
