package com.citrusfranco.citrusfranco.dao.configEmpleado;

import com.citrusfranco.citrusfranco.models.ConfigEmpleado;
import com.citrusfranco.citrusfranco.models.Sector;

import java.util.List;

public interface configEmpleado_dao {

    List<ConfigEmpleado> getConfigEmpleado();

    ConfigEmpleado getConfigEmpleado(long id);

    void eliminarConfigEmpleado(long id);

    void registrarConfigEmpleado(ConfigEmpleado configEmpleado);
}
