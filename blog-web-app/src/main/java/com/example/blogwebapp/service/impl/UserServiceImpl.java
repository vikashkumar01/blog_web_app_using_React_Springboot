package com.example.blogwebapp.service.impl;

import com.example.blogwebapp.entity.Categories;
import com.example.blogwebapp.entity.Post;
import com.example.blogwebapp.entity.User;
import com.example.blogwebapp.exception.ResourcesAlreadyExist;
import com.example.blogwebapp.exception.ResourcesNotFound;
import com.example.blogwebapp.exception.SomethingWentWrong;
import com.example.blogwebapp.repository.CategoryRepository;
import com.example.blogwebapp.repository.PostRepository;
import com.example.blogwebapp.repository.RoleRepository;
import com.example.blogwebapp.repository.UserRepository;
import com.example.blogwebapp.request.UserRequest;
import com.example.blogwebapp.request.UserSignUpRequest;
import com.example.blogwebapp.response.AdminRes;
import com.example.blogwebapp.response.UserResponse;
import com.example.blogwebapp.response.UserSignUpResponse;
import com.example.blogwebapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    private Long userR = 1L;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public UserSignUpResponse createUser(UserSignUpRequest userSignUpRequest) throws ResourcesAlreadyExist {

        User user = new User();
        user.setId(UUID.randomUUID().toString());
        user.setFirstName(userSignUpRequest.getFirstName());
        user.setLastName(userSignUpRequest.getLastName());
        user.setEmail(userSignUpRequest.getEmail());
        user.setPassword(encoder.encode(userSignUpRequest.getPassword()));
        user.getRoles().add(roleRepository.findById(userR).get());
        try {
            userRepository.save(user);
        }catch (Exception ex){

            throw new ResourcesAlreadyExist("User Email Already Exits");
        }

        UserSignUpResponse res = new UserSignUpResponse();
        res.setMessage("User Created Sucessfully");
        return res;
    }

    @Override
    public User getUser(String userName) throws ResourcesNotFound {

        User user = userRepository.findByEmail(userName);
        if(user == null){
           throw  new ResourcesNotFound("User Not Found");
        }
        return user;
    }

    @Override
    public UserResponse updateUser(UserRequest userRequest, String userId) throws ResourcesNotFound {
        User user = userRepository.findById(userId).orElseThrow(()->
                new ResourcesNotFound("User Not Found")
        );

        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        user.setEmail(userRequest.getEmail());

        User updateUser = userRepository.save(user);
        UserResponse res = new UserResponse();
        res.setMessage("User Updated Succesfully");
        res.setUser(updateUser);
        return res;
    }

    @Override
    public Map<String, String> uploadUserImage(MultipartFile image, String userId) throws SomethingWentWrong, ResourcesNotFound {
        User user = userRepository.findById(userId).orElseThrow(()->
                new ResourcesNotFound("User Not Found")
        );
        Map<String,String> uploadedUserImage = null;
            if(user.getUserPicUrl()==null&&user.getUserPicId()==null){
                try{
                    uploadedUserImage = cloudinaryService.uploadImage(image);
                }catch (Exception ex){
                    throw new SomethingWentWrong("Failed to UserImage upload");
                }

            }else{
                try{
                    cloudinaryService.deleteImage(user.getUserPicId());
                    uploadedUserImage = cloudinaryService.uploadImage(image);
                }catch (Exception ex){
                    throw new SomethingWentWrong("Failed to UserImage upload");
                }
            }

        user.setUserPicId(uploadedUserImage.get("imagePublicId"));
        user.setUserPicUrl(uploadedUserImage.get("imageUrl"));
        userRepository.save(user);
        Map<String,String> res = new HashMap<>();
        res.put("mesaage","User Image Uploaded Sucessfully");
        return res;
    }

    @Override
    public Map<String, String> deleteUser(String userId) throws ResourcesNotFound {
        User user  = userRepository.findById(userId).orElseThrow(
                ()-> new ResourcesNotFound("User Not Found")
        );
        try{
            if(user.getUserPicId()!=null) {
                cloudinaryService.deleteImage(user.getUserPicId());
            }
        }catch (Exception ex){
            throw new RuntimeException("Something Went Wrong");
        }
        userRepository.deleteById(userId);
        Map<String,String> res = new HashMap<>();
        res.put("message","User Deleted Successfully");
        return res;
    }

    @Override
    public Page<User> getAllUser(Integer offset, Integer pageSize) {
        return userRepository.findAll(PageRequest.of(offset,pageSize));
    }

    @Override
    public AdminRes getAllDashBoard() {
        List<User> allUser = userRepository.findAll();
        List<Post> allPost = postRepository.findAll();
        List<Categories> allCategory = categoryRepository.findAll();

        AdminRes res = new AdminRes();
        res.setUserCount(allUser.size());
        res.setPostCount(allPost.size());
        res.setCategoryCount(allCategory.size());

        return res;
    }
}
