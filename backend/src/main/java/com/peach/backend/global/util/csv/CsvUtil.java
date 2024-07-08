package com.peach.backend.global.util.csv;

import com.opencsv.CSVReader;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.peach.backend.global.util.exception.CsvReadErrorException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class CsvUtil {

    public <T> List<T> readCsv(MultipartFile file, Class<T> type) {
        try (Reader reader = new InputStreamReader(file.getInputStream())) {
            CsvToBean<T> csvToBean = new CsvToBeanBuilder<T>(reader)
                    .withType(type)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build();


            return csvToBean.parse();
        } catch (Exception e) {
            throw CsvReadErrorException.EXCEPTION;
        }

//        try (Reader reader = new InputStreamReader(file.getInputStream());
//             CSVReader csvReader = new CSVReader(reader)) {
//
//            List<String[]> records = csvReader.readAll();
//            for (String[] record : records) {
//                System.out.println(String.join(", ", record));
//            }
//            return null;
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new RuntimeException("");
//        }
    }

}
