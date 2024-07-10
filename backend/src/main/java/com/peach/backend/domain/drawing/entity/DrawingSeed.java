package com.peach.backend.domain.drawing.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@ToString
@Entity
public class DrawingSeed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long seedValue;
    private LocalDateTime clientTime;
    private LocalDateTime serverTime;
    private LocalDateTime createdAt;

    @Builder
    public DrawingSeed(Long seedValue, LocalDateTime clientTime, LocalDateTime serverTime) {
        this.seedValue = seedValue;
        this.clientTime = clientTime;
        this.serverTime = serverTime;
        this.createdAt = LocalDateTime.now();
    }
}
