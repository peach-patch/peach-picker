package com.peach.backend.domain.drawing.service;

import com.peach.backend.domain.drawing.entity.repository.DrawingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DoDrawingService {

    private final DrawingRepository drawingRepository;

    public void doDrawing() {
        // TODO
    }



}
