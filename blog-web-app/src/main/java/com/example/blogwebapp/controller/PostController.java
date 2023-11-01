package com.example.blogwebapp.controller;

import com.example.blogwebapp.entity.Post;
import com.example.blogwebapp.exception.ResourcesNotFound;
import com.example.blogwebapp.exception.SomethingWentWrong;
import com.example.blogwebapp.repository.PostRepository;
import com.example.blogwebapp.request.UpdatePostRequest;
import com.example.blogwebapp.response.PostResponse;
import com.example.blogwebapp.service.PostService;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.Map;

@CrossOrigin(origins = "http://127.0.0.1:5173")
@RestController
@RequestMapping("api/v1/post")
public class PostController {

    private final PostService postService;
    private final PostRepository postRepository;

    @Autowired
    public PostController(PostService postService,
                          PostRepository postRepository) {
        this.postService = postService;

        this.postRepository = postRepository;
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/create")
    public ResponseEntity<PostResponse> createPost(@RequestParam("title") @NotBlank String title,
                                                   @RequestParam("subtitle") @NotBlank String subtitle,
                                                   @RequestParam("description") @NotBlank String description,
                                                   @RequestParam("categoryId") @NotBlank String categoryId,
                                                   @RequestParam("image") @NotNull MultipartFile image,
                                                   Principal principal) throws ResourcesNotFound {

        PostResponse postResp = postService.createPost(title,subtitle,description,categoryId,image,principal.getName());
        return new ResponseEntity<>(postResp, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<Page<Post>> getAllPost(
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "0", required = false) Integer offset,
            @RequestParam(defaultValue = "10", required = false) Integer pageSize){

        return new ResponseEntity<Page<Post>>(postService.getAllPost(category,offset,pageSize),HttpStatus.OK);

    }

    @GetMapping("/{postId}")
    public ResponseEntity<Post> getPostById(@PathVariable String postId) throws ResourcesNotFound {
        return new ResponseEntity<>(postService.getPostById(postId),HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/update/{postId}")
    public ResponseEntity<PostResponse> updatePostById(@RequestBody UpdatePostRequest postRequest,
                                                       @PathVariable String postId
    ) throws ResourcesNotFound {
        PostResponse updatedPost = postService.updatePostById(postRequest.getTitle(),
                postRequest.getSubtitle(),postRequest.getDescription(),postId);
        return new ResponseEntity<PostResponse>(updatedPost,HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/update-img/{postId}")
    public ResponseEntity<Map<String,String>> updatePostById(MultipartFile image,
                                                       @PathVariable String postId
    ) throws ResourcesNotFound {
        Map<String,String> uimage = postService.updatePostImageById(image,postId);
        return new ResponseEntity<Map<String,String>>(uimage,HttpStatus.OK);
    }


    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<Map<String,String>> deletePostById(@PathVariable String postId) throws SomethingWentWrong, ResourcesNotFound {
        return new ResponseEntity<>(postService.deletePost(postId),HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Post>> searchPost(
            @RequestParam(defaultValue = "0", required = false) Integer offset,
            @RequestParam(defaultValue = "8", required = false) Integer pageSize,
            @RequestParam String searchKey) throws ResourcesNotFound {
        return new ResponseEntity<Page<Post>>(postService.searchPost(offset,pageSize,searchKey),HttpStatus.OK);
    }

    @GetMapping("/latestPost")
    public ResponseEntity<Page<Post>> getAllLatestPost(
            @RequestParam(defaultValue = "0", required = false) Integer offset,
            @RequestParam(defaultValue = "5", required = false) Integer pageSize
    ){

        return new ResponseEntity<Page<Post>>(postService.getAllLatestPost(offset,pageSize),HttpStatus.OK);
    }

}
