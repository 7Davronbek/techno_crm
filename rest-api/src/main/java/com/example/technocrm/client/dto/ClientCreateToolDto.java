package com.example.technocrm.client.dto;

import com.example.technocrm.tool.entity.Tool;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientCreateToolDto {
    private List<Integer> toolIds;
}
