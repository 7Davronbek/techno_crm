package com.example.technocrm.client.dto;

import com.example.technocrm.doc.dto.DocCreateDto;
import com.example.technocrm.doc.entity.Doc;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientCreateDocDto {
    private List<Integer> docs;
}