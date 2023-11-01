package com.example.blogwebapp.response;

import com.example.blogwebapp.entity.Categories;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponse {

     private String message;
     private Categories categories;
}
