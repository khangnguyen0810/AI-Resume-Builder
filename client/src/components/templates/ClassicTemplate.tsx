import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { type ParsedResume } from "../../types/resume";

// Senior Tip: `@react-pdf/renderer` parses styles using a custom layout engine (Yoga).
// Tailwind utility strings will not work inside the PDF document canvas elements.
// We use its built-in stylesheet tool.
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: "Helvetica",
        fontSize: 10,
        color: "#333333",
        lineHeight: 1.5,
    },
    header: {
        borderBottom: "1px solid #1a365d",
        paddingBottom: 10,
        marginBottom: 0,
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1a365d",
        letterSpacing: 0.5,
    },
    contactRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 15,
        marginTop: 15,
        color: "#4a5568",
        fontSize: 9,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#1a365d",
        textTransform: "uppercase",
        marginTop: 15,
        marginBottom: 6,
        borderBottom: "0.5px solid #e2e8f0",
        paddingBottom: 2,
    },
    summaryText: {
        color: "#2d3748",
        textAlign: "justify",
    },
    entryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginTop: 6,
    },
    entryTitle: {
        fontWeight: "bold",
        fontSize: 10,
        color: "#2d3748",
    },
    entrySubtitle: {
        color: "#4a5568",
        fontStyle: "italic",
        fontSize: 9,
        marginTop: 1,
    },
    dateText: {
        color: "#718096",
        fontSize: 9,
    },
    bulletList: {
        marginTop: 4,
        paddingLeft: 10,
    },
    bulletItem: {
        flexDirection: "row",
        marginBottom: 2,
    },
    bulletPoint: {
        width: 8,
        fontSize: 9,
    },
    bulletContent: {
        flex: 1,
        color: "#2d3748",
        fontSize: 9.5,
    },
    skillsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6,
        marginTop: 4,
    },
    skillBadge: {
        backgroundColor: "#edf2f7",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
        fontSize: 8.5,
        color: "#2b6cb0",
    },
});

interface TemplateProps {
    data: ParsedResume;
}

export const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => (
    <Document title={`${data.personalInfo.fullName} - Optimized Resume`}>
        <Page size="A4" style={styles.page}>
            {/* Header / PII Information */}
            <View style={styles.header}>
                <Text style={styles.name}>{data.personalInfo.fullName}</Text>
                <View style={styles.contactRow}>
                    <Text>{data.personalInfo.email}</Text>
                    <Text>•</Text>
                    <Text>{data.personalInfo.phone}</Text>
                    <Text>•</Text>
                    <Text>{data.personalInfo.location}</Text>
                </View>
            </View>

            {/* Professional Summary */}
            <View>
                <Text style={styles.sectionTitle}>Summary</Text>
                <Text style={styles.summaryText}>{data.summary}</Text>
            </View>

            {/* Experience Section */}
            <View>
                <Text style={styles.sectionTitle}>Professional Experience</Text>
                {data.experience.map((exp, index) => (
                    <View key={index} style={{ marginBottom: 8 }}>
                        <View style={styles.entryRow}>
                            <Text style={styles.entryTitle}>
                                {exp.jobTitle}
                            </Text>
                            <Text style={styles.dateText}>{exp.duration}</Text>
                        </View>
                        <Text style={styles.entrySubtitle}>{exp.company}</Text>
                        <View style={styles.bulletList}>
                            {exp.responsibilities.map((resp, i) => (
                                <View key={i} style={styles.bulletItem}>
                                    <Text style={styles.bulletPoint}>•</Text>
                                    <Text style={styles.bulletContent}>
                                        {resp}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
            </View>

            {/* Education Section */}
            <View>
                <Text style={styles.sectionTitle}>Education</Text>
                {data.education.map((edu, index) => (
                    <View key={index} style={{ marginBottom: 4 }}>
                        <View style={styles.entryRow}>
                            <Text style={styles.entryTitle}>{edu.school}</Text>
                            <Text style={styles.dateText}>{edu.duration}</Text>
                        </View>
                        <Text style={styles.entrySubtitle}>
                            {edu.degree} in {edu.fieldOfStudy}
                        </Text>
                    </View>
                ))}
            </View>

            {/* Skills Section */}
            <View>
                <Text style={styles.sectionTitle}>Skills & Competencies</Text>
                <View style={styles.skillsGrid}>
                    {data.skills.map((skill, index) => (
                        <Text key={index} style={styles.skillBadge}>
                            {skill}
                        </Text>
                    ))}
                </View>
            </View>
        </Page>
    </Document>
);
