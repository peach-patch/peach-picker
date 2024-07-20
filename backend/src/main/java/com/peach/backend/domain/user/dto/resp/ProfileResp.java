package com.peach.backend.domain.user.dto.resp;

import com.peach.backend.domain.user.entity.User;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileResp {

    private String name;
    private String email;
    private String profileUrl;

}
