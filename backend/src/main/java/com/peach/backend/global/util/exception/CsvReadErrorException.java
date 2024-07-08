package com.peach.backend.global.util.exception;

import com.peach.backend.global.error.exception.PeachPickerException;
import com.peach.backend.global.util.exception.error.CsvErrorProperty;

public class CsvReadErrorException extends PeachPickerException {

    public final static CsvReadErrorException EXCEPTION = new CsvReadErrorException();

    private CsvReadErrorException() {
        super(CsvErrorProperty.CSV_READ_ERROR);
    }
}