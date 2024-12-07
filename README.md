# Debugging Node.js Applications with mirrord

<div align="center">
  <a href="https://mirrord.dev">
    <img src="images/mirrord.svg" width="150" alt="mirrord Logo"/>
  </a>
</div>

This is a simple Node.js guestbook application that uses Redis to store and retrieve messages. The application demonstrates:
- Express.js web server
- Redis for data persistence
- Docker containerization
- Kubernetes deployment
- mirrord debugging capabilities

## Application Structure
- Express.js server running on port 3000
- Redis backend for storing guestbook messages
- Basic HTML interface for submitting and viewing messages

## Running Locally with Docker Compose

## Prerequisites

- Node.js 18.12.0 or higher
- Docker and Docker Compose
- Kubernetes cluster
- mirrord CLI installed

## Quick Start

1. Clone the repository:

```bash
git clone https://github.com/waveywaves/mirrord-go-debug-example
cd mirrord-go-debug-example
```

2. Deploy to Kubernetes:

```bash
kubectl create -f ./kube
```

3. Debug with mirrord:

```bash
mirrord exec -t deployment/guestbook go run main.go
```

The application will be available at http://localhost:3000

## Architecture

The application consists of:
- Node.js web server
- Redis for data

## License

This project is licensed under the MIT License - see the LICENSE file for details.