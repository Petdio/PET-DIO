package com.ssafy.petdio.auth.jwt.mapper;

import com.ssafy.petdio.auth.jwt.dto.JwtDto;
import com.ssafy.petdio.user.model.dto.UserDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface JwtMapper {

    JwtMapper INSTANCE = Mappers.getMapper(JwtMapper.class);

    JwtDto userDtoToJwtDto(UserDto userDto);

}
