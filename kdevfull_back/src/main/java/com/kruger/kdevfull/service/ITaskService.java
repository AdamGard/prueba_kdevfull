package com.kruger.kdevfull.service;

import com.kruger.kdevfull.dto.TaskRequestDto;
import com.kruger.kdevfull.dto.TaskResponseDto;
import java.util.List;

public interface ITaskService {
    TaskResponseDto createTask(TaskRequestDto dto);
    List<TaskResponseDto> getTasksByUser(String username);
    List<TaskResponseDto> getTasksByProject(Long projectId);
    TaskResponseDto getTaskById(Long id);
    TaskResponseDto updateTask(Long id, TaskRequestDto dto);
    void deleteTask(Long id);
}
