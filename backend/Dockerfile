FROM openjdk:17-alpine

ARG JAR_FILE=build/libs/*.jar

ADD ${JAR_FILE} app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar", "—spring.config.location=file:/config/application.yml"]
