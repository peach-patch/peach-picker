package com.peach.backend.domain.user.service;

import com.peach.backend.domain.drawing.entity.Drawing;
import com.peach.backend.domain.drawing.entity.repository.DrawingRepository;
import com.peach.backend.domain.drawing.enums.DrawingStatus;
import com.peach.backend.domain.user.entity.User;
import com.peach.backend.domain.user.entity.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DeleteUserService {

    private final UserRepository userRepository;
    private final DrawingRepository drawingRepository;

    public void deleteUser(User user) {

        List<Drawing> drawings = drawingRepository.findAllByOwner(user);

        for (Drawing drawing : drawings) {
            if(drawing.getDrawingStatus().equals(DrawingStatus.COMPLETE)){ // 이미 완료된 이벤트는 남겨두고,
                drawing.updateOwnerToNull();
                drawingRepository.save(drawing);
            }else{
                drawingRepository.delete(drawing); // 나머지는 삭제
            }
        }

        userRepository.delete(user);
    }

}