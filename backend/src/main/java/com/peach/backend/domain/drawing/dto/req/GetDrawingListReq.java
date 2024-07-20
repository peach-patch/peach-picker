package com.peach.backend.domain.drawing.dto.req;

import lombok.Data;

import java.time.LocalDate;

@Data
public class GetDrawingListReq {

    private String title;
    private String owner;
    private LocalDate startDate;
    private LocalDate endDate;

}
