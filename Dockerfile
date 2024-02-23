FROM openjdk:21
LABEL authors="Bjoern Urban"
EXPOSE 8080:8080
RUN mkdir /app
COPY libs ./app
ENTRYPOINT ["java","-jar","/app/cardmaster-all.jar"]