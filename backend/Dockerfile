# Base image
FROM node:18.3.0

# Set working directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Build TypeScript files
RUN npm run build

# Start the application
CMD [ "node", "dist/app.js" ]