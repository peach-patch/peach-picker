package com.peach.backend.global.security.util;

import com.peach.backend.domain.user.entity.User;
import com.peach.backend.domain.user.service.CustomUserDetailsService;
import com.peach.backend.global.security.dto.CustomUserDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtTokenProvider {
    @Value("${jwt.access-token-expire-time}")
    private Long expireTime;
    @Value("${jwt.secret}")
    private String secretKey;
    private final CustomUserDetailsService customUserDetailsService;


    public String createJwt(String email) {
        Claims claims = Jwts.claims();
        claims.put("email", email);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expireTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
        String email = claims.get("email").toString();

        UserDetails principal = customUserDetailsService.loadUserByUsername(email);

        return new UsernamePasswordAuthenticationToken(principal, "", principal.getAuthorities());
    }

    public User getUserByToken(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
        String email = claims.get("email").toString();

        CustomUserDetails userDetails = customUserDetailsService.loadUserByUsername(email);
        return userDetails.getUser();
    }

    public int validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
            return 1;
        } catch (Exception e) {
            return -1;
        }
    }
}

