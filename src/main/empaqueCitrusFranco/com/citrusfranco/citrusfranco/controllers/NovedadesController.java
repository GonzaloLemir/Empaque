package com.citrusfranco.citrusfranco.controllers;

import com.citrusfranco.citrusfranco.dao.novedades.novedades_dao;
import com.citrusfranco.citrusfranco.models.Novedades;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NovedadesController {

    @Autowired
    private novedades_dao Novedades_dao;

    @RequestMapping(value = "novedades", method = RequestMethod.GET)
    public List<Novedades> getNovedades(){
        return Novedades_dao.getNovedades();
    }

    @RequestMapping(value = "novedades", method = RequestMethod.POST)
    public void registrarNovedades(@RequestBody Novedades novedades){
        Novedades_dao.registrarNovedades(novedades);
    }

    @RequestMapping(value = "novedades/{id}", method = RequestMethod.GET)
    public Novedades getNovedades(@PathVariable long id){
        return Novedades_dao.getNovedades(id);
    }

    @RequestMapping(value = "novedades/{id}", method = RequestMethod.DELETE)
    public void eliminarNovedades(@PathVariable long id){
        Novedades_dao.eliminarNovedades(id);
    }
}
