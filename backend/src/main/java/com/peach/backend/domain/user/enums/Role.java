package com.peach.backend.domain.user.enums;

import lombok.Getter;

@Getter
public enum Role {
    USER("USER"),
    ADMIN("ADMIN"),
    SUPER_ADMIN("SUPER_ADMIN");

    private final String name;

    Role(String name) {
        this.name = name;
    }

}