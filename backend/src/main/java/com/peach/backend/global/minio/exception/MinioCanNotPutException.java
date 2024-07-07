package com.peach.backend.global.minio.exception;

import com.peach.backend.global.error.exception.PeachPickerException;
import com.peach.backend.global.minio.exception.error.MinioErrorProperty;

public class MinioCanNotPutException extends PeachPickerException {

    public final static MinioCanNotPutException EXCEPTION = new MinioCanNotPutException();

    private MinioCanNotPutException() {
        super(MinioErrorProperty.MINIO_CAN_NOT_PUT);
    }
}