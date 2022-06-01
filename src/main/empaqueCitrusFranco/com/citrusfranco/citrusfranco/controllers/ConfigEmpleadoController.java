package com.citrusfranco.citrusfranco.controllers;

import com.citrusfranco.citrusfranco.dao.configEmpleado.configEmpleado_dao;
import com.citrusfranco.citrusfranco.models.ConfigEmpleado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ConfigEmpleadoController {

    @Autowired
    private configEmpleado_dao ConfigEmpleado_dao;

    @RequestMapping(value = "configempleados", method = RequestMethod.GET)
    public List<ConfigEmpleado> getConfigEmpleado(){
        return ConfigEmpleado_dao.getConfigEmpleado();
    }

    @RequestMapping(value = "configempleado", method = RequestMethod.POST)
    public void registrarConfigEmpleado(@RequestBody ConfigEmpleado configEmpleado){
        ConfigEmpleado_dao.registrarConfigEmpleado(configEmpleado);
    }

    @RequestMapping(value = "configempleado/{id}", method = RequestMethod.GET)
    public ConfigEmpleado getConfigEmpleado(@PathVariable long id){
        return ConfigEmpleado_dao.getConfigEmpleado(id);
    }

    @RequestMapping(value = "configempleado/{id}", method = RequestMethod.DELETE)
    public void eliminarConfigEmpleado(@PathVariable long id){
        ConfigEmpleado_dao.eliminarConfigEmpleado(id);
    }
}
