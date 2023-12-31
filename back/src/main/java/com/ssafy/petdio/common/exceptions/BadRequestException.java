package com.ssafy.petdio.common.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestException extends PetDioException {

    public BadRequestException(String reason) {
        super(HttpStatus.BAD_REQUEST, reason);
    }
}
