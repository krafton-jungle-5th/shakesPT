package org.example.shakespt.Story;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ViewResponseStoryDto {

	private byte[] image;
	private String story;

	public static ViewResponseStoryDto toDto(Story story) {
		return ViewResponseStoryDto.builder()
			.image(story.getImage())
			.story(story.getSummary())
			.build();
	}

}
