
package com.kruger.kdevfull.mapper;

import com.kruger.kdevfull.models.projects.Project;
import com.kruger.kdevfull.models.user.User;

import java.util.List;

import com.kruger.kdevfull.dto.ProjectRequestDto;
import com.kruger.kdevfull.dto.ProjectResponseDto;

public class ProjectMapper {

    public static Project toEntity(ProjectRequestDto dto) {

        Project project = new Project();
        project.setName(dto.getName());
        project.setDescription(dto.getDescription());

        return project;

    }

    public static ProjectResponseDto toResponseDto(Project project) {

        ProjectResponseDto dto = new ProjectResponseDto();

        dto.setId(project.getId());
        dto.setName(project.getName());
        dto.setDescription(project.getDescription());
        dto.setOwnerId(project.getOwner().getId());
        dto.setOwnerUsername(project.getOwner().getUsername());
        dto.setCreatedAt(project.getCreatedAt());
        dto.setUpdatedAt(project.getUpdatedAt());

        return dto;

    }

    public static List<ProjectResponseDto> toResponseList(List<Project> projectList) {

        return projectList.stream()
            .map(ProjectMapper::toResponseDto)
            .toList();

    }

}
