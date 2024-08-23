package com.peach.backend.domain.drawing.entity.repository;

import com.peach.backend.domain.drawing.entity.Drawing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.time.LocalDateTime;
import java.util.List;

public interface DrawingRepository extends JpaRepository<Drawing, Long> {

    @Query("SELECT d FROM Drawing d WHERE d.title LIKE '%' || :title || '%' AND d.owner.name LIKE '%' || :owner || '%' AND d.drawingAt BETWEEN :startAt AND :endAt ")
    List<Drawing> findAllByConditions(@Param("title") String title, @Param("owner") String owner, @Param("startAt") LocalDateTime startAt, @Param("endAt") LocalDateTime endAt);

    List<Drawing> findAllByDrawingAt(LocalDateTime drawingAt);

 
}
