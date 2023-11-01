package com.example.blogwebapp.controller;


import com.example.blogwebapp.entity.Categories;
import com.example.blogwebapp.exception.ResourcesAlreadyExist;
import com.example.blogwebapp.exception.ResourcesNotFound;
import com.example.blogwebapp.request.CategoryRequest;
import com.example.blogwebapp.response.CategoryResponse;
import com.example.blogwebapp.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://127.0.0.1:5173")
@RestController
@RequestMapping("api/v1/category")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService){
        this.categoryService = categoryService;
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<CategoryResponse> createCategory(@RequestBody @Valid CategoryRequest caterequest) throws ResourcesAlreadyExist {

        CategoryResponse cate = categoryService.createCategory(caterequest);
        return new ResponseEntity<CategoryResponse>(cate, HttpStatus.CREATED);

    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/all")
    public ResponseEntity<Page<Categories>> getAllAdminCategories(
            @RequestParam(defaultValue = "0", required = false) Integer offset,
            @RequestParam(defaultValue = "11", required = false) Integer pageSize
    ){
        return new ResponseEntity<>(categoryService.getAllAdminCategory(offset,pageSize),HttpStatus.OK);
    }


    @GetMapping("/all")
    public ResponseEntity<List<Categories>> getAllCategories(){
        return new ResponseEntity<>(categoryService.getAllCategory(),HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{categoryId}")
    public ResponseEntity<Categories> getCategoryById(@PathVariable String categoryId) throws ResourcesNotFound {
        return new ResponseEntity<>(categoryService.getCategoryById(categoryId),HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{categoryId}")
    public ResponseEntity<CategoryResponse> updateCategoryById(
            @RequestBody @Valid CategoryRequest categoryRequest,
            @PathVariable String categoryId) throws ResourcesNotFound {

        CategoryResponse upadatedCategory = categoryService.updateCategoryById(categoryRequest,categoryId);
        return new ResponseEntity<CategoryResponse>(upadatedCategory,HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{categoryId}")
    public ResponseEntity<Map<String,String>> deleteCategoryById(@PathVariable String categoryId) throws  ResourcesNotFound {
        Map<String,String> deletedCate = categoryService.deleteCategoryById(categoryId);
        return new ResponseEntity<Map<String,String>>(deletedCate,HttpStatus.OK);
    }
}
