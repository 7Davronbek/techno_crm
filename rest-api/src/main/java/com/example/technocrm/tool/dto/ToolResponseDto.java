package com.example.technocrm.tool.dto;

import com.example.technocrm.client.entity.Client;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ToolResponseDto {
    private Integer id;
    private String name;
    private String cipherNumber;
    private Integer count;
    private LocalDate arrivalTime;
    private Integer price;
    private Client client;
}
