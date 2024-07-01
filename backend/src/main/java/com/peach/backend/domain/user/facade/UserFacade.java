package com.peach.backend.domain.user.facade;

import com.peach.backend.domain.user.dto.req.SignUpReq;
import com.peach.backend.domain.user.service.CreateUserService;
import com.peach.backend.domain.user.service.GetUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserFacade {

    private final CreateUserService createUserService;
    private final GetUserService getUserService;

    public void createUser(SignUpReq req) {
        createUserService.createUser(req);
    }

}
