package com.peach.backend.domain.drawing.dto.resp;

import com.peach.backend.domain.drawing.entity.Participant;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class GetDrawingDetailsResp {

    private String title;
    private LocalDateTime drawingAt;
    private Long winner;
    private String organizer;
    private List<Participants> participants;
    private int viewCount; // 조회수 
    private String thumbnailUrl; // 썸네일 추가

    @Data
    @Builder
    public static class Participants {
        private String name;
        private String email;
        private String phone;
        private boolean isWinner;

        public static Participants ofForUser(Participant participant) {
            return Participants.builder()
                    .name(getMaskedName(participant.getName()))
                    .email(getMaskedEmail(participant.getEmail()))
                    .phone(getMaskedPhone(participant.getPhone()))
                    .isWinner(participant.getIsWinner())
                    .build();
        }

        public static Participants ofForAdmin(Participant participant) {
            return Participants.builder()
                    .name(participant.getName())
                    .email(participant.getEmail())
                    .phone(participant.getPhone())
                    .isWinner(participant.getIsWinner())
                    .build();
        }

        private static String getMaskedName(String name) {
            if (name == null || name.isEmpty()) {
                return name;
            }
            return name.substring(0, 1) + "*".repeat(name.length() - 1);
        }

        private static String getMaskedEmail(String email) {
            if (email == null || email.isEmpty()) {
                return email;
            }
            int atIndex = email.indexOf('@');
            if (atIndex > 0) {
                return email.substring(0, 1) + "*".repeat(atIndex - 1) + email.substring(atIndex);
            } else {
                return email;
            }
        }

        private static String getMaskedPhone(String phone) {
            if (phone == null || phone.isEmpty()) {
                return phone;
            }
            String[] parts = phone.split("-");
            if (parts.length == 3) {
                return parts[0] + "-" +
                        parts[1].substring(0, parts[1].length() - 2) + "**" +
                        parts[2].substring(0, parts[2].length() - 2) + "**";
            } else {
                return phone;
            }
        }
    }

}
