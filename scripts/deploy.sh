#!/bin/bash
set -e

PROJECT_DIR="/home/ubuntu/bayaro-landing"
REGISTRY="ghcr.io/zakianmaulana01/reactjs-landing-page-bayaro"

echo "🚀 Pulling latest image..."
docker compose -f "$PROJECT_DIR/docker-compose.yml" pull

echo "🚀 Stopping old container..."
docker compose -f "$PROJECT_DIR/docker-compose.yml" down

echo "🚀 Starting new container..."
docker compose -f "$PROJECT_DIR/docker-compose.yml" up -d

echo "🧹 Cleaning up unused images..."
docker image prune -f

echo "✅ Deploy complete!"
docker compose -f "$PROJECT_DIR/docker-compose.yml" ps
