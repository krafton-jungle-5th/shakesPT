package org.example.shakespt.Topic;

import java.util.List;

import org.example.shakespt.Story.ViewResponseStoryDto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ViewResponseTopicDto {

	private Long topicId;
	private String tag;
	private List<ViewResponseStoryDto> story;

	public static ViewResponseTopicDto toDto(Topic topic) {
		return ViewResponseTopicDto.builder()
			.topicId(topic.getTopicId())
			.tag(topic.getTag())
			.story(topic.getStories()
				.stream()
				.map(ViewResponseStoryDto::toDto)
				.toList())
			.build();
	}
}
