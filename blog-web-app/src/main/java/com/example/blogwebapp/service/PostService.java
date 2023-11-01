package com.example.blogwebapp.service;

import com.example.blogwebapp.entity.Post;
import com.example.blogwebapp.exception.ResourcesNotFound;
import com.example.blogwebapp.exception.SomethingWentWrong;
import com.example.blogwebapp.response.PostResponse;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Service
public interface PostService {

    PostResponse createPost(String title, String subtitle,
                            String description,String categoryId,
                            MultipartFile image,String loggedUser) throws ResourcesNotFound;
    Page<Post> getAllPost(String categoryName,Integer offset, Integer pageSize);
    Post getPostById(String postId) throws ResourcesNotFound;
    PostResponse updatePostById(String title, String subtitle,
                                String description, String postId) throws ResourcesNotFound;

    Map<String,String> updatePostImageById(MultipartFile image,String postId) throws ResourcesNotFound;
    Map<String,String> deletePost(String postId) throws SomethingWentWrong, ResourcesNotFound;

    Page<Post> searchPost(Integer offset, Integer pageSize,String searchKey) throws ResourcesNotFound;

    Page<Post> getAllLatestPost(Integer offset, Integer pageSize);

}
