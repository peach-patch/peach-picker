package com.peach.backend.domain.drawing.service;

import com.peach.backend.domain.drawing.entity.Drawing;
import com.peach.backend.domain.drawing.entity.repository.DrawingRepository;
import com.peach.backend.domain.drawing.enums.DrawingStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
@RequiredArgsConstructor
public class DoDrawingService {

    private final DrawingRepository drawingRepository;

    @Scheduled(cron = "0 */5 * * * *")
    @Transactional
    public void doDrawing() {
        LocalDateTime baseTime = getClosestFiveMinute();

        drawingRepository.findAllByDrawingAt(baseTime).stream().forEach(drawing -> {
            new Thread(() -> doDrawingLogic(drawing)).start();
        });
    }

    private LocalDateTime getClosestFiveMinute() {
        LocalDateTime now = LocalDateTime.now();
        int minute = now.getMinute();
        int remainder = minute % 5;
        LocalDateTime closest;

        if (remainder <= 2) {
            closest = now.minusMinutes(remainder);
        } else {
            closest = now.plusMinutes(5 - remainder);
        }

        return closest.withSecond(0).withNano(0);
    }

    private void doDrawingLogic(Drawing drawing) {
        // 추첨 중 상태로 변경
        drawing.updateDrawingStatus(DrawingStatus.ONGOING);

        int winnerCount = drawing.getWinner().intValue();
        while(winnerCount > 0) {
            log.info("Drawing : {}, Count : {}", drawing.getTitle(), winnerCount);


            // TODO
            // 지홍이의 추첨 진행 로직~~

            try {
                Thread.sleep(10000);
            } catch (Exception e) {

            }
            winnerCount--;
        }

        // 추첨 완료 상태로 변경
        log.info("Drawing : {} is completed", drawing.getTitle());
        drawing.updateDrawingStatus(DrawingStatus.COMPLETE);
        drawingRepository.save(drawing);
    }
}
