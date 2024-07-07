package com.peach.backend.domain.drawing.facade;

import com.peach.backend.domain.drawing.dto.req.DrawingReq;
import com.peach.backend.domain.drawing.entity.Drawing;
import com.peach.backend.domain.drawing.service.CreateDrawingService;
import com.peach.backend.domain.user.entity.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DrawingFacade {

    private final CreateDrawingService createDrawingService;

    @Transactional
    public void createDrawing(DrawingReq req, User user) {
        createDrawingService.createDrawing(req, user);
    }

}
