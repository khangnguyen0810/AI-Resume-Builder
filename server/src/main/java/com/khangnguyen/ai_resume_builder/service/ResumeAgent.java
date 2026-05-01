package com.khangnguyen.ai_resume_builder.service;

import com.khangnguyen.ai_resume_builder.dto.ParsedResumeDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ResumeAgent {

    private final ChatClient chatClient;
    private ChatModel chatModel;

    // We inject ChatClient.Builder because it's the professional way to
    // customize the client (e.g., adding default prompts) per service.
    public ResumeAgent(ChatClient.Builder builder) {
        this.chatClient = builder
                .defaultSystem("""
                    You are an expert ATS (Applicant Tracking System) parser. 
                    Your task is to extract information from the provided resume text.
                    Return the data in a valid JSON format that matches the requested schema.
                    If a field is missing, return null or an empty list.
                    Do not include any markdown formatting like ```json in your response.
                    """)
                .build();
    }

    /**
     * Sends raw text to the LLM and maps the JSON response directly to our DTO.
     */
    public ParsedResumeDTO classify(String rawText) {
        log.info("Requesting AI classification for resume text...");

        try {
            return chatClient.prompt()
                    .user(rawText)
                    .call()
                    .entity(ParsedResumeDTO.class);
        } catch (Exception e) {
            log.error("AI Classification failed: ", e);
            throw new RuntimeException("The AI was unable to parse this resume. Please try again.");
        }
    }
}