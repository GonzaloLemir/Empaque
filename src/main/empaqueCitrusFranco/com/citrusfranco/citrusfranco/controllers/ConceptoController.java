package com.citrusfranco.citrusfranco.controllers;

import com.citrusfranco.citrusfranco.dao.concepto.concepto_dao;
import com.citrusfranco.citrusfranco.models.Concepto;
import com.citrusfranco.citrusfranco.models.Sector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ConceptoController {

    @Autowired
    private concepto_dao Concepto_dao;

    @RequestMapping(value = "/conceptos", method = RequestMethod.GET)
    public List<Concepto> getConcepto(){
        return Concepto_dao.getConcepto();
    }

    @RequestMapping(value = "/concepto", method = RequestMethod.POST)
    public void registrarConcepto(@RequestBody Concepto concepto){
        Concepto_dao.registrarConcepto(concepto);
    }

    @RequestMapping(value = "/concepto", method = RequestMethod.PUT)
    public void modificarSector(@RequestBody Concepto concepto){
        Concepto_dao.registrarConcepto(concepto);
    }

    @RequestMapping(value = "concepto/{id}", method = RequestMethod.GET)
    public Concepto getConfigConcepto(@PathVariable long id){
        return Concepto_dao.getConcepto(id);
    }

    @RequestMapping(value = "/concepto/{id}", method = RequestMethod.DELETE)
    public void eliminarConcepto(@PathVariable long id){
        Concepto_dao.eliminarConcepto(id);
    }
}
