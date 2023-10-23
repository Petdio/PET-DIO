package com.ssafy.petdio.auth.jwt.dto;

@Getter
@Setter
public class JwtDto {

    private Long id;
    private String name;
    private Role role;

    @Builder
    public JwtDto(Long id, String name, Role role) {
        this.id = id;
        this.name = name;
        this.role = role;
    }
}