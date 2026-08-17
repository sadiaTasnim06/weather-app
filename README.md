# Weather App

## 1. Project Overview

The application allows a user to:

1. Search for a location.
2. Select a location from the search results.
3. View the current weather for that location.
4. View a multi-day weather forecast.

The frontend does **not** communicate directly with Open-Meteo.

Instead, the application follows this architecture:

The user accesses the application through a web browser over HTTP. The request first reaches **Nginx**, which acts as the entry point for the application. Nginx serves the React frontend as static files, while API requests matching `/api/v1/*` are forwarded to the Node.js backend.

On the backend, requests are handled by **Express routing**, which directs each request to the appropriate **controller**. The controller is responsible for handling the HTTP request and passing the business operation to the **service layer**. The service contains the application logic and uses a **WeatherProvider** abstraction to retrieve weather information.

The WeatherProvider delegates the actual external API communication to the **OpenMeteoProvider**, which communicates with the **Open-Meteo API**. The response then travels back through the same layers to the browser.

The application is containerised using Docker Compose.

The repository also contains a Terraform configuration demonstrating Infrastructure as Code without requiring the assessment to provision billable AWS infrastructure.

# 2. Technology Stack

## Frontend

- React
- TypeScript
- Vite
- React Router
- Chakra UI
- TanStack Query
- Fetch API
- Cypress

## Backend

- Node.js
- TypeScript
- Express
- Zod
- Pino
- pino-http
- Native `fetch`
- Supertest
- MSW

## External API

- Open-Meteo Geocoding API
- Open-Meteo Weather API

## Infrastructure / DevOps

- Docker
- Docker Compose
- Nginx
- GitHub Actions
- Terraform

## CI/CD

GitHub Actions performs:

- Backend dependency installation
- Backend type checking
- Backend tests
- Backend build
- Frontend dependency installation
- Frontend build
- Docker Compose build
- Docker Compose startup
- Cypress E2E tests
- Docker Compose cleanup

# 3. Frontend Architecture

The frontend is a React + TypeScript application built with Vite.

The frontend is responsible for:

- Rendering the UI.
- Accepting the user's location search.
- Displaying location results.
- Allowing the user to select a location.
- Requesting weather data from our backend.
- Managing loading, success, and error states.
- Rendering current weather and forecast data.

The frontend does **not** call Open-Meteo directly.

# 4. Frontend API Communication

The frontend has an API client responsible for communication with the backend.

The API base URL is configured using:

```text
VITE_API_BASE_URL
```

Reference:

```text
VITE_API_BASE_URL=/api/v1
```

The frontend therefore makes requests such as:

```text
GET /api/v1/locations?q=malaga
GET /api/v1/weather?latitude=36.72016&longitude=-4.42034
```

# 5. Nginx

Nginx is the public entry point for the Dockerised application.

The browser communicates with: `http://localhost` rather than directly communicating with the backend container.

Nginx serves the React application by serving the static files to the browser. It also acts as a reverse proxy where API requests beginning with `/api/v1` are forwarded to `backend:3000`

Conceptually, the **browser sends a request to `/api/v1/weather`**. The request first reaches **Nginx on port 80**. Nginx acts as a reverse proxy and forwards the API request to the **Node.js backend running on port 3000**. This gives the application a single public entry point.

# 6. Backend Architecture

The backend is a Node.js + Express application.

The backend is organised into layers:

The request first reaches the **route**, which directs it to the appropriate **controller**. The controller passes the request to the **service**, where the application’s business logic is handled. The service then uses the **provider abstraction**, which delegates the external API call to the **Open-Meteo provider**. The Open-Meteo provider communicates with the **external Open-Meteo API** and returns the result back through the same layers.

The public API endpoints are:

```text
GET /api/v1/locations
GET /api/v1/weather
```

# 7. Open-Mateo Endpoints:

Geocoding:

```text
https://geocoding-api.open-meteo.com/v1/search
```

Weather lookup:

```text
https://api.open-meteo.com/v1/forecast
```

# 8. Environment Configuration

The backend has a central environment configuration module.

It uses:

- `dotenv`
- `zod`

Backend Environment Variables:

```text
NODE_ENV
PORT
CORS_ORIGIN
WEATHER_API_BASE_URL
WEATHER_GEOCODING_BASE_URL
```

Frontend Environment Variables:

```text
VITE_API_BASE_URL=/api/v1
```

# 9. Error Handling

The backend has a central error middleware:

```text
backend/src/middleware/error.middleware.ts
```

It handles:

1. Application-specific failures
2. Validation errors
3. Unexpected errors

For an application error, the response has the structure:

```json
{
  "error": {
    "code": "WEATHER_PROVIDER_ERROR",
    "message": "Weather provider request failed"
  }
}
```

For validation failures:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request"
  }
}
```

Unexpected errors return:

```json
{
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "An unexpected error occurred."
  }
}
```

# 10. Health Endpoint

The backend exposes:

```text
GET /health
```

A healthy application returns:

```json
{
  "status": "ok"
}
```

# 11. Logging

The backend uses:

- Pino
- pino-http

The logger is configured as a structured JSON logger.

Example:

```json
{
  "level": 30,
  "time": 1786837319854,
  "pid": 18,
  "hostname": "...",
  "port": 3000,
  "msg": "Server started"
}
```

# 12. Docker Architecture

The application is containerised.

The main services are:

```text
Frontend
Backend
```

# 13. Testing Strategy

Testing is split into different levels:

- Backend
- Frontend
- E2E

The backend uses:

- Vitest
- Supertest
- MSW

Cypress is used for end-to-end testing.

# 14. CI/CD Pipeline

GitHub Actions is used for continuous integration.

The workflow runs on:

```text
push → main
pull request → main
```

The CI pipeline has three major jobs:

```text
backend
frontend
e2e
```

# 15. Terraform / Infrastructure as Code

Terraform was added to demonstrate the Infrastructure as Code requirement of the assessment.

The project uses Terraform locally rather than provisioning AWS resources.

The Terraform workflow demonstrated:

```text
terraform init
terraform plan
terraform apply
terraform destroy
```

# 16. How to run the project

Run with Docker

From the project root:

```bash
docker compose up --build
```

Open the application:

```text
http://localhost
```

Stop the application

```bash
docker compose down
```

View backend logs

```bash
docker compose logs -f backend
```

Run Tests

Backend:

```bash
cd backend
npm test
```

Frontend:

```bash
cd frontend
npm test
```

E2E:

```bash
cd frontend
npm run test:e2e
```

Terraform

Terraform is included to demonstrate Infrastructure as Code and reproducibility.

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

The current Terraform configuration uses a **local provider**, so no AWS resources or AWS costs are required.
