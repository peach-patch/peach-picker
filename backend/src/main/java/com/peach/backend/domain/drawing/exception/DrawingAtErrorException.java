package com.peach.backend.domain.drawing.exception;


import com.peach.backend.domain.drawing.exception.error.DrawingErrorProperty;
import com.peach.backend.global.error.exception.PeachPickerException;

public class DrawingAtErrorException extends PeachPickerException {

    public final static DrawingAtErrorException EXCEPTION = new DrawingAtErrorException();

    private DrawingAtErrorException() {
        super(DrawingErrorProperty.DRAWING_AT_ERROR);
    }
}
