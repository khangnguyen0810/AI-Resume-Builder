package com.khangnguyen.ai_resume_builder.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UploadResponseDTO {
    private String fileId;
    private String fileName;
    private String message;
}