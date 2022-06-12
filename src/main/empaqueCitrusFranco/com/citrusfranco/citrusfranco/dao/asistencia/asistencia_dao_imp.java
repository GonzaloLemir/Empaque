package com.citrusfranco.citrusfranco.dao.asistencia;

import com.citrusfranco.citrusfranco.models.Asistencia;
import com.citrusfranco.citrusfranco.models.Empleado;
import com.citrusfranco.citrusfranco.models.Usuario;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.TimeZone;

@Repository
@Transactional
public class asistencia_dao_imp implements asistencia_dao{

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Asistencia> getAsistencia() {
        String query = "FROM Asistencia";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public Asistencia getAsistencia(long id) {
        String query = "FROM Asistencia WHERE id = "+id+"";
        return (Asistencia) entityManager.createQuery(query).getSingleResult();
    }

    @Override
    public Asistencia ultimoRegistro(long idEmpleado) {
        String query = "FROM Asistencia WHERE codigoempleado = "+idEmpleado+"";

        List<Asistencia> lista = entityManager.createQuery(query).getResultList();
        if(lista.size() == 0){return null;}
        return lista.get(lista.size()-1);
    }

    @Override
    public void eliminarAsistencia(long id) {
        Asistencia asistencia = entityManager.find(Asistencia.class, id);
        entityManager.remove(asistencia);
    }

    @Override
    public void registrarAsistencia(int idEmpleado) {

        TimeZone.setDefault(TimeZone.getTimeZone("America/Argentina/Tucuman"));
        Date dt = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault());
        String currentTime = sdf.format(dt);
        Timestamp newTime = Timestamp.valueOf(currentTime);
        newTime.setHours(newTime.getHours()-3);

        Asistencia asistencia = new Asistencia();
        asistencia.setCodigoempleado(idEmpleado);
        asistencia.setEntrada(newTime);
        asistencia.setSalida(null);

        entityManager.merge(asistencia);
    }

    @Override
    public void registrarAsistenciaSalida(int idEmpleado) {
        Asistencia asistenciaEncontrada = ultimoRegistro(idEmpleado);
        Asistencia asistencia = entityManager.find(Asistencia.class, asistenciaEncontrada.getId());

        TimeZone.setDefault(TimeZone.getTimeZone("America/Argentina/Tucuman"));
        Date dt = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault());
        String currentTime = sdf.format(dt);
        Timestamp newTime = Timestamp.valueOf(currentTime);
        newTime.setHours(newTime.getHours()-3);

        asistencia.setSalida(newTime);
        entityManager.merge(asistencia);

    }
}
