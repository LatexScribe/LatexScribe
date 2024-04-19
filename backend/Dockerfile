FROM openjdk:17-alpine as build

COPY . /

RUN chmod +x mvnw
RUN ./mvnw package -DskipTests

FROM openjdk:17-alpine as runtime

EXPOSE 8080

RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

ARG APPLICATION_JAR=target/*.jar
COPY --chown=spring:spring --from=build ${APPLICATION_JAR} /application.jar

ENTRYPOINT ["java", "-jar", "/application.jar"]
