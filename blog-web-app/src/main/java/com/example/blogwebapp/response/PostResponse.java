package com.example.blogwebapp.response;

import com.example.blogwebapp.entity.Categories;
import com.example.blogwebapp.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostResponse {

   private String message;
   private Post post;


}
