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
@Table(name = "concepto")
@ToString @EqualsAndHashCode
public class Concepto {

    @Id
    @Getter @Setter @Column(name = "id")
    private long id;

    @Getter @Setter @Column(name = "conceptonombre")
    private String conceptonombre;

    @Getter @Setter @Column(name = "debehaber")
    private boolean debehaber;

    @Getter @Setter @Column(name = "monto")
    private float monto;

}