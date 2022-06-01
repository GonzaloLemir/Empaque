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
@Table(name = "asistencia")
@ToString @EqualsAndHashCode
public class Asistencia {

    @Id
    @Getter @Setter @Column(name = "id")
    private long id;

    @Getter @Setter @Column(name = "codigoempleado")
    private long codigoempleado;

    @Getter @Setter @Column(name = "entrada")
    private LocalDate entrada;

    @Getter @Setter @Column(name = "salida")
    private LocalDate salida;

}