package com.kruger.kdevfull.service;

import com.kruger.kdevfull.dto.UserRequestDto;
import com.kruger.kdevfull.dto.UserResponseDto;
import java.util.List;

public interface IUserService {
    UserResponseDto createUser(UserRequestDto dto);
    List<UserResponseDto> getAllUsers();
    UserResponseDto getUserById(Long id);
    UserResponseDto deleteUser(Long id);
}
