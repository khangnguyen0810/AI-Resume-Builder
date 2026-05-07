package com.khangnguyen.ai_resume_builder.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor  

public class OptimizationEvent {
    private String agentName;
    private String content;
    private Integer iteration;
    private Boolean isFinal;
}
