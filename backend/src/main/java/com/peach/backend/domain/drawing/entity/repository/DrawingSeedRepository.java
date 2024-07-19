package com.peach.backend.domain.drawing.entity.repository;

import com.peach.backend.domain.drawing.entity.DrawingSeed;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrawingSeedRepository extends JpaRepository<DrawingSeed, Long> {
}
