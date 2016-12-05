package net.devpage.blog.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import net.devpage.blog.entity.BlogContent;

public interface BlogContentRepository extends MongoRepository<BlogContent, String> {

    public BlogContent findById(String id);
    public List<BlogContent> findByArchive(String archive);

}