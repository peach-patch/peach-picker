package com.peach.backend.domain.drawing.service;

import com.peach.backend.domain.drawing.entity.DrawingSeed;
import com.peach.backend.domain.drawing.entity.repository.DrawingSeedRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
@Slf4j
@RequiredArgsConstructor
public class CreateDrawingSeedService {
    private final DrawingSeedRepository drawingSeedRepository;

    public Long createDrawingSeed(LocalDateTime clientTime) {
        LocalDateTime serverTime = LocalDateTime.now();
        Long seedValue = clientTime.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli()
                + serverTime.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
        DrawingSeed seed = DrawingSeed.builder()
                .seedValue(seedValue)
                .clientTime(clientTime)
                .serverTime(serverTime)
                .build();
        return drawingSeedRepository.save(seed).getSeedValue();
    }
}
