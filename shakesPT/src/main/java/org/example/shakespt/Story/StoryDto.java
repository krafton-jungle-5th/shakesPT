package org.example.shakespt.Story;

import lombok.*;
import org.example.shakespt.Topic.Topic;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class StoryDto {
    private Long id;
    private String summary; // 전체 줄거리
    private String prompt;  // gpt에게 긔띔하기
    private byte[] image;   // 이미지(base64)
    private Topic topic;
    private MultipartFile f;    // 파일 생성을 위해 작성

    // StoryDto -> Story
    public static Story toEntity(StoryDto dto) {
        return Story.builder()
                .summary(dto.getSummary())
                .prompt(dto.getPrompt())
                .image(dto.getImage())
                .topic(dto.getTopic())
                .build();
    }

    // Story -> StoryDto
    public static StoryDto toStoryDto(Story story) {
        return StoryDto.builder()
                .summary(story.getSummary())
                .prompt(story.getPrompt())
                .image(story.getImage())
                .topic(story.getTopic())
                .f(null)
                .build();
    }
}
