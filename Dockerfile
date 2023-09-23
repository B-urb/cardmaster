FROM openjdk:17
LABEL authors="Bjoern Urban"
EXPOSE 8080:8080
RUN mkdir /app
COPY build/libs/*.jar /app/
ENTRYPOINT ["java","-jar","/app/cardmaster-all.jar"]