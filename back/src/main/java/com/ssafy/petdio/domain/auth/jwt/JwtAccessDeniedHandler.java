package com.ssafy.petdio.domain.auth.jwt;

import com.ssafy.petdio.common.exceptions.ForbiddenException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(
            HttpServletRequest request,
            HttpServletResponse response,
            AccessDeniedException accessDeniedException
    ) throws ForbiddenException {
        // 필요한 권한이 없이 접근하려 할때 403
        throw new ForbiddenException("접근 권한이 없습니다.");
    }
}
