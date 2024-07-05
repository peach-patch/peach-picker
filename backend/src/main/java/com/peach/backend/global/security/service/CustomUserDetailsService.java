package com.peach.backend.global.security.service;

import com.peach.backend.domain.user.entity.User;
import com.peach.backend.global.security.dto.CustomUserDetails;
import com.peach.backend.global.security.util.CustomUserUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {

    private final CustomUserUtil customUserUtil;

    @Override
    public CustomUserDetails loadUserByUsername(final String email) throws UsernameNotFoundException {
        User cachedUser = customUserUtil.getUser(email);

        return new CustomUserDetails(cachedUser);
    }
}