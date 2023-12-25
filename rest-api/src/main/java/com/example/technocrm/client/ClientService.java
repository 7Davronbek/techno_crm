package com.example.technocrm.client;

import com.example.technocrm.client.dto.*;
import com.example.technocrm.client.entity.Client;
import com.example.technocrm.client.entity.Status;
import com.example.technocrm.custom.CustomConfig;
import com.example.technocrm.tool.ToolRepository;
import com.example.technocrm.tool.entity.Tool;
import com.example.technocrm.user.UserRepository;
import com.example.technocrm.user.entity.Role;
import com.example.technocrm.user.entity.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ClientService {
    private final ClientRepository clientRepository;
    private final UserRepository userRepository;
    private final ToolRepository toolRepository;
    private final ClientDtoMapper clientDtoMapper;
    private final CustomConfig customConfig;

    public void addTool(Integer clientId, ClientCreateToolDto clientCreateToolDto, Integer id) {
        if (customConfig.isAdmin(id) || customConfig.isAccountant(id)) {
            Client client = clientRepository.findById(clientId).orElseThrow();

            for (Map.Entry<Integer, Integer> entry : clientCreateToolDto.getToolIds().entrySet()) {
                Integer toolId = entry.getKey();

                Tool tool = toolRepository.findById(toolId).orElseThrow();

                tool.setClient(client);

                toolRepository.save(tool);
            }
            client.setStatus(Status.PAYMENT);
        }
    }

    public void addDoc(Integer userId, ClientCreateDocDto clientCreateDocDto, Integer id) {
        if (customConfig.isAdmin(id) || customConfig.isStandard(id)) {
            Client client = clientRepository.findById(userId).orElseThrow();
            List<Tool> docsList = toolRepository.findAllById(clientCreateDocDto.getDocs());
            docsList.forEach(doc -> doc.setClient(client));
            client.setStatus(Status.END);
        }
    }

    public void create(ClientCreateDto createClientDto, Integer id) {
        if (customConfig.isAdmin(id) || customConfig.isReceiver(id)) {

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

                    createClientDto.isPaid(),
                    LocalDateTime.now(),
                    Status.SPECIALIST,
                    Collections.emptySet(),
                    Collections.emptyList()
            );

            User user = new User(
                    null,
                    createClientDto.getOrgName(),
                    createClientDto.getOrgName(),
                    createClientDto.getPhoneNumber(),
                    Role.ROLE_CLIENT,
                    LocalDate.now(),
                    Status.SPECIALIST,
                    true
            );

            clientRepository.save(client);
            userRepository.save(user);
        }
    }

    public List<ClientResponseDto> getAll(Integer id) {
        if (customConfig.isAdmin(id) || customConfig.isReceiver(id)) {
            return clientDtoMapper.toResponse(clientRepository.findAll());
        }
        return null;
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
        client.setStatus(Status.SPECIALIST);
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

    public void staff(Boolean isActive, Integer id) {
        if (customConfig.isAdmin(id)) {
            Client client = clientRepository.findById(id).orElseThrow();
            Status status = isActive ? Status.DOCS : Status.END;
            client.setStatus(status);
        }
    }

    public List<ClientResponseDto> getReceiver(Integer id) {
        if (customConfig.isReceiver(id) || customConfig.isAdmin(id)) {
            return clientDtoMapper.toResponse(clientRepository.findAllByStatus(Status.RECEIVER));
        }
        return null;
    }

    public List<ClientResponseDto> getSpecialist(Integer id) {
        if (customConfig.isSpecialist(id) || customConfig.isAdmin(id)) {
            return clientDtoMapper.toResponse(clientRepository.findAllByStatus(Status.SPECIALIST));
        }
        return null;
    }

    public List<ClientResponseDto> getAccountant(Integer id) {
        if (customConfig.isAccountant(id) || customConfig.isAdmin(id)) {
            return clientDtoMapper.toResponse(clientRepository.findAllByStatus(Status.ACCOUNTANT));
        }
        return null;
    }

    public List<ClientResponseDto> getDoc(Integer id) {
        if (customConfig.isDoc(id) || customConfig.isAdmin(id)) {
            return clientDtoMapper.toResponse(clientRepository.findAllByStatus(Status.DOCS));
        }
        return null;
    }

    public void accountantChangeStatus(Integer userId, Integer id) {
        if (customConfig.isAccountant(id) || customConfig.isAdmin(id)) {
            Client client = clientRepository.findById(userId).orElseThrow();
            if (client.isPaid()) {
                client.setStatus(Status.END);
            } else {
                client.setStatus(Status.PAYMENT);
            }
        }
    }
}
