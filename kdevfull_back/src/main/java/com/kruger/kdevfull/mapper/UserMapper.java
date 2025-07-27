package com.kruger.kdevfull.mapper;

import com.kruger.kdevfull.models.user.User;

import java.util.List;

import com.kruger.kdevfull.dto.UserRequestDto;
import com.kruger.kdevfull.dto.UserResponseDto;

public class UserMapper {
    
    public static User toEntity(UserRequestDto dto) {
    
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setRole(dto.getRole());
    
        return user;
    
    }

    public static UserResponseDto toResponseDto(User user) {
    
        UserResponseDto dto = new UserResponseDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setUpdatedAt(user.getUpdatedAt());
    
        return dto;
    
    }
    
    public static List<UserResponseDto> toResponseList(List<User> userList) {
        
        return userList.stream()
            .map(UserMapper::toResponseDto)
            .toList();

    }
    
}
