package com.example.technocrm.doc.entity;

import com.example.technocrm.client.entity.Client;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Doc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(length = 8192)
    private String imageUrl1;
    private String name;
//    private String imageUrl2;
//    private String imageUrl3;
//    private String imageUrl4;
    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;
}
