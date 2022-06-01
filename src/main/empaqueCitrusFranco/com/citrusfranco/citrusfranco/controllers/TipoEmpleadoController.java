package com.citrusfranco.citrusfranco.controllers;

import com.citrusfranco.citrusfranco.dao.tipoEmpleado.tipoEmpleado_dao;
import com.citrusfranco.citrusfranco.models.TipoEmpleado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TipoEmpleadoController {

    @Autowired
    private tipoEmpleado_dao TipoEmpleado_dao;

    @RequestMapping(value = "tipoempleados", method = RequestMethod.GET)
    public List<TipoEmpleado> getTipoEmpleado(){
        return TipoEmpleado_dao.getTipoEmpleados();
    }

    @RequestMapping(value = "tipoempleado", method = RequestMethod.POST)
    public void registrarTipoEmpleado(@RequestBody TipoEmpleado tipoEmpleado){
        TipoEmpleado_dao.registrarTipoEmpleado(tipoEmpleado);
    }

    @RequestMapping(value = "tipoempleado/{id}", method = RequestMethod.GET)
    public TipoEmpleado getTipoEmpleado(@PathVariable long id){
        return TipoEmpleado_dao.getTipoEmpleado(id);
    }

    @RequestMapping(value = "tipoempleado/{id}", method = RequestMethod.DELETE)
    public void eliminarTipoEmpleado(@PathVariable long id){
        TipoEmpleado_dao.eliminarTipoEmpleado(id);
    }
}
