package com.ssafy.petdio.model.mapper;

import com.ssafy.petdio.model.dto.UserDto;
import com.ssafy.petdio.model.entity.User;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-10-25T15:37:29+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.7 (Eclipse Adoptium)"
)
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDto entityToUserDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto userDto = new UserDto();

        userDto.setUserId( user.getUserId() );
        userDto.setUserNickname( user.getUserNickname() );
        userDto.setProfileImage( user.getProfileImage() );
        userDto.setRole( user.getRole() );

        return userDto;
    }
}
