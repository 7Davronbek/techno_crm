package com.example.technocrm.tool.entity;

import com.example.technocrm.client.entity.Client;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Tool {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String cipherNumber;
    private Integer count;
    private LocalDate arrivalTime;
    private Integer price;
    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;
}
