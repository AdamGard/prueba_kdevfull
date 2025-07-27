package com.kruger.kdevfull.service;

import com.kruger.kdevfull.dto.ProjectRequestDto;
import com.kruger.kdevfull.dto.ProjectResponseDto;
import com.kruger.kdevfull.mapper.ProjectMapper;
import com.kruger.kdevfull.models.projects.Project;
import com.kruger.kdevfull.models.user.User;
import com.kruger.kdevfull.repository.ProjectRepository;
import com.kruger.kdevfull.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService implements IProjectService {
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public ProjectResponseDto createProject(ProjectRequestDto dto) {
        
        Authentication auth = SecurityContextHolder
            .getContext().getAuthentication();

        User owner = userRepository.findByUsername(auth.getName())
            .orElseThrow(() -> new RuntimeException("Owner not found"));
    
        Project project = ProjectMapper.toEntity(dto);
        project.setState("ACTIVE");
        project.setOwner(owner);
        
        return ProjectMapper.toResponseDto(projectRepository.save(project));
    
    }

    @Override
    public List<ProjectResponseDto> getProjectsByUser() {
        
        Authentication auth = SecurityContextHolder
            .getContext().getAuthentication();

        return projectRepository.findByOwnerUsername(auth.getName()).stream()
            .filter(p -> "ACTIVE".equals(p.getState()))
            .map(ProjectMapper::toResponseDto)
            .collect(Collectors.toList());
    
    }

    @Override
    public ProjectResponseDto getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .filter(p -> "ACTIVE".equals(p.getState()))
                .orElseThrow(() -> new RuntimeException("Project not found or deleted"));
        return ProjectMapper.toResponseDto(project);
    }

    @Override
    public ProjectResponseDto updateProject(Long id, ProjectRequestDto dto) {
        Project project = projectRepository.findById(id)
                .filter(p -> "ACTIVE".equals(p.getState()))
                .orElseThrow(() -> new RuntimeException("Project not found or deleted"));
        project.setName(dto.getName());
        project.setDescription(dto.getDescription());
        return ProjectMapper.toResponseDto(projectRepository.save(project));
    }

    @Override
    public void deleteProject(Long id) {
        Project project = projectRepository.findById(id)
                .filter(p -> "ACTIVE".equals(p.getState()))
                .orElseThrow(() -> new RuntimeException("Project not found or already deleted"));
        project.setState("DELETED");
        projectRepository.save(project);
    }
}
