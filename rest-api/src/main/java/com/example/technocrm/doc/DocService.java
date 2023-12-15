package com.example.technocrm.doc;

import com.example.technocrm.doc.dto.DocCreateDto;
import com.example.technocrm.doc.dto.DocDtoMapper;
import com.example.technocrm.doc.dto.DocResponseDto;
import com.example.technocrm.doc.entity.Doc;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class DocService {
    private final DocRepository docRepository;
    private final DocDtoMapper docDtoMapper;

    public void create(DocCreateDto docCreateDto) {

        Doc doc = new Doc(
                null,
                docCreateDto.getImageUrl1(),
                docCreateDto.getImageUrl2(),
                docCreateDto.getImageUrl3(),
                docCreateDto.getImageUrl4(),
                null
        );

        docRepository.save(doc);
    }

    public List<DocResponseDto> getAll() {
        return docDtoMapper.toResponse(docRepository.findAll());
    }

    public DocResponseDto get(Integer docId) {
        Optional<Doc> docOptional = docRepository
                .findById(docId);

        return docOptional
                .map(docDtoMapper::toResponse)
                .orElseThrow();

    }

    public void update(Integer docId, DocCreateDto docCreateDto) {

        Doc doc = docRepository
                .findById(docId)
                .orElseThrow();

        doc.setImageUrl1(doc.getImageUrl1());
        doc.setImageUrl2(doc.getImageUrl2());
        doc.setImageUrl3(doc.getImageUrl3());
        doc.setImageUrl4(doc.getImageUrl4());

    }

    public void delete(Integer docId) {
        docRepository.deleteById(docId);
    }
}
