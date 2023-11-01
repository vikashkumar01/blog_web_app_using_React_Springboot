package com.example.blogwebapp.controller;

import com.example.blogwebapp.entity.Contact;
import com.example.blogwebapp.exception.ResourcesNotFound;
import com.example.blogwebapp.exception.SomethingWentWrong;
import com.example.blogwebapp.repository.ContactRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;


@CrossOrigin(origins = "http://127.0.0.1:5173")
@RestController
@RequestMapping("api/v1/contact")
public class ContactController {

    @Autowired
    private  ContactRepository contactRepository;

    @PostMapping("/send")
    public ResponseEntity<Map<String,String>> SendMessage(@RequestBody @Valid Contact contact) throws Exception {
        Map<String,String> res = new HashMap<>();
        try{
            contact.setId(UUID.randomUUID().toString());
            contactRepository.save(contact);
        }catch (Exception e){
             throw new SomethingWentWrong("Something Went Wrong");
        }
        res.put("message","Message Send Successfully");
        return new ResponseEntity<Map<String,String>>(res, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/allmessage")
    public ResponseEntity<Page<Contact>> allMessage(
            @RequestParam(defaultValue = "0", required = false) Integer offset,
            @RequestParam(defaultValue = "10", required = false) Integer pageSize
    ){
        return new ResponseEntity<Page<Contact>>(contactRepository.findAll(PageRequest.of(offset,pageSize)),HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String,String>> allMessage(@PathVariable String id) throws ResourcesNotFound {

        Contact c = contactRepository.findById(id).orElseThrow(
                ()-> new ResourcesNotFound("Message Not Found of Given Id "+ id)
        );
        contactRepository.deleteById(id);
        Map<String,String> res = new HashMap<>();
        res.put("message","Message Deleted Successfully");
        return new ResponseEntity<Map<String,String>>(res,HttpStatus.OK);
    }
}
