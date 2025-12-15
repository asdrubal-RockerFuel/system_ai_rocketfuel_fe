## Multi-stage build for Angular app
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Copy sources and build
COPY . .
RUN npm run build --silent

## Serve with nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist/gull/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
