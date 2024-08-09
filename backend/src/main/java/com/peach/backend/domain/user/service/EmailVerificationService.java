package com.peach.backend.domain.user.service;

import com.peach.backend.domain.user.dto.mail.EmailVerifyingDto;
import com.peach.backend.domain.user.util.EmailUtil;
import com.woo.exception.util.BizException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailVerificationService {

    private final EmailUtil emailUtil;
    private final RedisTemplate<String, Object> redisTemplate;

    public void sendVerificationEmail(String email) {
        String verificationCode = generateRandomCode(8);

        EmailVerifyingDto emailVerifyingDto = EmailVerifyingDto.builder().code(verificationCode).status(false).build();
        redisTemplate.opsForValue().set("verify:" + email, emailVerifyingDto, 300, TimeUnit.SECONDS);
        emailUtil.sendVerificationCode(email, verificationCode);
    }

    public void verifyingCode(String email, String code) {
        EmailVerifyingDto emailVerifyingDto = (EmailVerifyingDto) redisTemplate.opsForValue().get("verify:" + email);
        if(emailVerifyingDto == null || !emailVerifyingDto.getCode().equals(code)) throw new BizException("email_verify_fail");

        emailVerifyingDto.setStatus(true);
        redisTemplate.opsForValue().set("verify:" + email, emailVerifyingDto, 300, TimeUnit.SECONDS);
    }

    private String generateRandomCode(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random = new Random();

        return IntStream.range(0, length)
                .mapToObj(i -> characters.charAt(random.nextInt(characters.length())))
                .map(Object::toString)
                .collect(Collectors.joining());
    }

}
