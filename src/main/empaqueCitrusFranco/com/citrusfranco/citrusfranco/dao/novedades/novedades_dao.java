package com.citrusfranco.citrusfranco.dao.novedades;

import com.citrusfranco.citrusfranco.models.Novedades;
import com.citrusfranco.citrusfranco.models.Sector;

import java.util.List;

public interface novedades_dao {


    List<Novedades> getNovedades();

    Novedades getNovedades(long id);

    void eliminarNovedades(long id);

    void registrarNovedades(Novedades novedades);
}
