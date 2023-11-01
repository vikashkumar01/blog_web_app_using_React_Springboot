package com.example.blogwebapp.repository;

import com.example.blogwebapp.entity.Categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Categories,String> {
    Categories  findBycateName(String cateName);
}
