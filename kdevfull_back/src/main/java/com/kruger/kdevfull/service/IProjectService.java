package com.kruger.kdevfull.service;

import com.kruger.kdevfull.dto.ProjectRequestDto;
import com.kruger.kdevfull.dto.ProjectResponseDto;
import java.util.List;

public interface IProjectService {
    ProjectResponseDto createProject(ProjectRequestDto dto);
    List<ProjectResponseDto> getProjectsByUser();
    ProjectResponseDto getProjectById(Long id);
    ProjectResponseDto updateProject(Long id, ProjectRequestDto dto);
    void deleteProject(Long id);
}
