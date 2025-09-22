# backend/Dockerfile

# Use official Node.js image
FROM node:22-alpine

# Set working directory inside container
WORKDIR /app

# Install PostgreSQL client for wait-for-db
RUN apk add --no-cache postgresql-client bash

# Install FFmpeg
RUN apk add --no-cache ffmpeg

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy all backend source code
COPY . .

# Expose backend port
EXPOSE 5000

# Start the backend server
CMD ["./wait-for-db.sh", "echo-postgres", "npm", "start"]
