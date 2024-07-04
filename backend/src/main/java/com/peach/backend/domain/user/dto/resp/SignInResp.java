package com.peach.backend.domain.user.dto.resp;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SignInResp {

    private String accessToken;

}
