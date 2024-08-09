package com.peach.backend.global.security.util;

import com.peach.backend.domain.user.entity.User;
import com.peach.backend.domain.user.entity.repository.UserRepository;
import com.woo.exception.util.BizException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class CustomUserUtil {

    private final UserRepository userRepository;

//    @Cacheable(cacheNames = USER_CACHE, key = "'user:' + #p0")
    public User getUser(final String email) {
        return userRepository.findUserByEmail(email).orElseThrow(() -> new BizException("user_not_found"));
    }

}
