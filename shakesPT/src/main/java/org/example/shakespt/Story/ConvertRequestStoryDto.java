package org.example.shakespt.Story;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
// 필요한 데이터를 Fast Api용 전송 DTO
public class ConvertRequestStoryDto {
    private Long storyId;
    private Long topicId;
    private String prompt;
    private String image;   // 이미지(base64)
    private List<SummaryListStoryDto> summaryList;

    public static ConvertRequestStoryDto toDto(Story story, Long topicId) {
        return ConvertRequestStoryDto.builder()
                .storyId(story.getStoryId())
                .topicId(topicId)
                .prompt(story.getPrompt())
                .image(null)
                .summaryList(new ArrayList<>())
                .build();
    }
}
