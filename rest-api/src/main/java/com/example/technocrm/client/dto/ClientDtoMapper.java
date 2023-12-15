package com.example.technocrm.client.dto;

import com.example.technocrm.client.entity.Client;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ClientDtoMapper {
    private final ModelMapper mapper = new ModelMapper();

    public ClientResponseDto toResponse(Client client) {
        return mapper.map(client, ClientResponseDto.class);
    }

    public List<ClientResponseDto> toResponse(List<Client> clients) {
        return clients
                .stream()
                .map(this::toResponse)
                .toList();
    }
}
