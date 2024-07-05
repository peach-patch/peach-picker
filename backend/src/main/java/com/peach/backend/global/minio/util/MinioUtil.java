package com.peach.backend.global.minio.util;

import com.peach.backend.global.minio.exception.MinioObjectNotFoundException;
import io.minio.GetObjectArgs;
import io.minio.GetPresignedObjectUrlArgs;
import io.minio.MinioClient;
import io.minio.http.Method;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
public class MinioUtil {

    private final MinioProperties minioProperties;
    private final MinioClient minioClient;

    // TODO
    public void putObjectToMinio() {

    }

    public String getUrlFromMinioObject(String route) {
        try {
            return minioClient.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder()
                    .method(Method.GET)
                    .bucket(minioProperties.getBucketName())
                    .object(route)
                    .expiry(2, TimeUnit.HOURS)
                    .build());
        } catch (Exception e) {
            e.printStackTrace();
            throw MinioObjectNotFoundException.EXCEPTION;
        }
    }
}
