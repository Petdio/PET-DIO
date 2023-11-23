package com.ssafy.petdio.domain.user.model.mapper;

import com.ssafy.petdio.domain.user.model.dto.UserDto;
import com.ssafy.petdio.domain.user.model.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDto entityToUserDto(User user);

}
