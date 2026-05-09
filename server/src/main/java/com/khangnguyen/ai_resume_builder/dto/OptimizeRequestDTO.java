package com.khangnguyen.ai_resume_builder.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class OptimizeRequestDTO {
    private String jd;
    private ParsedResumeDTO parsedResumeDTO;
}
