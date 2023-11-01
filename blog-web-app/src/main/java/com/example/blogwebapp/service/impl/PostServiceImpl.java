package com.example.blogwebapp.service.impl;

import com.example.blogwebapp.entity.Categories;
import com.example.blogwebapp.entity.Post;
import com.example.blogwebapp.entity.User;
import com.example.blogwebapp.exception.ResourcesNotFound;
import com.example.blogwebapp.exception.SomethingWentWrong;
import com.example.blogwebapp.repository.CategoryRepository;
import com.example.blogwebapp.repository.ContactRepository;
import com.example.blogwebapp.repository.PostRepository;
import com.example.blogwebapp.repository.UserRepository;
import com.example.blogwebapp.response.PostResponse;
import com.example.blogwebapp.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.lang.module.ResolutionException;
import java.util.*;

@Service
public class PostServiceImpl implements PostService {

    private final CloudinaryService cloudinaryService;
    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final ContactRepository contactRepository;

    @Autowired
    public PostServiceImpl(CloudinaryService cloudnaryService,
                           PostRepository postRepository,
                           CategoryRepository categoryRepository,
                           UserRepository userRepository,
                           ContactRepository contactRepository) {
        this.cloudinaryService = cloudnaryService;
        this.postRepository = postRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.contactRepository = contactRepository;
    }

    @Override
    public PostResponse createPost(String title, String subtitle,
                                   String description,String categoryId,
                                   MultipartFile image,String loggedUser) throws ResourcesNotFound {
        User user = null;
        try{
            user = userRepository.findByEmail(loggedUser);
        }catch (Exception ex){
            ex.printStackTrace();
        }

        Map<String,String> img = null;

        try {
            img = cloudinaryService.uploadImage(image);
        } catch (IOException e) {
            e.printStackTrace();
        }

        Categories cate = categoryRepository.findById(categoryId)
                .orElseThrow(()->new ResourcesNotFound("Category Not Exist"));

        Post post = new Post();
        post.setId(UUID.randomUUID().toString());
        post.setTitle(title);
        post.setSubTitle(subtitle);
        post.setDescription(description);
        post.setPostImgUrl(img.get("imageUrl"));
        post.setPostImgId(img.get("imagePublicId"));
        post.setCategory(cate);
        post.setUser(user);

        Post createdPost = null;

        try{
           createdPost = postRepository.save(post);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        cate.getPost().add(createdPost);
        user.getUserPost().add(createdPost);
        try{
            userRepository.save(user);
        } catch (Exception ex){
           ex.printStackTrace();
       }

        categoryRepository.save(cate);

        PostResponse res= new PostResponse();
        res.setMessage("Post Created Successfully");
        res.setPost(createdPost);

        return res;
    }

    @Override
    public Page<Post> getAllPost(String categoryName,Integer offset,Integer pageSize) {
        Categories cate = categoryRepository.findBycateName(categoryName);
        if(cate!=null){
            return postRepository.findAllByCategory(cate,PageRequest.of(offset,pageSize));
         }
        return postRepository.findAll(PageRequest.of(offset,pageSize));

    }



    @Override
    public Post getPostById(String postId) throws ResourcesNotFound {
        return postRepository.findById(postId).orElseThrow(
                ()-> new ResourcesNotFound("Post Not Found With Given Id : "+postId)
        );
    }

    @Override
    public PostResponse updatePostById(String title, String subtitle, String description,String postId) throws ResourcesNotFound {
        Post post = postRepository.findById(postId).orElseThrow(
                ()-> new ResourcesNotFound("Post Not Found of Given Id : "+postId)
        );

        post.setTitle(title);
        post.setSubTitle(subtitle);
        post.setDescription(description);

        Post  updatedPost  =  postRepository.save(post);

        PostResponse res = new PostResponse();
        res.setMessage("Post Updated Succesfully");
        res.setPost(updatedPost);

        return res;
    }

    @Override
    public Map<String, String> updatePostImageById(MultipartFile image, String postId) throws ResourcesNotFound {

        Post post  = postRepository.findById(postId).orElseThrow(
                ()-> new ResourcesNotFound("Post Not Found of Given Id : "+postId)
        );

        Map<String,String> img = null;

        try {
            cloudinaryService.deleteImage(post.getPostImgId());
            img = cloudinaryService.uploadImage(image);
        } catch (IOException e) {
            e.printStackTrace();
        }

        post.setPostImgId(img.get("imagePublicId"));
        post.setPostImgUrl(img.get("imageUrl"));

        postRepository.save(post);

        Map<String,String> upadateImg = new HashMap<>();
        upadateImg.put("message","Image Updated Succesfully : "+postId);

        return upadateImg;
    }

    @Override
    public Map<String, String> deletePost(String postId) throws SomethingWentWrong, ResourcesNotFound {
        Post post = postRepository.findById(postId).orElseThrow(
                ()-> new ResourcesNotFound("Post Not Found With given Id : "+postId)
        );
        try{
            cloudinaryService.deleteImage(post.getPostImgId());
        }catch(Exception ex){
            throw new SomethingWentWrong("Something went Wrong");
        }

        postRepository.deleteById(postId);

        Map<String, String> deletedPost = new HashMap<>();
        deletedPost.put("message","Post Deleted Successfully of Given Id : "+postId);
        return deletedPost;
    }

    @Override
    public Page<Post> searchPost(Integer offset, Integer pageSize,String searchKey) throws ResourcesNotFound {
        Pageable pageable = PageRequest.of(offset / pageSize, pageSize);
        Page postList =  postRepository.findAllBySearchKey(searchKey,pageable);
        if(postList==null){
            throw new ResourcesNotFound("Post Not Found");
        }
        return postList;
    }

    @Override
    public Page<Post> getAllLatestPost(Integer offset,Integer pageSize ) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, -1);
        Date lastMonth = calendar.getTime();

        Calendar currentCalendar = Calendar.getInstance();
        Date currentDate = currentCalendar.getTime();

        Page<Post> allPost = postRepository.findByCreatedAtBetween(lastMonth,currentDate,PageRequest.of(offset,pageSize));
        return allPost;
    }



}
