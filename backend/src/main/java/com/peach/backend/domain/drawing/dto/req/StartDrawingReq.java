package com.peach.backend.domain.drawing.dto.req;

import lombok.Builder;
import lombok.Data;

@Data
public class StartDrawingReq {
    private long seed;
    private long drawing_id;
}
