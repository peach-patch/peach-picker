package com.peach.backend.domain.user.util;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Component
@Slf4j
@RequiredArgsConstructor
public class EmailUtil {

    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine springTemplateEngine;

    @Async
    public void sendVerificationCode(String email, String code){
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            mimeMessageHelper.setTo(email); // 메일 수신자
            mimeMessageHelper.setSubject("피치피커 인증번호"); // 메일 제목
            String context = setCodeContext(code);
            mimeMessageHelper.setText(context, true); // 메일 본문 내용, HTML 여부
            new Thread(() -> sendEmail(mimeMessage)).start();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    private String setCodeContext(String code) {
        Context context = new Context();
        context.setVariable("code", code);
        return springTemplateEngine.process("code", context);
    }

    public void sendEmail(MimeMessage mimeMessage) {
        javaMailSender.send(mimeMessage);
    }
}
