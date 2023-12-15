package com.example.technocrm.client.entity;

import com.example.technocrm.doc.entity.Doc;
import com.example.technocrm.tool.entity.Tool;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String phoneNumber;
    private String orgName;
    private String date;
    private String mark;
    private String serialNumber;
    private String temperature;
    private boolean lastVerification;
    private boolean gasPassport;
    private boolean correctionPassport;
    private boolean act;
    private boolean technicalCondition;
    private boolean DR;
    private boolean DT;
    private boolean DD;
    private boolean emergencySituations;
    private boolean visualDamage;
    private boolean mechanicalDamage;
    private String conclusions;
    private String indications;
    private String countingMechanism;

    private LocalDateTime createdAt;
    @Enumerated(EnumType.STRING)
    private Status status;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private Set<Tool> tools;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private List<Doc> docs;

//    @ManyToMany(mappedBy = "clients")
//    private List<User> users;
//    @ManyToOne
//    private User user;
}
