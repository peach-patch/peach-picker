package com.peach.backend.domain.drawing.service;

import com.peach.backend.domain.drawing.entity.Drawing;
import com.peach.backend.domain.drawing.entity.repository.DrawingRepository;
import com.peach.backend.domain.drawing.enums.DrawingStatus;
import com.peach.backend.domain.drawing.exception.DrawingCompletedErrorException;
import com.peach.backend.domain.drawing.exception.DrawingNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class DeleteDrawingService {

    private final DrawingRepository drawingRepository;

    @Transactional
    public void deleteDrawing(Long drawingId) {
        Drawing drawing = drawingRepository.findById(drawingId).orElseThrow(()-> DrawingNotFoundException.EXCEPTION);
        if(drawing.getDrawingStatus().equals(DrawingStatus.STANDBY)){
            drawingRepository.delete(drawing);
        }else{
            throw DrawingCompletedErrorException.EXCEPTION;
        }
    }
}