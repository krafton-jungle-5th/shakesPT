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
        return StoryDto.toStoryDto(story);
    }

    public ArrayList<StoryDto> findByTopicId(Long id) {
        List<Story> storyList = sDao.findByTopicId(id);
        ArrayList<StoryDto> stories = new ArrayList<>();
        for (Story s : storyList) {
            stories.add(StoryDto.toStoryDto(s));
        }
        return stories;
    }


    // 이미지 파일 base64 인코딩
    public byte[] imageToBase64(String filePath, String fileName, MultipartFile imageFile) throws IOException {
        byte[] base64Img = {};
        MultipartFile file = imageFile;
        File f = new File(filePath + fileName);
        file.transferTo(f);
        if (f.exists() && f.isFile() && f.length() > 0) {
            byte[] bt = new byte[(int) f.length()];
            FileInputStream fis = null;
            try {
                fis = new FileInputStream(f);
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
                } catch (IOException e) {
                    // IOException이 발생하면 아무것도 하지 않습니다.
                } catch (Exception e) {
                    // 다른 예외가 발생하면 아무것도 하지 않습니다.
                }
            }
        }
        return base64Img;
    }
}
