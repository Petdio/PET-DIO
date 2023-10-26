package com.ssafy.petdio.auth.jwt.mapper;

import com.ssafy.petdio.auth.jwt.dto.JwtDto;
import com.ssafy.petdio.model.dto.UserDto;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-10-25T15:37:29+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.7 (Eclipse Adoptium)"
)
public class JwtMapperImpl implements JwtMapper {

    @Override
    public JwtDto userDtoToJwtDto(UserDto userDto) {
        if ( userDto == null ) {
            return null;
        }

        JwtDto.JwtDtoBuilder jwtDto = JwtDto.builder();

        jwtDto.userId( userDto.getUserId() );
        jwtDto.userNickname( userDto.getUserNickname() );
        jwtDto.role( userDto.getRole() );

        return jwtDto.build();
    }
}
