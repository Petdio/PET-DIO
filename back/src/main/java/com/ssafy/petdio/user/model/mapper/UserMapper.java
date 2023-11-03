package com.ssafy.petdio.user.model.mapper;

import com.ssafy.petdio.user.model.dto.UserDto;
import com.ssafy.petdio.user.model.dto.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDto entityToUserDto(User user);

}
