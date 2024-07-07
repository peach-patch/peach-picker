package com.peach.backend.domain.drawing.entity.repository;

import com.peach.backend.domain.drawing.entity.Drawing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrawingRepository extends JpaRepository<Drawing, Long> {

}
