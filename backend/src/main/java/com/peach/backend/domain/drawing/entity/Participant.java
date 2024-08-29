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
    private Boolean isWinner;
    private long randomNums;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "drawing_id", nullable = false)
    private Drawing drawing;

    @Builder
    public Participant(String email, String name, String phone, Drawing drawing) {
        this.email = email;
        this.name = name;
        this.phone = phone;
        this.drawing = drawing;
        this.isWinner = false;
    }

    public void updateRandomNums(Long randomNums) {
        this.randomNums = randomNums;
    }

    public void updateIsWinner(Boolean isWinner) {
        this.isWinner = isWinner;
    }
}
