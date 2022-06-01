package com.citrusfranco.citrusfranco.dao.tipoEmpleado;

import com.citrusfranco.citrusfranco.models.TipoEmpleado;

import java.util.List;

public interface tipoEmpleado_dao {

    List<TipoEmpleado> getTipoEmpleados();

    TipoEmpleado getTipoEmpleado(long id);

    void eliminarTipoEmpleado(long id);

    void registrarTipoEmpleado(TipoEmpleado tipoEmpleado);

}
