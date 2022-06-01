package com.citrusfranco.citrusfranco.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "usuarios")
@ToString @EqualsAndHashCode
public class Usuario {

    @Id
   // @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Getter @Setter @Column(name = "id")
    private long id;

    @Getter @Setter @Column(name = "nombreusuario")
    private String nombreusuario;

    @Getter @Setter @Column(name = "passwordusuario")
    private String passwordusuario;

    @Getter @Setter @Column(name = "esadmin")
    private String esadmin;

}
