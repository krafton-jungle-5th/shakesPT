package org.example.shakespt.Topic;

import lombok.Builder;
import lombok.Data;
import org.example.shakespt.Story.ViewResponseStoryDto;

import java.util.List;

@Data
@Builder
// 프론트로 데이터 반환하기 위한 DTO
public class ViewResponseTopicDto {

	private Long topicId;
	private String tag;
	private String status;
	private List<ViewResponseStoryDto> story;
	private Long length;

	public static ViewResponseTopicDto toDto(Topic topic) {
		return ViewResponseTopicDto.builder()
			.topicId(topic.getTopicId())
			.tag(topic.getTag())
			.story(topic.getStories()
				.stream()
				.map(ViewResponseStoryDto::toDto)
				.toList())
			.length((long)topic.getStories().size())
			.build();
	}

}
