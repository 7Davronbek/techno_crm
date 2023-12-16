package com.example.technocrm.client.dto;

import com.example.technocrm.tool.entity.Tool;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientCreateToolDto {
    private Set<Integer> toolIds;
}
