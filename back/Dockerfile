# Build Stage
FROM gradle:8.3-jdk17 AS build
WORKDIR /app
COPY build.gradle .
COPY settings.gradle .
COPY src src
RUN gradle build

# Runtime Stage
FROM openjdk:17-alpine
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
# master랑 포트번호 다름
EXPOSE 8081 8081
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=docker", "app.jar"]
