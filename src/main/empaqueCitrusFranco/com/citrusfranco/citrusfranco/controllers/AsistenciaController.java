package com.citrusfranco.citrusfranco.controllers;

import com.citrusfranco.citrusfranco.dao.asistencia.*;
import com.citrusfranco.citrusfranco.models.Asistencia;
import com.citrusfranco.citrusfranco.models.Usuario;
import org.json.JSONException;
import org.json.JSONObject;
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

    @RequestMapping(value = "/asistencia", method = RequestMethod.POST)
    public void registrarAsistencia(@RequestBody int idEmpleado){
        Asistencia_dao.registrarAsistencia(idEmpleado);
    }

    @RequestMapping(value = "/asistenciaSalida", method = RequestMethod.POST)
    public void registrarAsistenciaSalida(@RequestBody int idEmpleado){
        Asistencia_dao.registrarAsistenciaSalida(idEmpleado);
    }

    @RequestMapping(value = "asistencia/{id}", method = RequestMethod.GET)
    public Asistencia getAsistencia(@PathVariable long id){
        return Asistencia_dao.getAsistencia(id);
    }

    @RequestMapping(value = "asistencia/{id}", method = RequestMethod.DELETE)
    public void eliminarAsistencia(@PathVariable long id){
        Asistencia_dao.eliminarAsistencia(id);
    }

    @RequestMapping(value = "/comprobarAsistenciaEntrada", method = RequestMethod.POST)
    public String comprobarAsistenciaEntrada(@RequestBody int idEmpleado){
        Asistencia asistenciaComprobar = Asistencia_dao.ultimoRegistro(idEmpleado);
        if(asistenciaComprobar != null) {
            if(asistenciaComprobar.getSalida() != null){return "OK";}
            else {return "NO";}
        }
        else{
            return "OK";
        }
    }
    @RequestMapping(value = "/comprobarAsistenciaSalida", method = RequestMethod.POST)
    public String comprobarAsistenciaSalida(@RequestBody int idEmpleado){
        Asistencia asistenciaComprobar = Asistencia_dao.ultimoRegistro(idEmpleado);
        if(asistenciaComprobar != null) {
            if(asistenciaComprobar.getSalida() == null){return "OK";}
            else {return "NO";}
        }
        else{
            return "NO";
        }
    }
}
