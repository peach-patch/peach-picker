package com.peach.backend.domain.drawing.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@ToString
@NoArgsConstructor
public class Participant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String name;
    private String phone;

    @ManyToOne
    private Drawing drawing;

    @Builder
    public Participant(String email, String name, String phone, Drawing drawing) {
        this.email = email;
        this.name = name;
        this.phone = phone;
        this.drawing = drawing;
    }
}
