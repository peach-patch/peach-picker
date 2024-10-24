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
import java.util.List;

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
   

    @Enumerated(EnumType.STRING)
    private DrawingStatus drawingStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    private int viewCount; // 조회수 추가

    @OneToMany(mappedBy = "drawing", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Participant> participants;

    @Builder
    public Drawing(DrawingType drawingType, int viewCount, String thumbnailPath, String participantPath, String title,
            Long winner, LocalDateTime drawingAt, DrawingStatus drawingStatus, User owner) {
        this.drawingType = drawingType;
        this.thumbnailPath = thumbnailPath;
        this.participantPath = participantPath;
        this.title = title;
        this.winner = winner;
        this.drawingAt = drawingAt;
        this.viewCount = viewCount; // 전달된 값
        this.drawingStatus = drawingStatus;
        this.owner = owner;

    }
       


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

    public void updateViewCount(int viewCount) {
        this.viewCount = viewCount;
    }

    public void updateOwnerToNull(){this.owner = null;}
}
