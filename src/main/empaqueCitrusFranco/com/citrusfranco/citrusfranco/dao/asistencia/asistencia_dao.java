package com.citrusfranco.citrusfranco.dao.asistencia;

import com.citrusfranco.citrusfranco.models.Asistencia;
import com.citrusfranco.citrusfranco.models.Sector;

import java.util.List;

public interface asistencia_dao {

    List<Asistencia> getAsistencia();

    Asistencia getAsistencia(long id);

    void eliminarAsistencia(long id);

    void registrarAsistencia(Asistencia asistencia);
}
