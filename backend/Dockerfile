# FROM openjdk:17-alpine

# ARG JAR_FILE=build/libs/*.jar

# ADD ${JAR_FILE} app.jar

# EXPOSE 8080

# ENTRYPOINT ["java", "-jar", "app.jar", "—spring.config.location=file:/config/application.yml"]

# 빌드 단계
FROM openjdk:17.0.2-slim AS builder

# 타임존 설정
ENV TZ=Asia/Seoul

# Gradle 설치를 위한 변수 설정
ENV GRADLE_VERSION=8.8
ENV GRADLE_HOME=/opt/gradle/gradle-${GRADLE_VERSION}
ENV PATH=${GRADLE_HOME}/bin:${PATH}

# Gradle 설치
RUN apt-get update && \
    apt-get install -y wget unzip && \
    wget https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip -P /tmp && \
    unzip -d /opt/gradle /tmp/gradle-${GRADLE_VERSION}-bin.zip && \
    rm /tmp/gradle-${GRADLE_VERSION}-bin.zip

# 작업 디렉토리 설정
WORKDIR /app

# 소스 코드 복사
COPY . .

# Gradle 빌드 실행
RUN gradle build -x test

# 실행 단계
FROM openjdk:17.0.2-slim

# 타임존 설정
ENV TZ=Asia/Seoul

# 작업 디렉토리 설정
WORKDIR /app

# 빌드된 JAR 파일을 복사
COPY --from=builder /app/build/libs/*.jar app.jar

# 애플리케이션 실행
CMD ["java", "-jar", "app.jar", "--spring.config.location=file:/config/application.yml"]
