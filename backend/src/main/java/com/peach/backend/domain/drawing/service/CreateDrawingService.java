package com.peach.backend.domain.drawing.service;

import com.peach.backend.domain.drawing.dto.req.DrawingReq;
import com.peach.backend.domain.drawing.entity.Drawing;
import com.peach.backend.domain.drawing.entity.Participant;
import com.peach.backend.domain.drawing.entity.repository.DrawingRepository;
import com.peach.backend.domain.drawing.entity.repository.ParticipantRepository;
import com.peach.backend.domain.user.entity.User;
import com.peach.backend.global.util.csv.CsvUtil;
import com.peach.backend.global.util.csv.dto.ParticipantsCsvDto;
import com.peach.backend.global.util.minio.MinioUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class CreateDrawingService {

    private final DrawingRepository drawingRepository;
    private final ParticipantRepository participantRepository;
    private final MinioUtil minioUtil;
    private final CsvUtil csvUtil;

    public void createDrawing(DrawingReq req, User user) {
        
        Drawing drawing = drawingRepository.save(req.toEntity(user));

        saveParticipants(req.getParticipants(), drawing);
        saveThumbnail(req.getThumbnail(), drawing);
        
    }

    private void saveParticipants(MultipartFile participants, Drawing drawing) {
        if(participants != null) {
            List<Participant> participantList = csvUtil.readCsv(participants, ParticipantsCsvDto.class).stream().map(dto -> dto.toEntity(drawing)).collect(Collectors.toList());

            participantRepository.saveAll(participantList);

            String participantPath = "drawing/" + drawing.getOwner().getEmail() + "/participants/" + drawing.getId() + "/" + participants.getOriginalFilename();

            drawing.updateParticipants(participantPath);
            minioUtil.putObjectToMinio(participants, participantPath);
        }

    }

    private void saveThumbnail(MultipartFile thumbnail, Drawing drawing) {
        if(thumbnail != null) {
            String thumbnailPath = "drawing/" + drawing.getOwner().getEmail() + "/thumbnail/" + drawing.getId() + "/" + thumbnail.getOriginalFilename();
            drawing.updateThumbnail(thumbnailPath);
            minioUtil.putObjectToMinio(thumbnail, thumbnailPath);
            drawingRepository.save(drawing); // 썸네일 추가
        }
    }
}
