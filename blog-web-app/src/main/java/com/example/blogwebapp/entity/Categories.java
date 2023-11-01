package com.example.blogwebapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Categories {

    @Id
    private String id;

    @NotBlank(message = "Category name is required")
    @Column(unique = true)
    private String cateName;

    @JsonIgnore
    @OneToMany(mappedBy = "category",fetch = FetchType.LAZY)
    List<Post> post = new ArrayList<>();

    @CreationTimestamp
    private Date created_At;

    @UpdateTimestamp
    private Date updated_At;

}
