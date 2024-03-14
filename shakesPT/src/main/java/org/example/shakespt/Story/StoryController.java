package org.example.shakespt.Story;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Slf4j
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/story")
public class StoryController {
    private final StoryService sService;
    @Value("${spring.servlet.multipart.location}")
    private String path;

    @PostMapping("/add")
    public DataResponseStoryDto addStory(DataResponseStoryDto drDto) {
        MultipartFile f = drDto.getF();
        String fname = f.getOriginalFilename();

        File directory = new File(path);    // 이미지 파일 저장 공간 생성
        File newFile = new File(path + fname);  // 이미지 파일로 생성

        if (!directory.exists()) {
            directory.mkdirs();   // 폴더 없다면 생성
        }
        try {
            f.transferTo(newFile);
            drDto.setFname(fname);
        } catch (IOException e) {
            throw new RuntimeException("파일 전송 중 오류 발생", e);
        }

        return sService.saveDataResponseStoryDto(drDto, path);
    }

}
