package com.example.technocrm.doc;

import com.example.technocrm.custom.CustomConfig;
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
    private final CustomConfig customConfig;

    public void create(DocCreateDto docCreateDto, Integer id) {
        if (customConfig.isAdmin(id) || customConfig.isStandard(id)) {
            Doc doc = new Doc(
                    null,
                    docCreateDto.getImageUrl1(),
                    docCreateDto.getName(),
                    null
            );

            docRepository.save(doc);
        }
    }

    public List<DocResponseDto> getAll(Integer id) {
        if (customConfig.isAdmin(id) || customConfig.isStandard(id)) {
            return docDtoMapper.toResponse(docRepository.findAll());
        }
        return null;
    }

    public DocResponseDto get(Integer docId, Integer id) {
        if (customConfig.isAdmin(id) || customConfig.isStandard(id)) {
            Optional<Doc> docOptional = docRepository
                    .findById(docId);

            return docOptional
                    .map(docDtoMapper::toResponse)
                    .orElseThrow();
        }
        return null;

    }

    public void update(Integer docId, DocCreateDto docCreateDto, Integer id) {
        if (customConfig.isAdmin(id) || customConfig.isStandard(id)) {

            Doc doc = docRepository
                    .findById(docId)
                    .orElseThrow();

            doc.setImageUrl1(docCreateDto.getImageUrl1());
            doc.setName(docCreateDto.getName());

        }
    }

    public void delete(Integer docId, Integer id) {
        if (customConfig.isAdmin(id) || customConfig.isStandard(id)) {
            docRepository.deleteById(docId);
        }
    }
}
