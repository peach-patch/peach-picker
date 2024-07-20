package com.peach.backend.global.util.minio.exception;

import com.peach.backend.global.error.exception.PeachPickerException;
import com.peach.backend.global.util.minio.exception.error.MinioErrorProperty;

public class MinioObjectNotFoundException extends PeachPickerException {

    public final static MinioObjectNotFoundException EXCEPTION = new MinioObjectNotFoundException();

    private MinioObjectNotFoundException() {
        super(MinioErrorProperty.MINIO_OBJECT_NOT_FOUND);
    }
}