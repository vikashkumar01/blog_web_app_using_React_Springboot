package com.example.blogwebapp.controller;


import com.example.blogwebapp.entity.User;
import com.example.blogwebapp.exception.ResourcesAlreadyExist;
import com.example.blogwebapp.exception.ResourcesNotFound;
import com.example.blogwebapp.exception.SomethingWentWrong;
import com.example.blogwebapp.repository.UserRepository;
import com.example.blogwebapp.request.UserLoginRequest;
import com.example.blogwebapp.request.UserRequest;
import com.example.blogwebapp.request.UserSignUpRequest;
import com.example.blogwebapp.response.AdminRes;
import com.example.blogwebapp.response.UserLogInResponse;
import com.example.blogwebapp.response.UserResponse;
import com.example.blogwebapp.response.UserSignUpResponse;
import com.example.blogwebapp.securityConfig.JwtHelper;
import com.example.blogwebapp.service.UserService;
import com.example.blogwebapp.service.impl.CustomUserDetailsService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://127.0.0.1:5173")
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtHelper jwtHelper;

    @PostMapping("/signup")
    public ResponseEntity<UserSignUpResponse> createUser(@RequestBody @Valid UserSignUpRequest userSignUpRequest) throws ResourcesAlreadyExist {
        UserSignUpResponse res  = userService.createUser(userSignUpRequest);
        return new ResponseEntity<UserSignUpResponse>(res, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<UserLogInResponse> loginUser(@RequestBody @Valid UserLoginRequest userLogInRequest) throws ResourcesNotFound {

        doAuthentication(userLogInRequest.getEmail(),userLogInRequest.getPassword());
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(userLogInRequest.getEmail());
        String token = jwtHelper.generateToken(userDetails);
        UserLogInResponse res = new UserLogInResponse();
        res.setUser(userRepository.findByEmail(userDetails.getUsername()));
        res.setToken(token);
        res.setMessage("User Login Successfully");

        return new ResponseEntity<UserLogInResponse>(res,HttpStatus.OK);
    }

    private void doAuthentication(String email, String password) throws ResourcesNotFound {
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email,password);
        try{
            authenticationManager.authenticate(authentication);
        }catch(BadCredentialsException e){
            throw new ResourcesNotFound("Invalid Credentails");
        }
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/current-user")
    public ResponseEntity<User> getCurrentUser(Principal principal) throws ResourcesNotFound {
        User  user = userService.getUser(principal.getName());
        return new ResponseEntity<User>(user,HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/update/{userId}")
    public ResponseEntity<UserResponse> updateUser(@RequestBody @Valid UserRequest userRequest,
                                                             @PathVariable String userId) throws ResourcesNotFound {
        return new ResponseEntity<UserResponse>(userService.updateUser(userRequest,userId),HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/upload-user-img/{userId}")
    public ResponseEntity<Map<String,String>> uploadUserImg(@RequestParam("image") MultipartFile image,@PathVariable String userId) throws SomethingWentWrong, ResourcesNotFound {
        return new ResponseEntity<Map<String, String>>(userService.uploadUserImage(image,userId),HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<Map<String,String>> deleteUser(@PathVariable String userId) throws ResourcesNotFound {
        return new ResponseEntity<Map<String,String>>(userService.deleteUser(userId),HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/alluser")
    public ResponseEntity<Page<User>> getAllUser(
            @RequestParam(defaultValue = "0", required = false) Integer offset,
            @RequestParam(defaultValue = "10", required = false) Integer pageSize
    ) {
        return new ResponseEntity<Page<User>>(userService.getAllUser(offset,pageSize),HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/dashboard")
    public ResponseEntity<AdminRes> adminDashBoard(){
         return new ResponseEntity<AdminRes>(userService.getAllDashBoard(),HttpStatus.OK) ;
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/logout")
    public ResponseEntity<Map<String,String>> logoutUser(HttpServletRequest request) {

        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        SecurityContextHolder.clearContext();
        Map<String, String> responseMessage = new HashMap<>();
        responseMessage.put("message", "Logout successful");

        return new ResponseEntity<>(responseMessage, HttpStatus.OK);
    }



}