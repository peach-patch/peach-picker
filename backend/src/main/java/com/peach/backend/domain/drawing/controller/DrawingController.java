package com.peach.backend.domain.drawing.controller;

import com.peach.backend.domain.drawing.dto.req.DrawingReq;
import com.peach.backend.domain.drawing.dto.req.DrawingSeedReq;
import com.peach.backend.domain.drawing.dto.req.StartDrawingReq;
import com.peach.backend.domain.drawing.dto.resp.GetDrawingDetailsResp;
import com.peach.backend.domain.drawing.dto.resp.GetDrawingListResp;
import com.peach.backend.domain.drawing.facade.DrawingFacade;
import com.peach.backend.domain.user.entity.User;
import com.peach.backend.global.security.dto.CurrentUser;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("drawing")
public class DrawingController {

    private final DrawingFacade drawingFacade;

    @PostMapping("register")
    public ResponseEntity<String> registerDrawing(@Valid @RequestBody @ModelAttribute DrawingReq req,
            @CurrentUser User user) {
        drawingFacade.createDrawing(req, user);

        return ResponseEntity.ok().body("추첨 생성이 완료되었습니다.");
    }
    // @GetMapping
    // public List<GetDrawingListResp> getDrawingListByConditions(@RequestBody GetDrawingListReq req) {
    //     return drawingFacade.getDrawingListByConditions(req);
    // }
    @GetMapping
        public List<GetDrawingListResp> getAllDrawings() {
            return drawingFacade.getAllDrawings();
        }

    @PostMapping("{id}/increment-view")
        public ResponseEntity<Void> incrementViewCount(@PathVariable("id") Long id) {
            drawingFacade.incrementViewCount(id);
            return ResponseEntity.ok().build();
    } // 조회수


    @GetMapping("{id}")
    public GetDrawingDetailsResp getDrawingDetails(@PathVariable("id") Long id, @CurrentUser User user) {
        return drawingFacade.getDrawingDetails(id);
    }

    @PostMapping("seed")
    public ResponseEntity<Long> createDrawingSeed(@RequestBody DrawingSeedReq seed) {
        ;
        return ResponseEntity.ok().body(drawingFacade.createDrawingSeed(seed.getClientTime()));
    }

    @PostMapping("start")
    public ResponseEntity<String> StartDrawing(@RequestBody StartDrawingReq req) {
        return ResponseEntity.ok().body(drawingFacade.startDrawing(req) + "명의 당첨자가 추첨되었습니다.");
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDrawing(@PathVariable("id") Long id, @CurrentUser User user) {
        drawingFacade.deleteDrawing(id);
        return ResponseEntity.ok().body("추첨이 삭제되었습니다.");
    }

}
