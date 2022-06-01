package com.citrusfranco.citrusfranco.controllers;

import com.citrusfranco.citrusfranco.dao.sector.sector_dao;
import com.citrusfranco.citrusfranco.models.Sector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SectorController {

    @Autowired
    private sector_dao Sector_dao;

    @RequestMapping(value = "sectores", method = RequestMethod.GET)
    public List<Sector> getSector(){
        return Sector_dao.getSectores();
    }

    @RequestMapping(value = "sector", method = RequestMethod.POST)
    public void registrarSector(@RequestBody Sector sector){
        Sector_dao.registrarSector(sector);
    }

    @RequestMapping(value = "sector/{id}", method = RequestMethod.GET)
    public Sector getSector(@PathVariable long id){
        return Sector_dao.getSector(id);
    }

    @RequestMapping(value = "sector/{id}", method = RequestMethod.DELETE)
    public void eliminarSector(@PathVariable long id){
        Sector_dao.eliminarSector(id);
    }
}
