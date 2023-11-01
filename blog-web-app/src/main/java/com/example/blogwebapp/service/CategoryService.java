package com.example.blogwebapp.service;

import com.example.blogwebapp.entity.Categories;
import com.example.blogwebapp.exception.ResourcesAlreadyExist;
import com.example.blogwebapp.exception.ResourcesNotFound;
import com.example.blogwebapp.request.CategoryRequest;
import com.example.blogwebapp.response.CategoryResponse;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;

public interface CategoryService {

     CategoryResponse createCategory(CategoryRequest categoryRequest) throws  ResourcesAlreadyExist;

     Page<Categories> getAllAdminCategory(Integer offset,Integer pageSize);

     List<Categories> getAllCategory();

     Categories getCategoryById(String categoryId) throws ResourcesNotFound;

     CategoryResponse updateCategoryById(CategoryRequest categoryRequest,String categoryId) throws  ResourcesNotFound;

     Map<String,String> deleteCategoryById(String categoryId) throws ResourcesNotFound;
}
