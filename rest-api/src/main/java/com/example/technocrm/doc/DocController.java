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
    public void create(@RequestBody DocCreateDto docCreateDto, @RequestHeader Integer id) {
        docService.create(docCreateDto, id);
    }

    @GetMapping
    public List<DocResponseDto> getAll(@RequestHeader Integer id) {
        return docService.getAll(id);
    }

    @GetMapping("/{docId}")
    public DocResponseDto get(@PathVariable Integer docId, @RequestHeader Integer id) {
        return docService.get(docId, id);
    }

    @PutMapping("/{docId}")
    public void update(@PathVariable Integer docId, @RequestBody DocCreateDto docCreateDto, @RequestHeader Integer id) {
        docService.update(docId, docCreateDto, id);
    }

    @DeleteMapping("/{docId}")
    public void delete(@PathVariable Integer docId, @RequestHeader Integer id) {
        docService.delete(docId, id);
    }
}
