package com.peach.backend.domain.drawing.facade;

import com.peach.backend.domain.drawing.dto.req.DrawingReq;
import com.peach.backend.domain.drawing.dto.req.GetDrawingListReq;
import com.peach.backend.domain.drawing.dto.resp.GetDrawingDetailsResp;
import com.peach.backend.domain.drawing.dto.resp.GetDrawingListResp;
import com.peach.backend.domain.drawing.service.CreateDrawingService;
import com.peach.backend.domain.drawing.service.GetDrawingService;
import com.peach.backend.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DrawingFacade {

    private final CreateDrawingService createDrawingService;
    private final GetDrawingService getDrawingService;

    @Transactional
    public void createDrawing(DrawingReq req, User user) {
        createDrawingService.createDrawing(req, user);
    }

    @Transactional(readOnly = true)
    public List<GetDrawingListResp> getDrawingListByConditions(GetDrawingListReq req) {
        return getDrawingService.getDrawingListByConditions(req);
    }

    @Transactional(readOnly = true)
    public GetDrawingDetailsResp getDrawingDetails(Long id) {
        return getDrawingService.getDrawingDetails(id);
    }

}
