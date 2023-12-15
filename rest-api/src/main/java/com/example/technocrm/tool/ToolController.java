package com.example.technocrm.tool;

import com.example.technocrm.tool.dto.ToolCreateDto;
import com.example.technocrm.tool.dto.ToolResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tool")
@RequiredArgsConstructor
public class ToolController {
    private final ToolService toolService;

    @PostMapping
    public void create(
            @RequestBody ToolCreateDto toolCreateDto
    ) {
        toolService.create(toolCreateDto);
    }

    @GetMapping
    public List<ToolResponseDto> getAll() {
        return toolService.getAll();
    }

    @GetMapping("/{toolId}")
    public ToolResponseDto get(@PathVariable Integer toolId) {
        return toolService.get(toolId);
    }

    @PutMapping("/{toolId}")
    public void update(@PathVariable Integer toolId, @RequestBody ToolCreateDto toolCreateDto) {
        toolService.update(toolId, toolCreateDto);
    }

    @DeleteMapping("/{toolId}")
    public void delete(@PathVariable Integer toolId) {
        toolService.delete(toolId);
    }
}
