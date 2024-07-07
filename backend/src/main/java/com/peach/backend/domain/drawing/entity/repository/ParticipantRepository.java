package com.peach.backend.domain.drawing.entity.repository;

import com.peach.backend.domain.drawing.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {
}
