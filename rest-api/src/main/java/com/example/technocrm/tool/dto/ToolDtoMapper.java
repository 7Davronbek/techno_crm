package com.example.technocrm.tool.dto;

import com.example.technocrm.tool.entity.Tool;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ToolDtoMapper {
    private final ModelMapper mapper = new ModelMapper();

    public ToolResponseDto toResponse(Tool tool) {
        return mapper.map(tool, ToolResponseDto.class);
    }

    public List<ToolResponseDto> toResponse(List<Tool> tools) {
        return tools
                .stream()
                .map(this::toResponse)
                .toList();
    }
}
