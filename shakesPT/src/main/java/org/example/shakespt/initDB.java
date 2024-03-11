package org.example.shakespt;

import org.example.shakespt.Story.Story;
import org.example.shakespt.Topic.Topic;
import org.example.shakespt.Topic.TopicService;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Transactional
@Component
@RequiredArgsConstructor
public class initDB {

    private final InitService initService;

    // 더미데이터 추가를 위해 서버가 작동시 data를 삽입하는 코드를 작성했습니다
    @PostConstruct
    public void init() {
        initService.dbInitMember();
    }

    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {

        private final EntityManager em;

        public void dbInitMember() {

            for (int i = 0; i < 100; i++) {
                Story story1 = getStory("1번 스토리", "1번 프롬프트");
                Story story2 = getStory("2번 스토리", "2번 프롬프트");
                Topic topic = getTopic("test", "test");

                story1.setTopic(topic);
                story2.setTopic(topic);
                topic.getStories().add(story1);
                topic.getStories().add(story2);

                em.persist(topic);
                em.persist(story1);
                em.persist(story2);
            }

        }

        private static Topic getTopic(String tag, String status) {
            return Topic.builder()
                .tag(tag)
                .status(status)
                .build();
        }

        private static Story getStory(String summary, String prompt) {
            return Story.builder()
                .summary(summary)
                .prompt(prompt)
                .build();
        }

    }
}