package com.khangnguyen.ai_resume_builder.controller;

import com.khangnguyen.ai_resume_builder.dto.OptimizeRequestDTO;
import com.khangnguyen.ai_resume_builder.service.OptimizationService;
import com.khangnguyen.ai_resume_builder.dto.ParsedResumeDTO;
import com.khangnguyen.ai_resume_builder.service.PdfService;
import com.khangnguyen.ai_resume_builder.service.ResumeAgent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.Response;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/resumes")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:5173")
public class ResumeController {

    private final PdfService pdfService;
    private final ResumeAgent resumeAgent;
    private final OptimizationService optimizationService;

    @PostMapping("/parse")
    public ResponseEntity<ParsedResumeDTO> parseResume(@RequestParam("file") MultipartFile file) {
        log.info("Received request to parse file: {}", file.getOriginalFilename());

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        String rawText = pdfService.extractText(file);

        ParsedResumeDTO parsedData = resumeAgent.classify(rawText);

        return ResponseEntity.ok(parsedData);
    }
    @PostMapping("/optimize")
    public ResponseEntity<ParsedResumeDTO> resumeOptimization(
            @RequestBody OptimizeRequestDTO request) {
        log.info("Staring to optimize resume...");
        ParsedResumeDTO parsedData = optimizationService.optimizeResume(
                request.getJd(), request.getParsedResumeDTO()
        );
        return ResponseEntity.ok(parsedData);
    }
}