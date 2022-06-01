package com.citrusfranco.citrusfranco.controllers;

import com.citrusfranco.citrusfranco.dao.empleado.empleado_dao;
import com.citrusfranco.citrusfranco.models.Empleado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EmpleadoController {

    @Autowired
    private empleado_dao Empleado_dao;

    @RequestMapping(value = "empleados", method = RequestMethod.GET)
    public List<Empleado> getEmpleado(){
        return Empleado_dao.getEmpleado();
    }

    @RequestMapping(value = "empleado", method = RequestMethod.POST)
    public void registrarEmpleado(@RequestBody Empleado empleado){
        Empleado_dao.registrarEmpleado(empleado);
    }

    @RequestMapping(value = "empleado/{id}", method = RequestMethod.GET)
    public Empleado getEmpleado(@PathVariable long id){
        return Empleado_dao.getEmpleado(id);
    }

    @RequestMapping(value = "empleado/{id}", method = RequestMethod.DELETE)
    public void eliminarEmpleado(@PathVariable long id){
        Empleado_dao.eliminarEmpleado(id);
    }
}
