package com.khangnguyen.ai_resume_builder.service;

import com.khangnguyen.ai_resume_builder.dto.OptimizationEvent;
import com.khangnguyen.ai_resume_builder.dto.ParsedResumeDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
@RequiredArgsConstructor
@Slf4j
public class OptimizationService {
    private final ChatClient.Builder chatClient;

    public Flux<OptimizationEvent> optimizeResume(String jd, ParsedResumeDTO resumeData) {
        return Flux.create(sink -> {
            String currentDraft = "Initial draft pending...";
            int maxIterations = 1;

            for (int i = 1; i <= maxIterations; i++) {
                currentDraft = callWriter(jd, resumeData, currentDraft);
                sink.next(new OptimizationEvent("WRITER", currentDraft, i, false));

                String critique = callCritic(jd, currentDraft);
                sink.next(new OptimizationEvent("CRITIC", critique, i, false));

            }
            currentDraft = callWriter(jd, resumeData, currentDraft);
            sink.next(new OptimizationEvent("WRITER", currentDraft, maxIterations, true));
            sink.complete();
        });
    }
    private String callWriter(String jd, ParsedResumeDTO resume, String previousCritique) {
        return chatClient.build().prompt()
                .system("You are a Resume Writer. Tailor the user's experience to match this JD. " +
                        "Improve based on previous critique: " + previousCritique)
                .user("JD: " + jd + "\nResume Data: " + resume.toString())
                .call()
                .content();
    }

    private String callCritic(String jd, String draft) {
        return chatClient.build().prompt()
                .system("You are a strict Hiring Manager. Critique this resume draft against the JD. " +
                        "Be harsh but constructive. Focus on missing keywords and impact.")
                .user("JD: " + jd + "\nDraft: " + draft)
                .call()
                .content();
    }
}
