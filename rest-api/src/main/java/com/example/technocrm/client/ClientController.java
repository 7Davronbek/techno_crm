package com.example.technocrm.client;

import com.example.technocrm.client.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/client")
@RequiredArgsConstructor
public class ClientController {
    private final ClientService clientService;

    @GetMapping("/receiver")
    public List<ClientResponseDto> getReceiver(
            @RequestHeader Integer id
    ) {
        return clientService.getReceiver(id);
    }

    @GetMapping("/specialist")
    public List<ClientResponseDto> getSpecialist(
            @RequestHeader Integer id
    ) {
        return clientService.getSpecialist(id);
    }

    @GetMapping("/accountant")
    public List<ClientResponseDto> getAccountant(
            @RequestHeader Integer id
    ) {
        return clientService.getAccountant(id);
    }

    @GetMapping("/doc")
    public List<ClientResponseDto> getDoc(
            @RequestHeader Integer id
    ) {
        return clientService.getDoc(id);
    }

    @PostMapping("/staff")
    public void accountant(
            @RequestBody Boolean isActive,
            @RequestHeader Integer id
    ) {
        clientService.staff(isActive, id);
    }

    @PostMapping("/accountant/{userId}")
    public void accountantChangeStatus(
            @PathVariable Integer userId,
            @RequestHeader Integer id
    ) {
        clientService.accountantChangeStatus(userId, id);
    }

    @PostMapping("/add-tool/{userId}")
    public void addTool(
            @PathVariable Integer userId,
            @RequestBody ClientCreateToolDto clientCreateToolDto,
            @RequestHeader Integer id
    ) {
        clientService.addTool(userId, clientCreateToolDto, id);
    }

    @PostMapping("/add-doc/{userId}")
    public void addDoc(
            @PathVariable Integer userId,
            @RequestBody ClientCreateDocDto clientCreateDocDto,
            @RequestHeader Integer id
    ) {
        clientService.addDoc(userId, clientCreateDocDto, id);
    }

    @PostMapping
    public void create(@RequestBody ClientCreateDto createClientDto,
                       @RequestHeader Integer id) {
        clientService.create(createClientDto, id);
    }

    @GetMapping
    public List<ClientResponseDto> getAll(
            @RequestHeader Integer id
    ) {
        return clientService.getAll(id);
    }

    @GetMapping("/{clientId}")
    public ClientResponseDto get(
            @PathVariable Integer clientId,
            @RequestHeader Integer id
    ) {
        return clientService.get(clientId);
    }

    @PutMapping("/{clientId}")
    public void update(@PathVariable Integer clientId, @RequestBody ClientUpdateDto clientUpdateDto,
                       @RequestHeader Integer id) {
        clientService.update(clientId, clientUpdateDto);
    }

    @DeleteMapping("/{clientId}")
    public void delete(@PathVariable Integer clientId,
                       @RequestHeader Integer id) {
        clientService.delete(clientId);
    }
}
