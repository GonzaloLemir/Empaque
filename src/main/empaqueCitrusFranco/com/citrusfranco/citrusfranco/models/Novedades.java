package com.citrusfranco.citrusfranco.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "puesto")
@ToString @EqualsAndHashCode
public class Novedades {

    @Id
    @Getter @Setter @Column(name = "id")
    private long id;

    @Getter @Setter @Column(name = "novedadfecha")
    private LocalDate novedadfecha;

    @Getter @Setter @Column(name = "codigoempleado")
    private long codigoempleado;

    @Getter @Setter @Column(name = "conceptoid")
    private long conceptoid;

    @Getter @Setter @Column(name = "cantidad")
    private long cantidad;

    @Getter @Setter @Column(name = "montounitario")
    private float montounitario;

    @Getter @Setter @Column(name = "montototal")
    private float montototal;

}
