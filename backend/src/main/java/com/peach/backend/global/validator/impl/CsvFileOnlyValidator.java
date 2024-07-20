package com.peach.backend.global.validator.impl;


import com.peach.backend.global.validator.annotation.CsvFileOnly;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;


public class CsvFileOnlyValidator implements ConstraintValidator<CsvFileOnly, MultipartFile> {
    @Override
    public boolean isValid(MultipartFile file, ConstraintValidatorContext context) {
        if (file == null) {
            return true;
        }
        String fileName = file.getOriginalFilename();
        return fileName != null && fileName.toLowerCase().endsWith(".csv");
    }
}