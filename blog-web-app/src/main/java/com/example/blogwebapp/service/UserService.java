package com.example.blogwebapp.service;

import com.example.blogwebapp.entity.User;
import com.example.blogwebapp.exception.ResourcesAlreadyExist;
import com.example.blogwebapp.exception.ResourcesNotFound;
import com.example.blogwebapp.exception.SomethingWentWrong;
import com.example.blogwebapp.request.UserRequest;
import com.example.blogwebapp.request.UserSignUpRequest;
import com.example.blogwebapp.response.AdminRes;
import com.example.blogwebapp.response.UserResponse;
import com.example.blogwebapp.response.UserSignUpResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface UserService {

    UserSignUpResponse createUser(UserSignUpRequest userSignUpRequest) throws ResourcesAlreadyExist;
    User getUser(String userName) throws ResourcesNotFound;
    UserResponse updateUser(UserRequest user, String userId) throws ResourcesNotFound;
    Map<String,String> uploadUserImage(MultipartFile image,String userId) throws SomethingWentWrong, ResourcesNotFound;
    Map<String,String> deleteUser(String userId) throws ResourcesNotFound;
    Page<User> getAllUser(Integer offset, Integer pageSize);

    AdminRes getAllDashBoard();


}
