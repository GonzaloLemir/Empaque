package com.citrusfranco.citrusfranco.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "empleado")
@ToString @EqualsAndHashCode
public class Empleado {

    @Id
    @Getter @Setter @Column(name = "id")
    private long id;

    @Getter @Setter @Column(name = "codigoempleado")
    private long codigoempleado;

    @Getter @Setter @Column(name = "nombreapellido")
    private String nombre;

    @Getter @Setter @Column(name = "email")
    private String email;

    @Getter @Setter @Column(name = "telefono")
    private long telefono;

    @Getter @Setter @Column(name = "direccion")
    private String direccion;

    @Getter @Setter @Column(name = "foto")
    private byte[] foto;

    @Getter @Setter @Column(name = "puestoid")
    private long puestoid;

    @Getter @Setter @Column(name = "sectorid")
    private long sectorid;

    @Getter @Setter @Column(name = "tipoempleadoid")
    private long tipoempleadoid;

}