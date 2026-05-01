package com.khangnguyen.ai_resume_builder.controller;

import com.khangnguyen.ai_resume_builder.dto.ParsedResumeDTO;
import com.khangnguyen.ai_resume_builder.service.PdfService;
import com.khangnguyen.ai_resume_builder.service.ResumeAgent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resumes") // Proper RESTful naming convention (plural nouns)
@RequiredArgsConstructor // Generates constructor for 'final' fields (Dependency Injection)
@Slf4j
@CrossOrigin(origins = "http://localhost:5173") // Allow your React frontend to call this API
public class ResumeController {

    private final PdfService pdfService;
    private final ResumeAgent resumeAgent;

    @PostMapping("/parse")
    public ResponseEntity<ParsedResumeDTO> parseResume(@RequestParam("file") MultipartFile file) {
        log.info("Received request to parse file: {}", file.getOriginalFilename());

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        // 1. Extract raw text from PDF
        String rawText = pdfService.extractText(file);

        // 2. Classify and structure the text using the AI Agent
        ParsedResumeDTO parsedData = resumeAgent.classify(rawText);

        // 3. Return the structured JSON to the client
        return ResponseEntity.ok(parsedData);
    }
}