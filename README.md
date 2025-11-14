# WebSite ??

Учебный проект

## ?? Описание проекта

WebSite - это полнофункциональное веб-приложение, разработанное для обучения **Spring Boot** и работе с **базами данных**. Проект демонстрирует полноценную архитектуру с разделением на фронтенд и бэкенд части, включая контейнеризацию с Docker.

## ??? Технологический стек

### Backend
- **Spring Boot** - основной фреймворк
- **Java** - язык программирования
- **SQLite** - база данных (mydb.db)
- **Maven** - система управления зависимостями

### Frontend
- **HTML5** - разметка
- **CSS3** - стилизация
- **JavaScript** - интерактивность
- **http-server** - локальный веб-сервер

### DevOps & Deployment
- **Docker** - контейнеризация приложения и БД
- **Docker Compose** - управление многоконтейнерными приложениями
- **Docker Swarm** - оркестрация контейнеров для масштабирования

## ?? Структура проекта
WebSite/ 
??? ServerForProject/ # Backend часть (Spring Boot) 
??? FrontForProject/ # Frontend часть (JavaScript) 
??? docker-compose.yml # Конфигурация Docker Compose 
??? docker-swarm.yml # Конфигурация Docker Swarm 


## ?? Быстрый старт

### Требования
- Docker
- Docker Compose
- Java 11+ (для локальной разработки)
- Node.js (для фронтенда, если нужна локальная разработка)

### Запуск с Docker Compose

```bash
# Клонируйте репозиторий
git clone https://github.com/Slavka888/WebSite.git
cd WebSite

# Запустите проект
docker-compose up -d

# Проект будет доступен на http://localhost:63343 (фронтенд) и http://localhost:8080 (бэкенд)
```
### Запуск с Docker Swarm
```bash
# Инициализируйте Docker Swarm (если не инициализирован)
docker swarm init

# Разверните стек
docker stack deploy -c docker-swarm.yml website

# Проверьте статус сервисов
docker service ls
```