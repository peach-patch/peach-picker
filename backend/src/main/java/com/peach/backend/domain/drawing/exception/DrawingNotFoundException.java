package com.peach.backend.domain.drawing.exception;


import com.peach.backend.domain.drawing.exception.error.DrawingErrorProperty;
import com.peach.backend.global.error.exception.PeachPickerException;

public class DrawingNotFoundException extends PeachPickerException {

    public final static DrawingNotFoundException EXCEPTION = new DrawingNotFoundException();

    private DrawingNotFoundException() {
        super(DrawingErrorProperty.DRAWING_NOT_FOUND);
    }
}
