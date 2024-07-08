package com.peach.backend.global.security.filter;

import com.peach.backend.domain.user.entity.User;
import com.peach.backend.domain.user.enums.Role;
import com.peach.backend.global.security.dto.CustomUserDetails;
import com.peach.backend.global.security.service.CustomUserDetailsService;
import com.peach.backend.global.security.service.JwtValidateService;
import com.peach.backend.global.security.util.JwtTokenProvider;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final CustomUserDetailsService customUserDetailsService;
    private final JwtTokenProvider jwtTokenProvider;
    private final JwtValidateService jwtValidateService;

    private final static List<String> PERMIT_URL = List.of("/users/sign-up", "/users/sign-in");
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if(!PERMIT_URL.contains(request.getServletPath())) {
            String accessToken = jwtTokenProvider.resolveToken(request);
            if (accessToken != null) setAuthentication(accessToken, request);
            else setAnonymousAuthentication(request);
        }

        filterChain.doFilter(request, response);
    }

    private void setAuthentication(String token, HttpServletRequest request) throws ExpiredJwtException {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(jwtValidateService.getUserEmail(token));
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private void setAnonymousAuthentication(HttpServletRequest request) {
        UserDetails userDetails = new CustomUserDetails(User.builder().name("ANONYMOUS").role(Role.USER).build());
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

}
