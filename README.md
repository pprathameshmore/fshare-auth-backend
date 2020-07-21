# FShare - User Authentication Service

TThis service handles user authentication operations.

## API Documentation

https://documenter.getpostman.com/view/8028791/T1DmCdhX?version=latest

## Setup

Install dependency:

```
npm install
```

Run app:

```
node src/app.js
```

### Docker

Build Docker Image

```
docker build -t fshare-auth-image .
```

Run Docker Image

```
docker run --name fshare-auth fshare-auth-image
```

Backend

- Express.js
- PostgreSQL
- Google OAuth2
