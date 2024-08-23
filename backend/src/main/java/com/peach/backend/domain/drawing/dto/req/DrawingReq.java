package com.peach.backend.domain.drawing.dto.req;

import com.peach.backend.global.validator.annotation.CsvFileOnly;
import com.peach.backend.global.validator.annotation.FiveMinuteInterval;
import com.peach.backend.domain.drawing.entity.Drawing;
import com.peach.backend.domain.drawing.enums.DrawingStatus;
import com.peach.backend.domain.drawing.enums.DrawingType;
import com.peach.backend.domain.user.entity.User;
import com.peach.backend.global.validator.annotation.RequestNotNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Data
public class DrawingReq {

    private Long id;

    @NotBlank(message = "제목을 입력해주세요.")
    private String title;

    @RequestNotNull(message = "추첨 시간을 입력해주세요.")
    @FiveMinuteInterval
    private LocalDateTime drawingAt;

    @NotNull(message = "추첨 타입을 입력해주세요.")
    private DrawingType drawingType;

    @NotNull(message = "당첨자를 입력해주세요.")
    private Long winner;

    @RequestNotNull(message = "썸네일을 입력해주세요.")
    private MultipartFile thumbnail;

    @CsvFileOnly
    private MultipartFile participants;

    public Drawing toEntity(User user) { 
        drawingAt = drawingAt.withSecond(0).withNano(0);

        return Drawing.builder()
                .title(title)
                .drawingType(drawingType)
                .drawingAt(drawingAt)
                .viewCount(0) // 초기 조회수
                .owner(user)
                .winner(winner)
                .drawingStatus(DrawingStatus.STANDBY)           
                .build();
    }
}
