package com.example.technocrm.tool;

import com.example.technocrm.tool.dto.ToolCreateDto;
import com.example.technocrm.tool.dto.ToolDtoMapper;
import com.example.technocrm.tool.dto.ToolResponseDto;
import com.example.technocrm.tool.entity.Tool;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ToolService {
    private final ToolRepository toolRepository;
    private final ToolDtoMapper toolDtoMapper;
    public void create(ToolCreateDto toolCreateDto) {

        Tool tool = new Tool(
                null,
                toolCreateDto.getName(),
                toolCreateDto.getCipherNumber(),
                toolCreateDto.getCount(),
                toolCreateDto.getArrivalTime(),
                toolCreateDto.getPrice(),
                null
        );

        toolRepository.save(tool);

    }

    public List<ToolResponseDto> getAll() {
        return toolDtoMapper.toResponse(toolRepository.findAll());
    }

    public ToolResponseDto get(Integer toolId) {

        Tool tool = toolRepository
                .findById(toolId)
                .orElseThrow();

        return new ToolResponseDto(
                toolId,
                tool.getName(),
                tool.getCipherNumber(),
                tool.getCount(),
                tool.getArrivalTime(),
                tool.getPrice()
        );
    }

    public void update(Integer toolId, ToolCreateDto toolCreateDto) {

        Tool tool = toolRepository
                .findById(toolId)
                .orElseThrow();

        tool.setName(toolCreateDto.getName());
        tool.setCount(toolCreateDto.getCount());
        tool.setPrice(toolCreateDto.getPrice());
        tool.setArrivalTime(toolCreateDto.getArrivalTime());
        tool.setCipherNumber(toolCreateDto.getCipherNumber());

    }

    public void delete(Integer toolId) {
        toolRepository.deleteById(toolId);
    }
}
