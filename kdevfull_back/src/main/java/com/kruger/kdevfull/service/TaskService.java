package com.kruger.kdevfull.service;

import com.kruger.kdevfull.dto.TaskRequestDto;
import com.kruger.kdevfull.dto.TaskResponseDto;
import com.kruger.kdevfull.mapper.TaskMapper;
import com.kruger.kdevfull.models.projects.Project;
import com.kruger.kdevfull.models.task.Task;
import com.kruger.kdevfull.models.user.User;
import com.kruger.kdevfull.repository.ProjectRepository;
import com.kruger.kdevfull.repository.TaskRepository;
import com.kruger.kdevfull.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService implements ITaskService {
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public TaskResponseDto createTask(TaskRequestDto dto) {
        User assignedTo = userRepository.findById(dto.getAssignedToId())
                .orElseThrow(() -> new RuntimeException("Assigned user not found"));
        Project project = projectRepository.findById(dto.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));
        Task task = TaskMapper.toEntity(dto);
        task.setAssignedTo(assignedTo);
        task.setProject(project);
        task.setState("ACTIVE");
        return TaskMapper.toResponseDto(taskRepository.save(task));
    }

    @Override
    public List<TaskResponseDto> getTasksByUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return taskRepository.findByAssignedTo(user).stream()
                .filter(t -> "ACTIVE".equals(t.getState()))
                .map(TaskMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskResponseDto> getTasksByProject(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        return taskRepository.findByProject(project).stream()
                .filter(t -> "ACTIVE".equals(t.getState()))
                .map(TaskMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public TaskResponseDto getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .filter(t -> "ACTIVE".equals(t.getState()))
                .orElseThrow(() -> new RuntimeException("Task not found or deleted"));
        return TaskMapper.toResponseDto(task);
    }

    @Override
    public TaskResponseDto updateTask(Long id, TaskRequestDto dto) {
        Task task = taskRepository.findById(id)
                .filter(t -> "ACTIVE".equals(t.getState()))
                .orElseThrow(() -> new RuntimeException("Task not found or deleted"));
        
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        if (dto.getStatus() != null) {
            task.setStatus(dto.getStatus());
        }
        task.setDueDate(dto.getDueDate());
        
        // Update assigned user if provided
        if (dto.getAssignedToId() != null) {
            User assignedTo = userRepository.findById(dto.getAssignedToId())
                    .orElseThrow(() -> new RuntimeException("Assigned user not found"));
            task.setAssignedTo(assignedTo);
        }
        
        // Update project if provided
        if (dto.getProjectId() != null) {
            Project project = projectRepository.findById(dto.getProjectId())
                    .orElseThrow(() -> new RuntimeException("Project not found"));
            task.setProject(project);
        }
        
        return TaskMapper.toResponseDto(taskRepository.save(task));
    }

    @Override
    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id)
                .filter(t -> "ACTIVE".equals(t.getState()))
                .orElseThrow(() -> new RuntimeException("Task not found or already deleted"));
        task.setState("DELETED");
        taskRepository.save(task);
    }
}
