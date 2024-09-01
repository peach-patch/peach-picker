package com.peach.backend.domain.user.service;

import com.peach.backend.domain.user.dto.mail.EmailVerifyingDto;
import com.peach.backend.domain.user.dto.req.SignUpReq;
import com.peach.backend.domain.user.entity.User;
import com.peach.backend.domain.user.entity.repository.UserRepository;
import com.woo.exception.util.BizException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CreateUserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final RedisTemplate<String, Object> redisTemplate;


    public void createUser(final SignUpReq req) {
        // 이메일 중복 체크
        if (duplicateEmailCheck(req.getEmail())) throw new BizException("user_already_exist");

        // 탈퇴 했던 계정이라면 탈퇴 시간을 기준으로 현재까지 7일이 지났는지 확인한다.
        Optional<User> user = userRepository.findTopByEmailOrderByIdDesc(req.getEmail());
        if (user.isPresent() && user.get().isDeleted() && isWithin7Days(user.get().getDeletedAt())) {
            throw new BizException("user_recently_left");
        }


        EmailVerifyingDto emailVerifyingDto = (EmailVerifyingDto) redisTemplate.opsForValue().get("verify:" + req.getEmail());
        if (emailVerifyingDto == null || !emailVerifyingDto.getStatus()) throw new BizException("email_not_verified");

        userRepository.save(req.toEntity(passwordEncoder));
    }


//    private Boolean duplicateEmailCheck(String email) {
//        return userRepository.existsByEmail(email);
//    }

    // 삭제되지 않은 회원 중에 이메일 존재 (중복)
    private Boolean duplicateEmailCheck(String email) {
        return userRepository.existsByEmailAndIsDeletedFalse(email);
    }


    private boolean isWithin7Days(LocalDateTime specificDateTime) {
        long secondsBetween = ChronoUnit.SECONDS.between(specificDateTime, LocalDateTime.now());
        long secondsIn7Days = 7 * 24 * 60 * 60;
        return secondsBetween < secondsIn7Days;
    }

}
