package com.khangnguyen.ai_resume_builder.service;

import com.khangnguyen.ai_resume_builder.dto.ParsedResumeDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
@Slf4j
public class OptimizationService {
    private final ChatClient chatClient;
    private ChatModel chatModel;

    public OptimizationService(ChatClient.Builder builder) {
        this.chatClient = builder
                .defaultSystem("""
                    You are a Resume Writer. Tailor the user's experience to match this JD.
                    """)
                .build();
    }

    /**
     * Sends raw text to the LLM and maps the JSON response directly to our DTO.
     */
    public ParsedResumeDTO optimizeResume(String jd,  ParsedResumeDTO parsedResumeDTO) {
        log.info("Requesting AI optimization for resume text...");

        try {
            return chatClient.prompt()
                    .user("JD: " + jd + "\nResume Data: " + parsedResumeDTO.toString())
                    .call()
                    .entity(ParsedResumeDTO.class);
        } catch (Exception e) {
            log.error("AI Optimization failed: ", e);
            throw new RuntimeException("The AI was unable to optimize this resume. Please try again.");
        }
    }
}
