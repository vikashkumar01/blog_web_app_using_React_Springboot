package com.example.blogwebapp.service.impl;

import com.example.blogwebapp.entity.User;
import com.example.blogwebapp.exception.ResourcesNotFound;
import com.example.blogwebapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(email);

        if(user==null){
            try {
                throw new ResourcesNotFound("Invalid Credentials");
            } catch (ResourcesNotFound e) {
                throw new RuntimeException(e);
            }
        }

        return user;
    }
}
