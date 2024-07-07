package com.peach.backend.domain.drawing.enums;

import lombok.Getter;

@Getter
public enum DrawingType {
    LOTTERY("로또"), PINBALL("핀볼"), ROULETTE("룰렛");

    private final String name;

    DrawingType(String name) {
        this.name = name;
    }
}
