package org.example.shakespt.Story;

import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StoryService {
    private final StoryDao sDao;

    // 스토리 저장
    @Transactional
    public StoryDto save(StoryDto sDto) {
        Story story = sDao.save(StoryDto.toEntity(sDto));
        return StoryDto.toDto(story);
    }


    public ArrayList<StoryDto> findByTopicId(Long id) {
        List<Story> storyList = sDao.findByTopicId(id);
        ArrayList<StoryDto> stories = new ArrayList<>();
        for (Story s : storyList) {
            stories.add(StoryDto.toDto(s));
        }
        return stories;
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

    // 이미지 파일 base64 인코딩
    public byte[] imageToBase64(String filePath, String fileName, MultipartFile imageFile) throws IOException {
        byte[] base64Img = {};
        File uploadDir = new File(filePath);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs(); // 경로가 존재하지 않으면 생성
        }
        File saveFile = new File(filePath + fileName);
        imageFile.transferTo(saveFile);

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
}
