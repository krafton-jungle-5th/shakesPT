package org.example.shakespt.Story;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SummaryListStoryDto {
    private String summary;

    public static SummaryListStoryDto toDto(Story story) {
        return SummaryListStoryDto.builder()
                .summary(story.getSummary())
                .build();
    }
}
