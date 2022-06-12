package com.citrusfranco.citrusfranco.dao.puesto;

import com.citrusfranco.citrusfranco.models.Puesto;

import java.util.List;

public interface puesto_dao {

    List<Puesto> getPuestos();

    Puesto getPuesto(long id);

    void eliminarPuesto(long id);

    void registrarPuesto(Puesto puesto);

}
