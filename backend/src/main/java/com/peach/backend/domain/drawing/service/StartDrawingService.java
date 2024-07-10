package com.peach.backend.domain.drawing.service;

import com.peach.backend.domain.drawing.dto.req.StartDrawingReq;
import com.peach.backend.domain.drawing.entity.Drawing;
import com.peach.backend.domain.drawing.entity.Participant;
import com.peach.backend.domain.drawing.entity.repository.DrawingRepository;
import com.peach.backend.domain.drawing.entity.repository.ParticipantRepository;
import com.peach.backend.domain.drawing.exception.DrawingNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@Slf4j
@RequiredArgsConstructor
public class StartDrawingService {
    private final DrawingRepository drawingRepository;
    private final ParticipantRepository participantRepository;

    public int startDrawing(StartDrawingReq req){
        Drawing drawing = drawingRepository.findById(req.getDrawing_id()).orElseThrow(()-> DrawingNotFoundException.EXCEPTION);
        List<Participant> participants = participantRepository.findAllByDrawing(drawing);
        createRandomNums(req.getSeed(), participants);

        List<Participant> winners = findWinners(req.getSeed(), participants, drawing.getWinner());
        for(Participant p : winners){
            p.updateIsWinner(true);
            participantRepository.save(p);
        }

        return winners.size();
    }

    private void createRandomNums(Long seed, List<Participant> participants){
        Random random = new Random(seed);

        for(Participant p :participants){
            // & Long.MAX_VALUE << 항상 양수로 변환
            p.updateRandomNums(random.nextLong() & Long.MAX_VALUE);
            p.updateIsWinner(false);
            participantRepository.save(p);
        }
    }

    private List<Participant> findWinners(Long seed, List<Participant> participants, Long numsOfWinners){
        List<Participant> winners = new ArrayList<>();

        // 시드가 짝수면 오름차순, 홀수면 내림차순
        boolean isEven = seed % 2 == 0;
        if(isEven){
            participants.sort((a, b) -> Long.compare(a.getRandomNums(),b.getRandomNums()));
        }
        else {
            participants.sort((a, b) -> Long.compare(b.getRandomNums(),a.getRandomNums()));
        }

        for(int i=0; i<numsOfWinners; i++){
            winners.add(participants.get(i));
        }

        return winners;
    }

}
