package com.example.blogwebapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;


import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Post {

    @Id
    private String id;

    @NotBlank(message = "title is required")
    private String title;

    @NotBlank(message="subtitle is required ")
    private String subTitle;

    @NotBlank(message = "description is required")
    private String description;

    @NotBlank(message = "post image url is required")
    private String postImgUrl;

    @NotBlank(message = "postImgId is required")
    private String postImgId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;
    @ManyToOne(fetch = FetchType.EAGER)
    private Categories category;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @UpdateTimestamp
    private Date updatedAt;

}
