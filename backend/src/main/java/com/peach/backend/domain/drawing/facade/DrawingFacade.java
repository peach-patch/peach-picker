package com.peach.backend.domain.drawing.facade;

import com.peach.backend.domain.drawing.dto.req.DrawingReq;
import com.peach.backend.domain.drawing.dto.req.StartDrawingReq;
import com.peach.backend.domain.drawing.dto.resp.GetDrawingDetailsResp;
import com.peach.backend.domain.drawing.dto.resp.GetDrawingListResp;
import com.peach.backend.domain.drawing.entity.repository.DrawingRepository;
import com.peach.backend.domain.drawing.service.*;
import com.peach.backend.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DrawingFacade {

    private final CreateDrawingService createDrawingService;
    private final GetDrawingService getDrawingService;
    private final CreateDrawingSeedService createDrawingSeedService;
    private final StartDrawingService startDrawingService;
    private final DrawingRepository drawingRepository;
    private final DeleteDrawingService deleteDrawingService;


    @Transactional
    public void createDrawing(DrawingReq req, User user) {
        createDrawingService.createDrawing(req, user);
    }

    // @Transactional(readOnly = true)
    // public List<GetDrawingListResp> getDrawingListByConditions(GetDrawingListReq req) {
    //     return getDrawingService.getDrawingListByConditions(req);
    // }
    @Transactional(readOnly = true)
    public List<GetDrawingListResp> getAllDrawings() {
        return getDrawingService.getAllDrawings();
    }


    @Transactional(readOnly = true)
    public GetDrawingDetailsResp getDrawingDetails(Long id) {
        return getDrawingService.getDrawingDetails(id);
    }


    @Transactional
    public Long createDrawingSeed(LocalDateTime clientTime) {
        return createDrawingSeedService.createDrawingSeed(clientTime);
    }

    @Transactional
    public int startDrawing(StartDrawingReq req) {
        return startDrawingService.startDrawing(req);
    }
    
    @Transactional
    public void incrementViewCount(Long id) {
        drawingRepository.incrementViewCount(id);
    } //조회수

    @Transactional
    public void deleteDrawing(Long id) { deleteDrawingService.deleteDrawing(id); }

    @Transactional
    public void deleteDrawings(List<Long> ids) { deleteDrawingService.deleteDrawings(ids); }
}
