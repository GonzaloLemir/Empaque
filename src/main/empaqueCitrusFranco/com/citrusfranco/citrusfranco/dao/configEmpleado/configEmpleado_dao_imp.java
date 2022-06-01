package com.citrusfranco.citrusfranco.dao.configEmpleado;

import com.citrusfranco.citrusfranco.models.ConfigEmpleado;
import com.citrusfranco.citrusfranco.models.Sector;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class configEmpleado_dao_imp implements configEmpleado_dao{

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<ConfigEmpleado> getConfigEmpleado() {
        String query = "FROM configuracionempleado";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public ConfigEmpleado getConfigEmpleado(long id) {
        String query = "FROM configuracionempleado WHERE id = "+id+"";
        return (ConfigEmpleado) entityManager.createQuery(query).getSingleResult();
    }

    @Override
    public void eliminarConfigEmpleado(long id) {
        ConfigEmpleado configEmpleado = entityManager.find(ConfigEmpleado.class, id);
        entityManager.remove(configEmpleado);
    }

    @Override
    public void registrarConfigEmpleado(ConfigEmpleado configEmpleado) {
        entityManager.merge(configEmpleado);
    }
}
