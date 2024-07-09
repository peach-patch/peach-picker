package com.peach.backend.domain.drawing.service;

import com.peach.backend.domain.drawing.entity.repository.DrawingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Slf4j
@RequiredArgsConstructor
public class DoDrawingService {

    private final DrawingRepository drawingRepository;

    @Scheduled(cron = "0 */1 * * * *")
    public void doDrawing() {
        log.info("LocalDateTime.now() = {}", LocalDateTime.now());
    }

    private void doDrawingLogic() {
        // TODO
    }


}
