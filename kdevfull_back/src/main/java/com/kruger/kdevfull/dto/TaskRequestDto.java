package com.kruger.kdevfull.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDateTime;

import com.kruger.kdevfull.models.task.Task;

@Data
public class TaskRequestDto {
    
    @NotBlank
    private String title;
    
    private String description;
    
    private Task.Status status;
    
    private Long assignedToId;
    
    private Long projectId;
    
    private LocalDateTime dueDate;
    
}
