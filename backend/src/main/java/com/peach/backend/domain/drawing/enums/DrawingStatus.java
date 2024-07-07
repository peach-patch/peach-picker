package com.peach.backend.domain.drawing.enums;

import lombok.Getter;

@Getter
public enum DrawingStatus {
    STANDBY("추첨 대기"), ONGOING("추첨 중"), COMPLETE("완료");

    private final String name;

    DrawingStatus(String name) {
        this.name = name;
    }
}
