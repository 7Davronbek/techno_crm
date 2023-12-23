package com.example.technocrm.doc.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DocCreateDto {
    private String imageUrl1;
    private String name;
//    private String imageUrl2;
//    private String imageUrl3;
//    private String imageUrl4;
}
