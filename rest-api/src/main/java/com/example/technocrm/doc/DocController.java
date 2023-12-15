package com.example.technocrm.doc;

import com.example.technocrm.doc.dto.DocCreateDto;
import com.example.technocrm.doc.dto.DocResponseDto;
import com.example.technocrm.user.dto.UserCreateDto;
import com.example.technocrm.user.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doc")
@RequiredArgsConstructor
public class DocController {
    private final DocService docService;

    @PostMapping
    public void create(@RequestBody DocCreateDto docCreateDto) {
        docService.create(docCreateDto);
    }

    @GetMapping
    public List<DocResponseDto> getAll() {
        return docService.getAll();
    }

    @GetMapping("/{docId}")
    public DocResponseDto get(@PathVariable Integer docId) {
        return docService.get(docId);
    }

    @PutMapping("/{docId}")
    public void update(@PathVariable Integer docId, @RequestBody DocCreateDto docCreateDto) {
        docService.update(docId, docCreateDto);
    }

    @DeleteMapping("/{docId}")
    public void delete(@PathVariable Integer docId) {
        docService.delete(docId);
    }
}
