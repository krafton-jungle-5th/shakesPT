package org.example.shakespt;

import org.example.shakespt.Story.Story;
import org.example.shakespt.Topic.Topic;
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
        // initService.dbInitMember();
    }

    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {

        private final EntityManager em;

        public void dbInitMember() {

            for (int i = 0; i < 10; i++) {
                Topic topic = getTopic("test", "test");
                for (int j = 1; j <= 10; j++) {
                    Story story = getStory("%d번 스토리".formatted(j), "%d번 프롬프트".formatted(j));
                    topic.getStories().add(story);
                    story.setTopic(topic);
                    em.persist(story);
                }
                em.persist(topic);
            }

            for (int i = 0; i < 10; i++) {
                Topic topic = getTopic("test", "test");
                for (int j = 1; j < 9; j++) {
                    Story story = getStory("%d번 스토리".formatted(j), "%d번 프롬프트".formatted(j));
                    topic.getStories().add(story);
                    story.setTopic(topic);
                    em.persist(story);
                }
                em.persist(topic);
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