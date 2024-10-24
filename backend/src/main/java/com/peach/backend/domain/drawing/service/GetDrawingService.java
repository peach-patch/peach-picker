package com.peach.backend.domain.drawing.service;

import com.peach.backend.domain.drawing.dto.req.GetDrawingListReq;
import com.peach.backend.domain.drawing.dto.resp.GetDrawingDetailsResp;
import com.peach.backend.domain.drawing.dto.resp.GetDrawingListResp;
import com.peach.backend.domain.drawing.entity.Drawing;
import com.peach.backend.domain.drawing.entity.repository.DrawingRepository;
import com.peach.backend.domain.drawing.entity.repository.ParticipantRepository;
import com.peach.backend.domain.drawing.exception.DrawingNotFoundException;
import com.peach.backend.global.util.minio.MinioUtil;
import org.springframework.transaction.annotation.Transactional;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GetDrawingService {

    private final DrawingRepository drawingRepository;
    private final MinioUtil minioUtil; // 
    private final ParticipantRepository participantRepository;

    public List<GetDrawingListResp> getDrawingListByConditions(final GetDrawingListReq req) {
        return drawingRepository.findAllByConditions(req.getTitle(), req.getOwner(), req.getStartDate().atStartOfDay(), req.getEndDate().atTime(LocalTime.MAX))
                .stream().map(GetDrawingListResp::of).collect(Collectors.toList());
    }


public List<GetDrawingListResp> getAllDrawings() {
    return drawingRepository.findAll()
            .stream()
            .map(drawing -> {
                GetDrawingListResp resp = GetDrawingListResp.of(drawing);
                String thumbnailPath = drawing.getThumbnailPath();
                String thumbnailUrl = (thumbnailPath != null) ? minioUtil.getUrlFromMinioObject(thumbnailPath) : null;
                return resp.withThumbnailPath(thumbnailUrl);
            })
            .collect(Collectors.toList());
}

    @Transactional
    public GetDrawingDetailsResp getDrawingDetails(final Long id) {

        Drawing drawing = drawingRepository.findById(id).orElseThrow(() -> DrawingNotFoundException.EXCEPTION);
        
        
        String thumbnailPath = drawing.getThumbnailPath();
        String thumbnailUrl = (thumbnailPath != null) 
                ? minioUtil.getUrlFromMinioObject(thumbnailPath) 
                : null; // 썸네일
        
        int updatedViewCount = drawing.getViewCount() + 1;
        drawing.updateViewCount(updatedViewCount);

        return GetDrawingDetailsResp.builder()
                .title(drawing.getTitle())
                .winner(drawing.getWinner())
                .organizer(drawing.getOwner().getName())
                .drawingAt(drawing.getDrawingAt())
                .viewCount(drawing.getViewCount())
                .thumbnailUrl(thumbnailUrl)
                .participants(participantRepository.findAllByDrawing(drawing).stream().map(GetDrawingDetailsResp.Participants::ofForUser).collect(Collectors.toList()))
                .build();
    }
    
}
