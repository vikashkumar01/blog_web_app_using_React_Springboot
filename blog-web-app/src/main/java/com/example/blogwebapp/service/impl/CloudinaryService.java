package com.example.blogwebapp.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public  CloudinaryService(
            @Value("${cloudinary.cloud-name}") String cloudName,
            @Value("${cloudinary.api-key}") String apiKey,
            @Value("${cloudinary.api-secret}") String apiSecret
    ) {
        cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret
        ));
    }

    public Map<String, String> uploadImage(MultipartFile image) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
        Map<String,String> uploadImage = new HashMap<>();
        uploadImage.put("imageUrl",uploadResult.get("url").toString());
        uploadImage.put("imagePublicId",uploadResult.get("public_id").toString());
        return uploadImage;
    }

    public void deleteImage(String postImgId) throws IOException {
        cloudinary.uploader().destroy(postImgId,ObjectUtils.emptyMap());
    }
}
