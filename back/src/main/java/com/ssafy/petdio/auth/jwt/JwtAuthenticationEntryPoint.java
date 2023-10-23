package com.ssafy.petdio.auth.jwt;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException e
    ) throws IOException {
        //유저 정보가 없을 경우 401 Unauthorized Error
        throw new UnAuthorizedException();
    }
}