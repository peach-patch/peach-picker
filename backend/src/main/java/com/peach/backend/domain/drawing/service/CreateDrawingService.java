package com.peach.backend.domain.drawing.service;

import com.peach.backend.domain.drawing.dto.req.DrawingReq;
import com.peach.backend.domain.drawing.entity.Drawing;
import com.peach.backend.domain.drawing.entity.repository.DrawingRepository;
import com.peach.backend.domain.user.entity.User;
import com.peach.backend.global.minio.util.MinioUtil;
import io.minio.MinioClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateDrawingService {

    private final DrawingRepository drawingRepository;
    private final MinioUtil minioUtil;

    public void createDrawing(DrawingReq req, User user) {
        Drawing drawing = drawingRepository.save(req.toEntity(user));

        saveFileToMinio(drawing, req);
    }

    private void saveFileToMinio(Drawing drawing, DrawingReq req) {
        if(req.getThumbnail() != null) {
            String thumbnailPath = "drawing/" + drawing.getOwner().getEmail() + "/thumbnail/"
                    + drawing.getId() + "/" + req.getThumbnail().getOriginalFilename();
            drawing.updateThumbnail(thumbnailPath);
            minioUtil.putObjectToMinio(req.getThumbnail(), thumbnailPath);
        }

        if(req.getParticipants() != null) {
            String participantPath = "drawing/" + drawing.getOwner().getEmail() + "/participants/"
                    + drawing.getId() + "/" + req.getParticipants().getOriginalFilename();

            drawing.updateParticipants(participantPath);
            minioUtil.putObjectToMinio(req.getParticipants(), participantPath);
        }
    }

}
