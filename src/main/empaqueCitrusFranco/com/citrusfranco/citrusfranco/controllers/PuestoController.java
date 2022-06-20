package com.citrusfranco.citrusfranco.controllers;

import com.citrusfranco.citrusfranco.dao.puesto.puesto_dao;
import com.citrusfranco.citrusfranco.models.Puesto;
import com.citrusfranco.citrusfranco.models.TipoEmpleado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PuestoController {
    @Autowired
    private puesto_dao Puesto_dao;

    @RequestMapping(value = "/puestos", method = RequestMethod.GET)
    public List<Puesto> getPuestos(){ return Puesto_dao.getPuestos();}

    @RequestMapping(value = "/puesto", method = RequestMethod.POST)
    public void registrarPuesto(@RequestBody Puesto puesto){
        Puesto_dao.registrarPuesto(puesto);
    }

    @RequestMapping(value = "/puesto", method = RequestMethod.PUT)
    public void modificarPuesto(@RequestBody Puesto puesto){
        Puesto_dao.registrarPuesto(puesto);
    }

    @RequestMapping(value = "puesto/{id}", method = RequestMethod.GET)
    public Puesto getPuesto(@PathVariable long id){
        return Puesto_dao.getPuesto(id);
    }

    @RequestMapping(value = "/puesto/{id}", method = RequestMethod.DELETE)
    public void eliminarPuesto(@PathVariable long id){
        Puesto_dao.eliminarPuesto(id);
    }
}
