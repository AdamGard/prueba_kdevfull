
package com.kruger.kdevfull.service;

import com.kruger.kdevfull.dto.UserRequestDto;
import com.kruger.kdevfull.dto.UserResponseDto;
import com.kruger.kdevfull.mapper.UserMapper;
import com.kruger.kdevfull.models.user.User;
import com.kruger.kdevfull.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserResponseDto createUser(UserRequestDto dto) {

        User user = UserMapper.toEntity(dto);
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setState("ACTIVE");

        return UserMapper.toResponseDto(userRepository.save(user));

    }

    @Override
    public List<UserResponseDto> getAllUsers() {
        
        return userRepository.findAll().stream()
            .filter(u -> "ACTIVE".equals(u.getState()))
            .map(UserMapper::toResponseDto)
            .collect(Collectors.toList());
    
    }

    @Override
    public UserResponseDto getUserById(Long id) {
    
        User user = userRepository.findById(id)
            .filter(u -> "ACTIVE".equals(u.getState()))
            .orElseThrow();
        
        return UserMapper.toResponseDto(user);

    }
    
    @Override
    public UserResponseDto deleteUser(Long id) {
        
        User user = userRepository.findById(id)
            .filter(u -> "ACTIVE".equals(u.getState()))
            .orElseThrow(() -> new RuntimeException("User not found or already deleted"));
    
        user.setState("DELETED");
        userRepository.save(user);
    
        return UserMapper.toResponseDto(user);

    }

}
