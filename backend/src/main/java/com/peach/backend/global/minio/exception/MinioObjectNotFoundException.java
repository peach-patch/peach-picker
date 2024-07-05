package com.peach.backend.global.minio.exception;

import com.peach.backend.global.error.exception.PeachPickerException;
import com.peach.backend.global.minio.exception.error.MinioErrorProperty;

public class MinioObjectNotFoundException extends PeachPickerException {

    public final static MinioObjectNotFoundException EXCEPTION = new MinioObjectNotFoundException();

    private MinioObjectNotFoundException() {
        super(MinioErrorProperty.MINIO_OBJECT_NOT_FOUND);
    }
}