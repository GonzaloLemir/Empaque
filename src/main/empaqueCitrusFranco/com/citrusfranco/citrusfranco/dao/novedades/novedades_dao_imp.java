package com.citrusfranco.citrusfranco.dao.novedades;

import com.citrusfranco.citrusfranco.models.Novedades;
import com.citrusfranco.citrusfranco.models.Sector;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class novedades_dao_imp implements novedades_dao{

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Novedades> getNovedades() {
        String query = "FROM novedades";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public Novedades getNovedades(long id) {
        String query = "FROM novedades WHERE id = "+id+"";
        return (Novedades) entityManager.createQuery(query).getSingleResult();
    }

    @Override
    public void eliminarNovedades(long id) {
        Novedades novedades = entityManager.find(Novedades.class, id);
        entityManager.remove(novedades);
    }

    @Override
    public void registrarNovedades(Novedades novedades) {
        entityManager.merge(novedades);
    }
}
