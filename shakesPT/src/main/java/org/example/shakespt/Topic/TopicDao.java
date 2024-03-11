package org.example.shakespt.Topic;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TopicDao extends JpaRepository<Topic, Long> {
    Page<Topic> findAll(Pageable pageable);

    Page<Topic> findByStatus(Pageable pageable, String status);

    Page<Topic> findByTagContains(Pageable pageable, String keyword);
}