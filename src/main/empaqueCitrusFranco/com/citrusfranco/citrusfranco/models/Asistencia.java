package com.citrusfranco.citrusfranco.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.jpa.repository.Temporal;

import javax.persistence.*;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

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
    private Timestamp entrada;


    @Getter @Setter @Column(name = "salida")
    private Timestamp salida;

}