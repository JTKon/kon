package net.devpage.blog.infrastructure.dao;

import net.devpage.blog.domain.model.entity.Hello;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HelloDao extends JpaRepository<Hello, Integer> {
    
    
}
