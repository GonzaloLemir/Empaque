package com.citrusfranco.citrusfranco.dao.sector;

import com.citrusfranco.citrusfranco.models.Concepto;
import com.citrusfranco.citrusfranco.models.Sector;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class sector_dao_imp implements sector_dao{

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Sector> getSectores() {
        String query = "FROM Sector";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public Sector getSector(long id) {
        String query = "FROM Sector WHERE id = "+id+"";
        return (Sector) entityManager.createQuery(query).getSingleResult();
    }

    @Override
    public void eliminarSector(long id) {
        Sector sector = entityManager.find(Sector.class, id);
        entityManager.remove(sector);
    }

    @Override
    public void registrarSector(Sector sector) {
        entityManager.merge(sector);
    }
}
