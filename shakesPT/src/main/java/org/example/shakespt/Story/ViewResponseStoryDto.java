package org.example.shakespt.Story;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
// 프론트로 데이터 반환하기 위한 DTO
public class ViewResponseStoryDto {

    private String fname;
    private String summary;

    public static ViewResponseStoryDto toDto(Story story) {
        return ViewResponseStoryDto.builder()
                .fname(story.getFname())
                .summary(story.getSummary())
                .build();
    }
}
