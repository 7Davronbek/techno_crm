package com.example.technocrm.client.dto;

import com.example.technocrm.client.entity.Status;
import com.example.technocrm.doc.entity.Doc;
import com.example.technocrm.tool.entity.Tool;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientResponseDto {
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
    private Status status;

    private Set<Tool> tools;
    private List<Doc> docs;
}
