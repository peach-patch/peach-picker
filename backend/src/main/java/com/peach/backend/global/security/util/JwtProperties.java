package com.peach.backend.global.security.util;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties("jwt")
public class JwtProperties {

    private Long accessTime;
    private String prefix;
    private String header;
    private String secretKey;
}
