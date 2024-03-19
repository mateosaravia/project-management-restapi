# Project Description
This is a RESTful API for an application that allows users to create and interact with portfolio projects. 

The main goal of this project is to provide a backend for a web application.

## Technologies
The main technologies used in this project are:

> `NodeJS` | `Express` | `TypeScript` | `MySQL` | `Redis` | `Docker`

## Features
- User management
- User authentication
- Profile management
- Project creation, deletion and edition
- Project collaboration
- Project search
- Project interaction (rating, comment, etc)

## Setup
### Requirements
- Docker
- Docker Compose

### Steps
1. Clone the repository

2. Get into the `application` directory
```
cd application
```
3. Build and execute the docker services
```
docker-compose up --build
```
4. The API will be able in `http://localhost:3000/api/`

