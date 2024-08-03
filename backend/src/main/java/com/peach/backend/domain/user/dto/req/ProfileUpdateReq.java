package com.peach.backend.domain.user.dto.req;

import lombok.Data;

@Data
public class ProfileUpdateReq {

    private String password;
    private String name;

}