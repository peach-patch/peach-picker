package com.peach.backend.domain.drawing.dto.req;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
public class DrawingSeedReq {
    private LocalDateTime clientTime;
}
