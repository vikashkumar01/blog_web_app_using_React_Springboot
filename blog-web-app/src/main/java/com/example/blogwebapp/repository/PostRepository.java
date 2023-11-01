package com.example.blogwebapp.repository;

import com.example.blogwebapp.entity.Categories;
import com.example.blogwebapp.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post,String> {

    @Query("SELECT p FROM Post p WHERE LOWER(p.title) LIKE %:searchKey% OR LOWER(p.subTitle) LIKE %:searchKey% OR LOWER(p.description) LIKE %:searchKey%")
    Page<Post> findAllBySearchKey(String searchKey,Pageable pageable);
    Page<Post> findAllByCategory(Categories category, Pageable pageable);
    Page<Post> findByCreatedAtBetween(Date startDate, Date endDate, Pageable pageable);

}
