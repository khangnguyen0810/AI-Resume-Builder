package com.khangnguyen.ai_resume_builder.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;

@Service // Marks this as a Spring-managed bean so it can be injected elsewhere
@Slf4j   // Provides the 'log' object for professional logging
public class PdfService {

    public String extractText(MultipartFile file) {
        // Use try-with-resources to ensure the PDDocument is closed automatically
        // This is critical to prevent memory leaks in production!
        try (PDDocument document = Loader.loadPDF(file.getBytes())) {
            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(document);

            // Check if the PDF is actually parsable text
            if (text == null || text.trim().isEmpty()) {
                // 400 Bad Request: The user provided a "bad" file (likely just an image/scan)
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "PDF is empty or contains only images (OCR not supported yet).");
            }

            return text;
        } catch (IOException e) {
            // 500 Internal Server Error: Something went wrong on our end (disk failure, etc.)
            log.error("Failed to parse PDF: {}", file.getOriginalFilename(), e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error reading PDF file");
        }
    }
}