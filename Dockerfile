# Stage 1: Build
FROM node:20-alpine AS builder

# Tentukan working directory
WORKDIR /app

# Copy package.json dan package-lock.json terlebih dahulu
COPY package*.json ./

# Install dependensi secara efisien
RUN npm ci

# Copy seluruh source code
COPY . .

# Build project untuk production
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

# Copy hasil build Vite (di dalam folder /dist) ke folder default Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port internal 80 (untuk nginx di dalam container)
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
