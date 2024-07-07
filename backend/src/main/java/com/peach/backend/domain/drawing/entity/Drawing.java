package com.peach.backend.domain.drawing.entity;

import com.peach.backend.domain.drawing.enums.DrawingStatus;
import com.peach.backend.domain.drawing.enums.DrawingType;
import com.peach.backend.domain.user.entity.User;
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
public class Drawing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private DrawingType drawingType;

    private String thumbnailPath;
    private String participantPath;
    private String title;
    private Long winner;
    private LocalDateTime date;

    @Enumerated(EnumType.STRING)
    private DrawingStatus drawingStatus;

    @ManyToOne
    private User owner;

    @Builder
    public Drawing(DrawingType drawingType, String thumbnailPath, String participantPath, String title, Long winner, LocalDateTime date, DrawingStatus drawingStatus, User owner) {
        this.drawingType = drawingType;
        this.thumbnailPath = thumbnailPath;
        this.participantPath = participantPath;
        this.title = title;
        this.winner = winner;
        this.date = date;
        this.drawingStatus = drawingStatus;
        this.owner = owner;
    }

    public void updateThumbnail(String thumbnailPath) {
        this.thumbnailPath = thumbnailPath;
    }

    public void updateParticipants(String participantPath) {
        this.participantPath = participantPath;
    }
}
