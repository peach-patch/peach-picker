package com.peach.backend.domain.drawing.dto.req;

import com.peach.backend.domain.drawing.entity.Drawing;
import com.peach.backend.domain.drawing.enums.DrawingStatus;
import com.peach.backend.domain.drawing.enums.DrawingType;
import com.peach.backend.domain.user.entity.User;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Data
public class DrawingReq {

    private Long id;
    private String title;
    private LocalDateTime drawingAt;
    private DrawingType drawingType;
    private Long winner;

    private MultipartFile thumbnail;
    private MultipartFile participants;

    public Drawing toEntity(User user) {
        return Drawing.builder()
                .title(title)
                .drawingType(drawingType)
                .date(drawingAt)
                .owner(user)
                .drawingStatus(DrawingStatus.STANDBY)
                .build();
    }
}
