package com.example.technocrm.client.dto;

import com.example.technocrm.tool.entity.Tool;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientCreateToolDto {
    private Tool tool;
}
