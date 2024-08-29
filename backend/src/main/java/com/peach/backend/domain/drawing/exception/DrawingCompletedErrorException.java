package com.peach.backend.domain.drawing.exception;

import com.peach.backend.domain.drawing.exception.error.DrawingErrorProperty;
import com.peach.backend.global.error.exception.PeachPickerException;

public class DrawingCompletedErrorException extends PeachPickerException {
    public final static DrawingCompletedErrorException EXCEPTION = new DrawingCompletedErrorException();

    private DrawingCompletedErrorException() {
        super(DrawingErrorProperty.DRAWING_COMPLETED_ERROR);
    }
}

