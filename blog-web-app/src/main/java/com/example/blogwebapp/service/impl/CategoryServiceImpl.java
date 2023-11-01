package com.example.blogwebapp.service.impl;

import com.example.blogwebapp.entity.Categories;
import com.example.blogwebapp.exception.ResourcesAlreadyExist;
import com.example.blogwebapp.exception.ResourcesNotFound;
import com.example.blogwebapp.repository.CategoryRepository;
import com.example.blogwebapp.request.CategoryRequest;
import com.example.blogwebapp.response.CategoryResponse;
import com.example.blogwebapp.service.CategoryService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class CategoryServiceImpl implements CategoryService {


    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public CategoryResponse createCategory(CategoryRequest categoryRequest) throws ResourcesAlreadyExist {

          Categories cate = new Categories();
          cate.setId(UUID.randomUUID().toString());
          cate.setCateName(categoryRequest.getCateName());
          Categories saveCate = null;
          try{
               saveCate = categoryRepository.save(cate);
          } catch (Exception ex){
                throw new ResourcesAlreadyExist("Category Already Exist");
          }
          CategoryResponse res = new CategoryResponse();
          res.setMessage("Category Created Successfully");
          res.setCategories(saveCate);

          return res;
    }

    @Override
    public Page<Categories> getAllAdminCategory(Integer offset,Integer pageSize) {
        Page<Categories> cateList = categoryRepository.findAll(PageRequest.of(offset,pageSize));
        return cateList;
    }

    @Override
    public List<Categories> getAllCategory() {
        List<Categories> cateList = categoryRepository.findAll();
        return cateList;
    }

    @Override
    public Categories getCategoryById(String categoryId) throws ResourcesNotFound {

        Categories cate = categoryRepository.findById(categoryId)
                .orElseThrow(
                        ()-> new ResourcesNotFound("Category Not Found With given Id: "+categoryId)
                );

        return cate;
    }

    @Override
    public CategoryResponse updateCategoryById(CategoryRequest categoryRequest, String categoryId) throws ResourcesNotFound {
        Categories cate = categoryRepository.findById(categoryId).orElseThrow(()->
                 new ResourcesNotFound("Category Not Found With Given Id: "+categoryId)
                );
        cate.setCateName(categoryRequest.getCateName());
        Categories updatedCate =  categoryRepository.save(cate);
        CategoryResponse res = new CategoryResponse();
        res.setCategories(updatedCate);
        res.setMessage("Category Updated Successfully ");

        return res;
    }

    @Override
    public Map<String, String> deleteCategoryById(String categoryId) throws ResourcesNotFound {

         categoryRepository.findById(categoryId)
                .orElseThrow(()-> new ResourcesNotFound("Category Not Found With Given Id: "+categoryId));

        categoryRepository.deleteById(categoryId);

        Map<String,String> deleteSuccess = new HashMap<>();
        deleteSuccess.put("message","Category Deleted Successfully With Given Id :"+categoryId);

        return deleteSuccess;
    }
}
