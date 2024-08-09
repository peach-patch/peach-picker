package com.peach.backend.domain.user.dto.req;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ProfileUpdateReq {

    private String name;
    private MultipartFile profileImg;
}