package com.peach.backend.domain.drawing.dto.resp;

import com.peach.backend.domain.drawing.entity.Drawing;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class GetDrawingListResp {
    private Long id;
    private String title;
    private LocalDateTime drawingAt;
    private Long winner;
    private String drawingType;
    private String organizer;
    private String thumbnailPath; //추가
    private int viewCount; // 조회수

    public static GetDrawingListResp of(Drawing drawing) {
        return GetDrawingListResp.builder()
                .id(drawing.getId())
                .title(drawing.getTitle())
                .drawingAt(drawing.getDrawingAt())
                .winner(drawing.getWinner())
                .organizer(drawing.getOwner().getName())
                .drawingType(drawing.getDrawingType().getName())
                .viewCount(drawing.getViewCount()) // 조회수
                .build();
    }

    public GetDrawingListResp withThumbnailPath(String thumbnailUrl) {
        this.thumbnailPath = thumbnailUrl;
        return this; // 추가
    }
}
