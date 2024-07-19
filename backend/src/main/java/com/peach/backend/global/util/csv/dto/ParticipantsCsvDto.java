package com.peach.backend.global.util.csv.dto;

import com.opencsv.bean.CsvBindByName;
import com.peach.backend.domain.drawing.entity.Drawing;
import com.peach.backend.domain.drawing.entity.Participant;
import lombok.Data;

@Data
public class ParticipantsCsvDto {

    @CsvBindByName(column = "이름")
    private String name;
    @CsvBindByName(column = "이메일")
    private String email;
    @CsvBindByName(column = "핸드폰번호")
    private String phone;

    public Participant toEntity(Drawing drawing) {
        return Participant.builder()
                .name(name)
                .email(email)
                .phone(phone)
                .drawing(drawing)
                .build();
    }
}
