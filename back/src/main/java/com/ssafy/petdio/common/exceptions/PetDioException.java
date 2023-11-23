package com.ssafy.petdio.common.exceptions;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = false)
@Data
public class PetDioException extends RuntimeException {

    private final HttpStatus httpStatus;
    private final String reason;

    public PetDioException(HttpStatus httpStatus, String reason) {
        super(reason);
        this.httpStatus = httpStatus;
        this.reason = reason;
    }
}