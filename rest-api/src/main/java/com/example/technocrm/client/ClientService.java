package com.example.technocrm.client;

import com.example.technocrm.client.dto.*;
import com.example.technocrm.client.entity.Client;
import com.example.technocrm.doc.DocRepository;
import com.example.technocrm.doc.entity.Doc;
import com.example.technocrm.tool.ToolRepository;
import com.example.technocrm.tool.entity.Tool;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ClientService {
    private final ClientRepository clientRepository;
    private final ToolRepository toolRepository;
    private final ClientDtoMapper clientDtoMapper;
    private final DocRepository docRepository;

    public void addTool(Integer clientId, ClientCreateToolDto clientCreateToolDto) {
        Client client = clientRepository.findById(clientId).orElseThrow();
        List<Tool> toolList = toolRepository.findAllById(clientCreateToolDto.getToolIds());
        toolList.forEach(tool -> tool.setClient(client));
    }

    public void addDoc(Integer userId, ClientCreateDocDto clientCreateDocDto) {
        Client client = clientRepository.findById(userId).orElseThrow();
        List<Doc> docList = docRepository.findAllById(clientCreateDocDto.getDocs());
        docList.forEach(doc -> doc.setClient(client));
    }

    public void create(ClientCreateDto createClientDto) {

        Client client = new Client(
                null,
                createClientDto.getPhoneNumber(),
                createClientDto.getOrgName(),
                createClientDto.getDate(),
                createClientDto.getMark(),
                createClientDto.getSerialNumber(),
                createClientDto.getTemperature(),
                createClientDto.isLastVerification(),
                createClientDto.isGasPassport(),
                createClientDto.isCorrectionPassport(),
                createClientDto.isAct(),
                createClientDto.isTechnicalCondition(),
                createClientDto.isDR(),
                createClientDto.isDT(),
                createClientDto.isDD(),
                createClientDto.isEmergencySituations(),
                createClientDto.isVisualDamage(),
                createClientDto.isMechanicalDamage(),
                createClientDto.getConclusions(),
                createClientDto.getIndications(),
                createClientDto.getCountingMechanism(),
                false,
                LocalDateTime.now(),
                createClientDto.getStatus(),
                Collections.emptySet(),
                Collections.emptyList()
        );

        clientRepository.save(client);
    }

    public List<ClientResponseDto> getAll() {
        return clientDtoMapper.toResponse(clientRepository.findAll());
    }

    public ClientResponseDto get(Integer clientId) {
        Optional<Client> clientOptional = clientRepository.findById(clientId);

        return clientOptional.map(clientDtoMapper::toResponse).orElseThrow();
    }

    public void update(Integer clientId, ClientUpdateDto userCreateDto) {
        Client client = clientRepository.findById(clientId).orElseThrow();

        client.setAct(userCreateDto.isAct());
        client.setDD(userCreateDto.isDD());
        client.setConclusions(userCreateDto.getConclusions());
        client.setDate(userCreateDto.getDate());
        client.setDR(userCreateDto.isDR());
        client.setDocs(userCreateDto.getDocs());
        client.setMark(userCreateDto.getMark());
        client.setCorrectionPassport(userCreateDto.isCorrectionPassport());
        client.setVisualDamage(userCreateDto.isVisualDamage());
        client.setTools(userCreateDto.getTools());
        client.setTemperature(userCreateDto.getTemperature());
        client.setTechnicalCondition(userCreateDto.isTechnicalCondition());
        client.setStatus(userCreateDto.getStatus());
        client.setSerialNumber(userCreateDto.getSerialNumber());
        client.setOrgName(userCreateDto.getOrgName());
        client.setMechanicalDamage(userCreateDto.isMechanicalDamage());
        client.setLastVerification(userCreateDto.isLastVerification());
        client.setIndications(userCreateDto.getIndications());
        client.setGasPassport(userCreateDto.isGasPassport());
        client.setEmergencySituations(userCreateDto.isEmergencySituations());
        client.setDT(userCreateDto.isDT());
        client.setCountingMechanism(userCreateDto.getCountingMechanism());
        client.setPaid(userCreateDto.isPaid());

    }

    public void delete(Integer clientId) {
        clientRepository.deleteById(clientId);
    }
}
