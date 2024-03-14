package org.example.shakespt.Story;

import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;

import org.springframework.core.io.ClassPathResource;
import org.springframework.util.StreamUtils;

import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@Builder
public class ViewResponseStoryDto {

	private String imageData; // Base64로 인코딩된 이미지 데이터
	private String summary;

	public static ViewResponseStoryDto toDto(Story story) {
		String filename = story.getFname();
		ClassPathResource resource = new ClassPathResource("image/" + filename);

		// 이미지 파일을 읽어 Base64로 인코딩
		String imageData;
		try (InputStream inputStream = resource.getInputStream()) {
			byte[] fileContent = StreamUtils.copyToByteArray(inputStream);
			imageData = Base64.getEncoder().encodeToString(fileContent);
		} catch (IOException e) {
			throw new RuntimeException("Failed to read image file", e);
		}

		return ViewResponseStoryDto.builder()
			.imageData(imageData)
			.summary(story.getSummary())
			.build();
	}
}
