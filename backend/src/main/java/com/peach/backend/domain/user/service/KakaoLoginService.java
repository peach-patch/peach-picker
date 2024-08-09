package com.peach.backend.domain.user.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.peach.backend.domain.user.dto.kakao.KakaoProfile;
import com.peach.backend.domain.user.dto.kakao.KakaoToken;
import com.peach.backend.domain.user.dto.kakao.KakaoCodeReq;
import com.peach.backend.domain.user.entity.User;
import com.peach.backend.domain.user.entity.repository.UserRepository;
import com.peach.backend.domain.user.enums.Role;
import com.woo.exception.util.BizException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class KakaoLoginService {
    private final UserRepository userRepository;
    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String kakaoClientId;
    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String kakaoRedirectUri;
    @Value("${dev.oauth2.redirect.kakao}")
    private String devKakaoRedirectUri;
    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    private String kakaoClientSecret;

    public User kakaoLogin(KakaoCodeReq req) {
        KakaoToken kakaoUserToken = createKakaoToken(req);
        KakaoProfile kakaoProfile;
        try {
            kakaoProfile = getKakaoInfo(kakaoUserToken.getAccess_token());
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        // 기존 회원이면
        if (userRepository.existsByEmail(kakaoProfile.getKakao_account().email)) {
            User user = userRepository.findUserByEmail(kakaoProfile.getKakao_account().email)
                    .orElseThrow(() -> new BizException("user_not_found"));

            user.updateRecentLoggedIn();
            userRepository.save(user);

            return user;
        } else {
//            if (kakaoProfile.getKakao_account().profile.profile_image_url == null) {
//                kakaoProfile(DEFAULT_PROFILE);
//            }
            Random random = new Random();

            User user = User.builder()
                    .email(kakaoProfile.getKakao_account().email)
                    .name(kakaoProfile.properties.nickname)
                    .RecentLoggedIn(LocalDateTime.now())
                    .provider("kakao")
                    .profileImgUrl(kakaoProfile.properties.profile_image)
                    .role(Role.USER)
                    .password(String.valueOf(random.nextInt(Integer.MAX_VALUE)))
                    .build();
            userRepository.save(user);
            return user;
        }
    }

    public KakaoToken createKakaoToken(KakaoCodeReq kakaoReq) {
        MultiValueMap<String , String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id",kakaoClientId );
        params.add("redirect_uri", kakaoReq.getClient_env() != null && kakaoReq.getClient_env().equals("dev") ? devKakaoRedirectUri : kakaoRedirectUri);
        params.add("code", kakaoReq.getCode());
        params.add("client_secret", kakaoClientSecret);

        WebClient webClient = WebClient.builder().build();
        String url = "https://kauth.kakao.com/oauth/token";

        String resp = webClient.post()
                .uri(url)
                .header("Content-Type", "application/x-www-form-urlencoded")
                .body(BodyInserters.fromFormData(params))
                .retrieve()
                .bodyToMono(String.class)
                .block();

        ObjectMapper objectMapper = new ObjectMapper();
        KakaoToken kakaoToken =null;

        try {
            kakaoToken = objectMapper.readValue(resp, KakaoToken.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return kakaoToken;
    }

    public KakaoProfile getKakaoInfo(String accessToken) throws JsonProcessingException {

        WebClient webClient = WebClient.builder().build();
        String url = "https://kapi.kakao.com/v2/user/me";

        String resp = webClient.post()
                .uri(url)
                .header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8")
                .header("Authorization", "Bearer " + accessToken)
                .retrieve()
                .bodyToMono(String.class)
                .block();


        ObjectMapper objectMapper = new ObjectMapper();

        return objectMapper.readValue(resp, KakaoProfile.class);
    }
}
