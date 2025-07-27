package com.kruger.kdevfull.mapper;

import com.kruger.kdevfull.models.task.Task;
import com.kruger.kdevfull.models.user.User;
import com.kruger.kdevfull.models.projects.Project;

import java.util.List;

import com.kruger.kdevfull.dto.TaskRequestDto;
import com.kruger.kdevfull.dto.TaskResponseDto;

public class TaskMapper {
    
    public static Task toEntity(TaskRequestDto dto) {

        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setStatus(dto.getStatus());
        task.setDueDate(dto.getDueDate());
        
        
        User assignedUser = new User();
        assignedUser.setId(dto.getAssignedToId());
        task.setAssignedTo(assignedUser);
        
       
        Project project = new Project();
        project.setId(dto.getProjectId());
        task.setProject(project);

        return task;

    }

    public static TaskResponseDto toResponseDto(Task task) {

        TaskResponseDto dto = new TaskResponseDto();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setStatus(task.getStatus());
        dto.setAssignedToId(task.getAssignedTo().getId());
        dto.setProjectId(task.getProject().getId());
        dto.setDueDate(task.getDueDate());
        
        return dto;

    }

    public static List<TaskResponseDto> toResponseList(List<Task> taskList) {
        
        return taskList.stream()
            .map(TaskMapper::toResponseDto)
            .toList();

    }
    
}
