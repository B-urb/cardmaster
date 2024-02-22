FROM openjdk:17.0.2
LABEL authors="Bjoern Urban"
EXPOSE 8080:8080
RUN mkdir /app
COPY libs ./app
ENTRYPOINT ["java","-jar","/app/cardmaster-all.jar"]