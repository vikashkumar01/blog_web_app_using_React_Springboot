package com.example.blogwebapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ApplicationExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String,String> handleInValidArgumentException(MethodArgumentNotValidException ex){
        Map<String,String> errorMap = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(err->
                 errorMap.put(err.getField(),err.getDefaultMessage())
                );

        return errorMap;
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(ResourcesAlreadyExist.class)
    public Map<String,String> categoryFoundException(ResourcesAlreadyExist ex){
        Map<String,String> errorMap = new HashMap<>();
        errorMap.put("errorMessage",ex.getMessage());
        return errorMap;
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ResourcesNotFound.class)
    public Map<String,String> categoryNotFoundException(ResourcesNotFound ex){
        Map<String,String> errorMap = new HashMap<>();
        errorMap.put("errorMessage",ex.getMessage());
        return errorMap;
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(SomethingWentWrong.class)
    public Map<String,String> somethingWentWrong(SomethingWentWrong ex){
        Map<String,String> errorMap = new HashMap<>();
        errorMap.put("errorMessage",ex.getMessage());
        return errorMap;
    }
}
