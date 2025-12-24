# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application
COPY . .

# Expose the dev server port (change if your app uses a different port)
EXPOSE 5173

# Run the application
CMD ["npm", "run", "dev"]
