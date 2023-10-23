package com.ssafy.petdio.auth.jwt;

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
