package com.example.technocrm.doc.dto;

import com.example.technocrm.doc.entity.Doc;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DocDtoMapper {
    private final ModelMapper mapper = new ModelMapper();

    public DocResponseDto toResponse(Doc doc) {
        return mapper.map(doc, DocResponseDto.class);
    }

    public List<DocResponseDto> toResponse(List<Doc> docs) {
        return docs
                .stream()
                .map(this::toResponse)
                .toList();
    }
}
