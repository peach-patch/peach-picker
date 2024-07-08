package com.peach.backend.global.util.minio.exception;

import com.peach.backend.global.error.exception.PeachPickerException;
import com.peach.backend.global.util.minio.exception.error.MinioErrorProperty;

public class MinioCanNotPutException extends PeachPickerException {

    public final static MinioCanNotPutException EXCEPTION = new MinioCanNotPutException();

    private MinioCanNotPutException() {
        super(MinioErrorProperty.MINIO_CAN_NOT_PUT);
    }
}