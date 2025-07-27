package com.kruger.kdevfull.controller;

import com.kruger.kdevfull.dto.ProjectRequestDto;
import com.kruger.kdevfull.dto.ProjectResponseDto;
import com.kruger.kdevfull.service.IProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    
    @Autowired
    private IProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectResponseDto> createProject(@Validated @RequestBody ProjectRequestDto dto) {
        return ResponseEntity.ok(projectService.createProject(dto));
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponseDto>> getProjects() {
        return ResponseEntity.ok(projectService.getProjectsByUser());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponseDto> getProjectById(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectResponseDto> updateProject(@PathVariable Long id, @Validated @RequestBody ProjectRequestDto dto) {
        return ResponseEntity.ok(projectService.updateProject(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
}
