package com.citrusfranco.citrusfranco.dao.sector;

import com.citrusfranco.citrusfranco.models.Concepto;
import com.citrusfranco.citrusfranco.models.Sector;

import java.util.List;

public interface sector_dao {

    List<Sector> getSectores();

    Sector getSector(long id);

    void eliminarSector(long id);

    void registrarSector(Sector sector);
}
