package com.example.blogwebapp.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminRes {

    private Integer userCount;
    private Integer postCount;
    private Integer categoryCount;
}
