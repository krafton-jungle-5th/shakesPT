package org.example.shakespt.Story;

import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.example.shakespt.Topic.Topic;
import org.example.shakespt.Topic.TopicDao;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StoryService {
    private final StoryDao sDao;
    private final TopicDao tDao;

    @Value("${external.python.url}")
    private String pythonUrl;

    // 1. 프론트에서 DataResponseStoryDto에 담아서 가져온 데이터를 Story에 저장
    // 2. 가져온 데이터를 base64 인코딩해서 ConvertRequestStoryDto에 바로 저장
    @Transactional
    public DataResponseStoryDto saveDataResponseStoryDto(Long topicId, DataResponseStoryDto drDto, String path) {
        // 프론트에서 받아온 데이터 저장
        Story story = sDao.save(DataResponseStoryDto.toEntity(topicId, drDto));
        // 받아온 데이터 중 GPT에게 보내는데 필요한 자료만 추출해 저장
        ConvertRequestStoryDto crqDto = ConvertRequestStoryDto.toDto(story);
        try {
            // Base64 인코딩
            crqDto.setImage(imageToBase64(path, drDto.getFname(), drDto.getF()));
            // python 서버로 전송(추가 테스트 필요)
//            sendToPython(crqDto);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return DataResponseStoryDto.toDto(story);
    }

    // GPT에서 생성한 tag와 summary 받아서 기존 데이터 수정
    @Transactional
    public ConvertResponseStoryDto saveConvertResponseStoryDto(ConvertResponseStoryDto crsDto) {
        Story story = sDao.findById(crsDto.getStoryId()).orElse(null);
        Topic topic = tDao.findById(crsDto.getTopicId()).orElse(null);
        if (story != null && topic != null) {
            story.setSummary(crsDto.getSummary());
            topic.setTag(crsDto.getTag());
        }
        return crsDto;
    }

    // 이미지 파일 base64 인코딩
    public byte[] imageToBase64(String filePath, String fileName, MultipartFile imageFile) throws IOException {
        byte[] base64Img = {};

        File saveFile = new File(filePath + fileName);

        if (saveFile.exists() && saveFile.isFile() && saveFile.length() > 0) {
            byte[] bt = new byte[(int) saveFile.length()];
            FileInputStream fis = null;
            try {
                fis = new FileInputStream(saveFile);
                fis.read(bt);
                // Base64.encodeBase64 메소드의 반환 타입을 byte[]로 변환합니다.
                base64Img = Base64.encodeBase64(bt, false);
            } catch (Exception e) {
                throw e;
            } finally {
                try {
                    if (fis != null) {
                        fis.close();
                    }
                } catch (Exception e) {
                }
            }
        }
        return base64Img;
    }

    // 파이썬으로 데이터 전송하는 메소드
    // 테스트 필요
    @Transactional
    public void sendToPython(ConvertRequestStoryDto crqDto) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<ConvertRequestStoryDto> request = new HttpEntity<>(crqDto, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(pythonUrl, request, String.class);
        if (response.getStatusCode().is2xxSuccessful()) {
            // 성공적으로 전송됨
            System.out.println("Data successfully sent to external API");
        } else {
            // 전송 실패
            System.out.println("Failed to send data to external API");
        }
    }

    //    public void statusCheck(Long id) {
//        ArrayList<StoryDto> stories = findByTopicId(id);
//        TopicDto tDto = tService.findById(id);
//        if (stories.size() >= 9) {
//            System.out.println("작성이 완료된 스토리");
//            tDto.setStatus("completed");
//        } else {
//            System.out.println("완료되지 않은 스토리");
//        }
//        tService.save(tDto);
//    }

//    public ArrayList<StoryDto> findByTopicId(Long id) {
//        List<Story> storyList = sDao.findByTopicId(id);
//        ArrayList<StoryDto> stories = new ArrayList<>();
//        for (Story s : storyList) {
//            stories.add(StoryDto.toDto(s));
//        }
//        return stories;
//    }
}
