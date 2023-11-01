package com.example.blogwebapp.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {

    @NotBlank(message = "firstName is Required")
    private String firstName;
    @NotBlank(message = "lastName is Required")
    private String lastName;
    @NotBlank(message = "email is Required")
    @Email(message = "email must be valid")
    private String email;

}
