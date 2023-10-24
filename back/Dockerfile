# Build Stage
FROM gradle:8.3-jdk17 AS build
WORKDIR /app
COPY build.gradle .
COPY setting.gradle .
COPY src src

RUN gradle build
RUN rm -f build/libs/*-plain.jar

# Runtime Stage
FROM openjdk:17-alpine
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080 8080
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=docker", "app.jar"]