# Etapa 1: Construcción
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app

# Copia todo el proyecto y construye el .jar
COPY mvnw mvnw.cmd pom.xml ./
COPY src ./src
COPY .mvn ./.mvn
RUN ./mvnw clean package -DskipTests

# Etapa 2: Imagen final liviana
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copia el .jar generado desde la etapa anterior
COPY --from=build /app/target/*.jar app.jar

# Puerto expuesto por la aplicación
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
