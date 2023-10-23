package com.ssafy.petdio.model.mapper;

import com.ssafy.petdio.model.dto.UserDto;
import com.ssafy.petdio.model.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDto entityToUserDto(User user);

}
