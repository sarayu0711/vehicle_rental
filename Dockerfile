FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# copy only backend folder
COPY vehicle_rental_backend ./vehicle_rental_backend

WORKDIR /app/vehicle_rental_backend
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app

COPY --from=build /app/vehicle_rental_backend/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
