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

    @PostMapping("/add-tool/{userId}")
    public void addTool(
            @PathVariable Integer userId,
            @RequestBody ClientCreateToolDto clientCreateToolDto
            ) {
        clientService.addTool(userId, clientCreateToolDto);
    }
    @PostMapping("/add-doc/{userId}")
    public void addDoc(
            @PathVariable Integer userId,
            @RequestBody ClientCreateDocDto clientCreateDocDto
    ) {
        clientService.addDoc(userId, clientCreateDocDto);
    }

    @PostMapping
    public void create(@RequestBody ClientCreateDto createClientDto) {
        clientService.create(createClientDto);
    }

    @GetMapping
    public List<ClientResponseDto> getAll() {
        return clientService.getAll();
    }

    @GetMapping("/{clientId}")
    public ClientResponseDto get(@PathVariable Integer clientId) {
        return clientService.get(clientId);
    }

    @PutMapping("/{clientId}")
    public void update(@PathVariable Integer clientId, @RequestBody ClientUpdateDto clientUpdateDto) {
        clientService.update(clientId, clientUpdateDto);
    }

    @DeleteMapping("/{clientId}")
    public void delete(@PathVariable Integer clientId) {
        clientService.delete(clientId);
    }
}
