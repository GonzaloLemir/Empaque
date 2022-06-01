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
@Table(name = "configuracionempleado")
@ToString @EqualsAndHashCode
public class ConfigEmpleado {

    @Id
    @Getter @Setter @Column(name = "id")
    private long id;

    @Getter @Setter @Column(name = "codigoempleado")
    private long codigoempleado;

    @Getter @Setter @Column(name = "conceptoid")
    private long conceptoid;

}