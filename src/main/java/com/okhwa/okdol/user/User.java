package com.okhwa.okdol.user;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "user")
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    private String password;
    private String username;
    private LocalDate birth;
    private String phone;

    @Enumerated(EnumType.STRING)
    private Role role;

    private Boolean enabled;
}
