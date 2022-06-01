package com.citrusfranco.citrusfranco.controllers;

import com.citrusfranco.citrusfranco.dao.asistencia.*;
import com.citrusfranco.citrusfranco.models.Asistencia;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AsistenciaController {

    @Autowired
    private asistencia_dao Asistencia_dao;

    @RequestMapping(value = "asistencias", method = RequestMethod.GET)
    public List<Asistencia> getAsistencia(){
        return Asistencia_dao.getAsistencia();
    }

    @RequestMapping(value = "asistencia", method = RequestMethod.POST)
    public void registrarAsistencia(@RequestBody Asistencia concepto){
        Asistencia_dao.registrarAsistencia(concepto);
    }

    @RequestMapping(value = "asistencia/{id}", method = RequestMethod.GET)
    public Asistencia getAsistencia(@PathVariable long id){
        return Asistencia_dao.getAsistencia(id);
    }

    @RequestMapping(value = "asistencia/{id}", method = RequestMethod.DELETE)
    public void eliminarAsistencia(@PathVariable long id){
        Asistencia_dao.eliminarAsistencia(id);
    }
}
