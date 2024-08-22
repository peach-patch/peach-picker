package com.peach.backend.domain.drawing.entity;

import com.peach.backend.domain.drawing.enums.DrawingStatus;
import com.peach.backend.domain.drawing.enums.DrawingType;
import com.peach.backend.domain.user.entity.User;
import com.peach.backend.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Getter
@ToString
@NoArgsConstructor
public class Drawing extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private DrawingType drawingType;

    private String thumbnailPath;
    private String participantPath;
    private String title;
    private Long winner;
    private LocalDateTime drawingAt;
    private int viewCount; // 조회수

    @Enumerated(EnumType.STRING)
    private DrawingStatus drawingStatus;

    @ManyToOne
    private User owner;

    @Builder
    public Drawing(DrawingType drawingType, String thumbnailPath, String participantPath, String title, Long winner, LocalDateTime drawingAt, DrawingStatus drawingStatus, User owner) {
        this.drawingType = drawingType;
        this.thumbnailPath = thumbnailPath;
        this.participantPath = participantPath;
        this.title = title;
        this.winner = winner;
        this.drawingAt = drawingAt;
        this.drawingStatus = drawingStatus;
        this.owner = owner;
        this.viewCount = 0; // 조회수
    }

    public void incrementViewCount() {
        this.viewCount++;
    } // 조회수

    public void updateThumbnail(String thumbnailPath) {
        this.thumbnailPath = thumbnailPath;
    }

    public void updateParticipants(String participantPath) {
        this.participantPath = participantPath;
    }

    public void updateDrawingStatus(DrawingStatus status) {
        this.drawingStatus = status;
    }

    public void updateWinner(Long winner) {
        this.winner = winner;
    }
}
