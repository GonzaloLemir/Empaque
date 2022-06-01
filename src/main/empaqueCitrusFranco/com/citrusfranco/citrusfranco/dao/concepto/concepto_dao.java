package com.citrusfranco.citrusfranco.dao.concepto;

import com.citrusfranco.citrusfranco.models.Concepto;

import java.util.List;

public interface concepto_dao {

    List<Concepto> getConcepto();

    Concepto getConcepto(long id);

    void eliminarConcepto(long id);

    void registrarConcepto(Concepto concepto);

}
