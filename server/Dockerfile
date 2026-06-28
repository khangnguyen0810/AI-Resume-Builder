# Stage 1: Build the application using JDK 25
FROM eclipse-temurin:25-jdk-alpine AS build
WORKDIR /app

# Leverage your project's included Maven wrapper
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw

# Download dependencies to cache them in the Docker layer
RUN ./mvnw dependency:go-offline

# Copy application source code and build the executable JAR
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Stage 2: Minimal runtime environment using JRE 25
FROM eclipse-temurin:25-jre-alpine
WORKDIR /app

# Copy the compiled JAR artifact from the build stage
COPY --from=build /app/target/*.jar app.jar

# Inform the platform that the service listens on port 8080
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]