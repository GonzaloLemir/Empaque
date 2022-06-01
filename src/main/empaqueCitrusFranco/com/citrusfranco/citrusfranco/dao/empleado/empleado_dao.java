package com.citrusfranco.citrusfranco.dao.empleado;

import com.citrusfranco.citrusfranco.models.Empleado;
import com.citrusfranco.citrusfranco.models.Sector;

import java.util.List;

public interface empleado_dao {

    List<Empleado> getEmpleado();

    Empleado getEmpleado(long id);

    void eliminarEmpleado(long id);

    void registrarEmpleado(Empleado empleado);
}
