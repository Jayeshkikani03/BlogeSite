# Use Node.js LTS (Long Term Support) based on Alpine Linux for a small image size
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install only production dependencies for a leaner image
RUN npm ci --only=production

# Copy the rest of the backend source code
COPY . .

# Expose the port the backend runs on
EXPOSE 5000

# Define the command to run the application
CMD ["node", "server.js"]
