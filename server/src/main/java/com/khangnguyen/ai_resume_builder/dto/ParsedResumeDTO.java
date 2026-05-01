package com.khangnguyen.ai_resume_builder.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParsedResumeDTO {
    private PersonalInfo personalInfo;
    private List<WorkExperience> experience;
    private List<Education> education;
    private List<String> skills;
    private String summary;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PersonalInfo {
        private String fullName;
        private String email;
        private String phone;
        private String location;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WorkExperience {
        private String jobTitle;
        private String company;
        private String duration;
        private List<String> responsibilities;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Education {
        private String school;
        private String degree;
        private String fieldOfStudy;
        private String graduationDate;
    }
}
