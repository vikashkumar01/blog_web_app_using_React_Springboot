package com.example.blogwebapp.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePostRequest {

    @NotBlank(message = "title is required")
    private String title;
    @NotBlank(message = "subtitle is required")
    private String subtitle;
    @NotBlank(message = "description is required")
    private String description;
}
