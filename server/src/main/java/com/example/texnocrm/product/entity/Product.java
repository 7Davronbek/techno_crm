package com.example.texnocrm.product.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String phoneNumber;
    private String orgName;
    private String date;
    private Status status;
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
//    private List<String> replacementComponent;
}
