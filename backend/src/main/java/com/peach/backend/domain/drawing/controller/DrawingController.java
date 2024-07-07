package com.peach.backend.domain.drawing.controller;

import com.peach.backend.domain.drawing.dto.req.DrawingReq;
import com.peach.backend.domain.drawing.facade.DrawingFacade;
import com.peach.backend.domain.user.entity.User;
import com.peach.backend.global.security.dto.CurrentUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("drawing")
public class DrawingController {

    private final DrawingFacade drawingFacade;

    @PostMapping("register")
    public ResponseEntity<String> registerDrawing(@RequestBody @ModelAttribute DrawingReq req, @CurrentUser User user) {
        drawingFacade.createDrawing(req, user);

        return ResponseEntity.ok().body("추첨 생성이 완료되었습니다.");
    }

}
