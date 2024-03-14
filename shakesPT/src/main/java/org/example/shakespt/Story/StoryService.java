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

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

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
        System.out.println("story1 = " + story);
        // 받아온 데이터 중 GPT에게 보내는데 필요한 자료만 추출해 저장
        ConvertRequestStoryDto crqDto = ConvertRequestStoryDto.toDto(story, topicId);
        List<Story> stories = sDao.findByTopicId(topicId);
        for (Story s : stories) {
            crqDto.getSummaryList().add(SummaryListStoryDto.toDto(s));
        }
        System.out.println("crqDto = " + crqDto);
        try {
            // Base64 인코딩
            crqDto.setImage(imageToBase64(path, drDto.getFname()));
            // python 서버로 전송(추가 테스트 필요)
            sendToPython(crqDto);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return DataResponseStoryDto.toDto(story);
    }


    // GPT에서 생성한 tag와 summary 받아서 기존 데이터 수정
    @Transactional
    public ConvertResponseStoryDto saveConvertResponseStoryDto(ConvertResponseStoryDto crsDto) {
        System.out.println("crsDto.getStoryId() = " + crsDto.getStoryId());
        Story story = sDao.findById(crsDto.getStoryId()).orElse(null);
        System.out.println("story2 = " + story);
        Topic topic = tDao.findById(crsDto.getTopicId()).orElse(null);

        if (story != null && topic != null) {
            story.setSummary(crsDto.getSummary());
            topic.setTag(crsDto.getTag());
        }
        return crsDto;
    }

    // 이미지 파일 base64 인코딩
    public String imageToBase64(String filePath, String fileName) throws IOException {
        String base64Img = "";

        // 주어진 파일 경로와 파일 이름을 가지고 File 객체를 생성합니다.
        File f = new File(filePath + fileName);

        // 파일이 존재하고, 파일인지(디렉토리가 아닌지), 그리고 크기가 0보다 큰지를 확인합니다.
        if (f.exists() && f.isFile() && f.length() > 0) {
            // 이미지 파일에서 읽어온 바이트를 저장할 배열을 초기화합니다.
            byte[] bt = new byte[(int) f.length()];

            // 이미지 파일로부터 바이트를 읽어오기 위해 FileInputStream을 초기화합니다.
            FileInputStream fis = null;
            try {
                fis = new FileInputStream(f);

                // FileInputStream을 사용하여 바이트를 읽어와 bt 배열에 저장합니다.
                fis.read(bt);

                // 읽어온 바이트 배열을 Base64로 인코딩한 후, 문자열로 변환하여 base64Img에 저장합니다.
                // isChuncked : 여러 줄로 나눌 것인지?
                base64Img = new String(Base64.encodeBase64(bt, false));
            } catch (Exception e) {
                // 예외가 발생하면 예외를 던집니다.
                throw e;
            } finally {
                try {
                    // FileInputStream을 닫습니다.
                    if (fis != null) {
                        fis.close();
                    }
                } catch (IOException e) {
                    // IOException이 발생하면 아무것도 하지 않습니다.
                } catch (Exception e) {
                    // 다른 예외가 발생하면 아무것도 하지 않습니다.
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
