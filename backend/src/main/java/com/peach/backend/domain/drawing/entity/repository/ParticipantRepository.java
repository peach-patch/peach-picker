package com.peach.backend.domain.drawing.entity.repository;

import com.peach.backend.domain.drawing.entity.Drawing;
import com.peach.backend.domain.drawing.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    List<Participant> findAllByDrawing(Drawing drawing);

}
