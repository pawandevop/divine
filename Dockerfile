# Step 1: Build Stage
FROM node:18-alpine AS builder

WORKDIR /app

# Set a dummy MongoDB URI for build to bypass build-time checks
ENV MONGODB_URI="mongodb://dummy:dummy@dummy:27017/dummy"

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app and build
COPY . .
RUN npm run build

# Step 2: Production Image
FROM node:18-alpine

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy built app and necessary files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# If you use other config files, copy them as needed
# COPY --from=builder /app/jsconfig.json ./jsconfig.json

# Start Next.js app
CMD ["npx", "next", "start"]