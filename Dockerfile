# Root Dockerfile
FROM docker:24-cli-alpine

# Install docker-compose
RUN apk add --no-cache py3-pip && \
    pip3 install docker-compose

WORKDIR /app

# Copy entire project
COPY . .

# Start all services
CMD ["docker-compose", "up", "--build"]