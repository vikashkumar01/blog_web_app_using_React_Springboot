package com.example.blogwebapp.request;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserSignUpRequest {

    @NotBlank(message = "firstName is required")
    private String firstName;
    @NotBlank(message = "lastName is required")
    private String lastName;
    @NotBlank(message = "email is required")
    @Email(message = "email is not valid")
    private String email;
    @NotBlank(message = "password is required")
    @Size(max = 16,min =5,message = "password must be between 5 to 16 letter or number")
    private String password;
}
